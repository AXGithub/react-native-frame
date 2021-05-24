import {appStore} from '@store/app-store'
import {userStore} from '@store/user-store'

export class RequestUtil {
    get(url: string, param?: any) {
        return this.request(url, 'GET', param)
    }

    delete(url: string, param?: any) {
        return this.request(url, 'DELETE', param)
    }

    post(url: string, param: any) {
        return this.request(url, 'POST', param)
    }

    private request = (url: string, method: any, params: any) => {
        let isOk: boolean
        let code: number
        let body = params ? JSON.stringify(params) : null
        return new Promise((resolve, reject) => {
            fetch(this.getUrl(url), {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userStore.token}`
                },
                body
            })
                .then(async response => {
                    const respText = await response.text()

                    if (response.ok) {
                        isOk = true
                    } else {
                        isOk = false
                    }
                    code = response.status
                    return respText.length > 0 ? JSON.parse(respText) : response
                })
                .then(responseData => {
                    if (isOk) {
                        resolve(responseData)
                    } else {
                        // 封装通用处理逻辑
                        console.log('请求失败1 = ', code)
                        reject(responseData)
                    }
                })
                .catch(error => {
                    console.log('请求失败2 = ', error)
                    reject(error)
                })
        })
    }

    private getUrl(url: string) {
        return appStore.apiAddress + url
    }
}
