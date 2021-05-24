import { PlatformConstants } from '@theme/platform'

// 初始化 extension
Number.prototype.adaptW = function adaptW(): number {
    return (this * PlatformConstants.windowWidth) / 375
}

Number.prototype.adaptH = function adaptH(): number {
    return (this * PlatformConstants.windowHeight) / 812
}
