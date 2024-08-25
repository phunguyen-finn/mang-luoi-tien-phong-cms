export const makeThumbnail = (file: any) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = URL.createObjectURL(file);
    const defer: any = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    image.onload = () => {
        if (image.width > image.height) {
            canvas.width = Math.min(400, image.width);
            canvas.height = canvas.width * image.height / image.width;
        } else {
            canvas.height = Math.min(400, image.height);
            canvas.width = canvas.height * image.width / image.height;
        }
        if (ctx?.fillStyle)
            ctx.fillStyle = "white";
        ctx?.fillRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            if (blob) defer.resolve(blob);
            else defer.reject('Error creating thumbnail');
            URL.revokeObjectURL(image.src);
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = 0;
            canvas.height = 0;
        }, 'image/jpeg', 0.95);
    }
    return defer.promise;
}