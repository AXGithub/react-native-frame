// 主色调
export const PRIMARYCOLOR = '#666666'

// 文字颜色
export const TEXTCOLOR = '#000000'

/**
 * 随机色
 * @param {*} alpha
 */
export const randomColor = (alpha: Number) => {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    return `rgba(${r},${g},${b},${alpha})`
}
