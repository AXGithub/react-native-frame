import React from 'react'
import { View, Text, Button, Appearance, TextInput } from 'react-native'
import { observer, inject } from 'mobx-react'
import { AppStore } from '@store/app-store'
import { UserStore } from '@store/user-store'
import { userService } from '@services/user-service'
import { NavigationHeader } from '@component/navigation-header'
import { bubbleStore } from '@store/bubble-store'
import { TabName } from 'src/enum/common-enum'

interface IP {
    appStore: AppStore
    userStore: UserStore
    navigation?: any
}

interface IS {
    inputV: string
}

@inject('appStore', 'userStore')
@observer
export default class HomeScreen extends React.Component<IP, IS> {
    realText = ''
    state = {
        inputV: ''
    }

    render() {
        const colorScheme = Appearance.getColorScheme()
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <NavigationHeader title={'首页'} isLeft={false} />
                <Text style={{ marginTop: 50 }}>{this.props.appStore.apiAddress}</Text>
                <Text>{this.props.appStore.socketAddress}</Text>
                <Text>token: {this.props.userStore.token}</Text>
                <Text>当前主题色{colorScheme}</Text>
                <Text>Home!</Text>
                <Button
                    title='去个人中心'
                    onPress={() => {
                        this.props.navigation.navigate('Profile')
                    }}
                />
                <Button title={'去详情页'} onPress={() => this.props.navigation.navigate('DetailScreen')} />
                <Button title={'获取个人信息'} onPress={() => userService.getUserInfo()} />
                <Button
                    title={'加首页红点'}
                    onPress={() => {
                        bubbleStore.setTabBubble_Home(Math.floor(Math.random() * 100), TabName.Home)
                    }}
                />
                <Button
                    title={'加个人主页红点'}
                    onPress={() => {
                        bubbleStore.setTabBubble_Home(Math.floor(Math.random() * 100), TabName.Profile)
                    }}
                />
                <Button
                    title={'test = ' + this.props.appStore?.testa?.aa + ' -- ' + this.props.appStore?.testa?.bb}
                    onPress={() => {
                        this.props.appStore.setTestA(Math.floor(Math.random() * 100).toString())
                    }}
                />
                <View style={{ width: (100).adaptW(), height: (100).adaptW(), backgroundColor: 'green' }}>
                    <Text>自适应宽高adapt</Text>
                </View>
            </View>
        )
    }
}
