import { makeAutoObservable } from 'mobx'
import { TabName } from 'src/enum/common-enum'

interface TabBubble {
    Home: number
    Profile: number
}

/**
 * 气泡
 */
export class BubbleStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 底部tab红点
    tabBubble: TabBubble = {
        Home: 0,
        Profile: 0
    }

    // 修改底部tab红点
    setTabBubble_Home(num: number, type: TabName) {
        switch (type) {
            case TabName.Home:
                this.tabBubble = { ...this.tabBubble, Home: num }
                break
            case TabName.Profile:
                this.tabBubble = { ...this.tabBubble, Profile: num }
                break
        }
    }
}

export const bubbleStore = new BubbleStore()
