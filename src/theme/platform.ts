import { Dimensions, Platform, StatusBar } from 'react-native'
import { getBrand, getBundleId, getSystemVersion, getUniqueId, getVersion, hasNotch } from 'react-native-device-info'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const isIPhoneX = () => {
    if (Platform.OS === 'ios') {
        return hasNotch()
    }
    return false
}

const isIphonePlus = () => {
    if (Platform.OS === 'ios' && windowWidth === 414 && windowHeight === 736) {
        return true
    }
    return false
}

const isLandscape = windowWidth > windowHeight

const statusBarHeight = () => {
    if (Platform.OS === 'ios') {
        if (isIPhoneX) return isLandscape ? 0 : 44
    } else if (Platform.OS === 'android') {
        if (Platform.Version > 20) return StatusBar.currentHeight
        return 0
    }
    return isLandscape ? 0 : 20
}

const screenBottomHeight = () => {
    return isIPhoneX ? 34 : 0
}

const FontWeight = {
    Thin: '100',
    UltraLight: '200',
    Light: '300',
    Regular: '400',
    Medium: '500',
    Semibold: '600',
    Bold: '700',
    Heavy: '800',
    Black: '900'
}

const fontWeight100 = () => {
    if (Platform.OS === 'ios' && Number(getSystemVersion()) >= 13) {
        return FontWeight.Light
    }
    return FontWeight.Thin
}

// App的基本信息
const PlatformConstants = {
    ...Platform,
    windowWidth,
    windowHeight,
    isIos: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    isIPhoneX: isIPhoneX(),
    isIphonePlus: isIphonePlus(),
    isAndroidLong: windowHeight / windowWidth > 1.8,
    FontWeight,
    fontWeight100: fontWeight100(),
    statusBarHeight: statusBarHeight(),
    screenBottomHeight: screenBottomHeight()
}

// 设备信息
const DeviceInfoConstants = {
    bundleId: getBundleId(),
    version: getVersion(),
    // 手机型号
    brand: getBrand(),
    // DeviceId
    uniqueId: getUniqueId()
}

/**
 * 横向适配
 * app元素高度 a / app总高度 b = 设计高度 c / 设计总高度 d
 * a/b = c/d
 * a = c/d*b = c * b / d
 */
export function adaptW(width: number) {
    return width.adaptW()
}

/**
 * 纵向适配
 * @param height
 */
export function adaptH(height: number) {
    return height.adaptH()
}

export { PlatformConstants, DeviceInfoConstants }
