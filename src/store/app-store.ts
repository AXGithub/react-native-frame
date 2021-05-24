import { config } from '@configure/config'
import { apiAddress, socketAddress } from '@configure/env'
import { makeAutoObservable } from 'mobx'
import { TabName } from 'src/enum/common-enum'

/**
 * appstore为系统级store,用来处理app的常规数据
 */
export class AppStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 发布环境 dev分支内测，staging分支外测，production分支线上
    apiAddress = apiAddress.get(config.env)
    socketAddress = socketAddress.get(config.env)
    // 路由
    route: {
        // 根路由层(是debug还是app?)
        rootName: string
        // 主路由(登录或者app内, 在MainStackScreen里识别)
        mainName: string
        // 当前的页面
        current: string
        // 当前页面所在的tab, 可能为空
        tab: string
    }

    testa = {
        aa: '',
        bb: ''
    }

    setRoute(rootName: string, mainName: string, current: string, tab: string) {
        this.route = {
            rootName,
            mainName,
            current,
            tab
        }
        console.log('路由 = ', this.route)
    }

    setTestA(str: string) {
        this.testa = {
            aa: str,
            bb: str
        }
    }
}

export const appStore = new AppStore()
