import { userApi } from '@api/user-api'
import { RequestUtil } from '@util/request'
import {userStore} from "@store/user-store"

class UserService extends RequestUtil {
    login() {
        let param = {
            mobile: '17300001001',
            password: '123456',
            device: 'ios'
        }
        return this.post(userApi.LOGIN, param).then(data => {
            return data
        }).catch(err => {
            console.log('loginError====' + err)
        })
    }

    getUserInfo() {
        this.get(userApi.USERINFO)
            .then((res: any) => {
                console.log('获取用户信息成功 = ', res)
            })
            .catch(e => {
                console.log('获取用户信息失败 = ', e)
            })
    }

    loginOut() {
        return this.delete(userApi.LOGIN_OUT).then(() => {
            userStore.setToken('')
        })
    }
}

export const userService = new UserService()
