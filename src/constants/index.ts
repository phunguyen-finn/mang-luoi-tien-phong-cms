/* eslint-disable */
export const validateMessages = {
    default: 'Lỗi trường ${label}',
    required: 'Trường ${label} là bắt buộc',
    enum: '${label} phải là một trong [${enum}]',
    whitespace: '${label} không thể là ký tự trống',
    date: {
        format: 'Định dạng ngày ${label} không hợp lệ',
        parse: '${label} không thể chuyển đổi thành ngày',
        invalid: '${label} là ngày không hợp lệ',
    },
    string: {
        len: '${label} phải có ${len} ký tự',
        min: '${label} phải có ít nhất ${min} ký tự',
        max: '${label} phải có tối đa ${max} ký tự',
        range: '${label} phải nằm trong khoảng ${min}-${max} ký tự',
    },
    number: {
        len: '${label} phải bằng ${len}',
        min: '${label} phải tối thiểu ${min}',
        max: '${label} phải tối đa ${max}',
        range: '${label} phải nằm trong khoảng ${min}-${max}',
    },
    array: {
        len: 'Phải có ${len} ${label}',
        min: 'Ít nhất ${min} ${label}',
        max: 'Tối đa ${max} ${label}',
        range: 'Số lượng ${label} phải nằm trong khoảng ${min}-${max}',
    },
    pattern: {
        mismatch: '${label} không khớp với mẫu ${pattern}',
    },
};