'use client';

import ReactQuill from "react-quill";
import { useCallback, useMemo, useRef } from "react";
import StorageService from "@/services/storage.service";
import 'react-quill/dist/quill.snow.css';

const formats = [
    "background",
    "color",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "script",
    "indent",
    "link",
    "image",
    "video",
    "align"
];

export function RichTextEditor(props: any) {
    const reactQuillRef = useRef<ReactQuill>(null);

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const url = await StorageService.upload(file);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, "image", url);
                }
            }
        };
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                ['link', 'image', 'video'],

                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],

                [{ 'size': ['14px', '16px', '18px'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean'],
            ],
            handlers: {
                image: imageHandler,
            },
        }
    }), [imageHandler]);

    return <ReactQuill ref={reactQuillRef} theme="snow" modules={modules} formats={formats} {...props} />;
}

export default RichTextEditor;