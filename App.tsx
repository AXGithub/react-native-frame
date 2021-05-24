import React, { useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'mobx-react'
import mainStore from './src/store'
import { Root } from './src/root'
import { InitService } from '@services/init-service'
import { appStore } from '@store/app-store'

new InitService()

export default function App() {
    const navigationRef: any = useRef()
    return (
        <Provider {...mainStore}>
            <NavigationContainer
                ref={navigationRef}
                onStateChange={state => {
                    // console.log('state = ', state);
                    // console.log('navigationRef = ', navigationRef.current.getCurrentRoute().name);
                    let _root = state.routes[state.index] // root name
                    // console.log('root = ', _root);
                    let _main = _root.state.routes[_root.state.index] // main name
                    // console.log('main = ', _main);
                    let _tabs = _main?.state?.routes[0] // 0是因为navigation.tsx中 Tab 是第一个定义的
                    // console.log('_tabs = ', _tabs);
                    let _tab = _tabs?.state?.routes[_tabs?.state?.index]
                    // console.log('_tab = ', _tab);
                    appStore.setRoute(_root.name, _main.name, navigationRef.current.getCurrentRoute().name, _tab?.name)
                }}
            >
                <Root />
            </NavigationContainer>
        </Provider>
    )
}
