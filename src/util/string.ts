// 字符串中指定字符出现的次数
export function getCharCount(str: string, char: string) {
    let reg = new RegExp(char, 'g')
    let result = str.match(reg)
    let count = !result ? 0 : result.length
    return count
}

// 字符串中指定字符指定出现第num次的位置
export function findCharIndex(str: string, char: string, num: number) {
    let x = -1
    for (var i = 0; i < num; i++) {
        x = str.indexOf(char, x + 1)
    }
    return x
}
