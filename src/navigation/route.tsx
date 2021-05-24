import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '@page/stories/login/login-screen'
import DetailsScreen from '@page/stories/home/detail/detail-screen'

const LoginStack = createStackNavigator()
/**
 * 登录模块
 */
export function LoginModule() {
    return (
        <LoginStack.Navigator
            initialRouteName={'LoginScreen'}
            screenOptions={{
                headerShown: false
            }}
        >
            <LoginStack.Screen name={'LoginScreen'} component={LoginScreen} />
        </LoginStack.Navigator>
    )
}

// APP导航器中的路由
export const navigationConfig = [{ name: 'DetailScreen', component: DetailsScreen }]
