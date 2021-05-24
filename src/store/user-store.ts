import { action, makeObservable, observable } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'

/**
 * 用户store
 */
export class UserStore {
    tokenKey = 'token_user'
    token: string = ''
    userinfo: any
    num = 1

    constructor() {
        makeObservable(this, {
            num: observable,
            addNum: action,
            setToken: action,
            getToken: action,
            getTokenAsync: action
        })
    }

    setToken(newToken: string) {
        this.token = newToken
        this.saveToken(newToken)
    }

    private saveToken(newToken: string) {
        AsyncStorage.setItem(this.tokenKey, newToken)
    }

    getToken() {
        return AsyncStorage.getItem(this.tokenKey)
    }

    async getTokenAsync() {
        if (!this.token) {
            this.token = await this.getToken()
        }
    }

    setUserInfo(info: any) {
        this.userinfo = info
    }

    addNum(n: number) {
        console.log('当前是 n = ', this.num, n)

        this.num += n
    }
}

export const userStore = new UserStore()
