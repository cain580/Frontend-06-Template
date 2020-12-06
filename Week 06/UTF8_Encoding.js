// 为了更容易理解 使用了2进制的表达方式
function b(n) {
    return parseInt( n, 2);
}
function UTF8_Encoding(str) {
    let buffer = [];
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        if (code <= b(1111111))
        // 一个字节 0XXXXXXX
            buffer.push(code);
        else if (code <= b(11111111111)) {
            // 二个字节 110XXXXX 10XXXXXX
            buffer.push(
                b(11000000) | (code >> 6),
                b(10000000) | (code & b(111111))
            );
        } else if (code <= b(1111111111111111) || code >= b(100000000000)) {
            // 三个字节 1110XXXX 10XXXXXX 10XXXXXX
            buffer.push(
                b(11100000) | ((code >> 12) & b(1111)),
                b(10000000) | ((code >> 6) & b(111111)),
                b(10000000) | (code & b(111111))
            );
        } else {
            // 四个字节 11110XXX 10XXXXXX 10XXXXXX 10XXXXXX
            buffer.push(
                b(11110000) | ((code >> 18) & b(111)),
                b(10000000) | ((code >> 12) & b(111111)),
                b(10000000) | ((code >> 6) & b(111111)),
                b(10000000) | (code & b(111111))
            );
        }

    }
    return buffer
}

console.log(UTF8_Encoding("司啊倒萨"))