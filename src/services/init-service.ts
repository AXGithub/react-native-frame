import { config } from '@configure/config'
import { LogBox, Platform, StatusBar } from 'react-native'
import { startNetworkLogging } from 'react-native-network-logger'

export class InitService {
    constructor() {
        console.log('--- 初始化 --- ')
        // 扩展声明
        require('@util/extension')
        // 过滤警告
        LogBox.ignoreLogs(['Unhandled Promise Rejection'])
        // 接口请求日志
        if (config.debug) {
            startNetworkLogging()
        }
        // 安卓沉浸式布局
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('rgba(0,0,0,0)')
            StatusBar.setTranslucent(true)
        }
    }
}
