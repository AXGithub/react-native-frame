import {userService} from '@services/user-service'
import {userStore} from '@store/user-store'
import React, {useContext, useState} from 'react'
import {View, Text, Button, Alert} from 'react-native'
import {AuthContext, RouteType} from '@navigation/route-context'
import {NavigationHeader} from "@component/navigation-header";

interface IP {
    navigation?: any
}

interface IS {
}

export default function ProfileScreen(props: IP) {
    const authContext = useContext(AuthContext)
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <NavigationHeader title={'个人中心'} isLeft={false}/>
            <Text style={{marginTop: 50}}>Profile!</Text>
            <Button title='去首页' onPress={() => props.navigation.navigate('Home')}/>
            <Button
                title='去详情页'
                onPress={() => {
                    props.navigation.navigate('DetailScreen', {
                        item: 'profile',
                        time: new Date().getTime()
                    })
                }}
            />
            <Button
                title='退出登录'
                onPress={() => {
                    userService.loginOut().then(() => {
                        authContext.dispatch({type: RouteType.LOGIN})
                    })
                }}
            />
        </View>
    )
}
