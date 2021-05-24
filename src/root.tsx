import React, { useContext, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DebugButton from '@page/debug/debug-button'
import { AuthContext, RouteType } from '@navigation/route-context'
import { userStore } from '@store/user-store'
import { Text, View } from 'react-native'
import { DebugModule } from '@page/debug/debug-navigation'
import { LoginModule } from '@navigation/route'
import AppNavigation from '@navigation/navigation'

const RootStack = createStackNavigator()
const MainStack = createStackNavigator()

// 显示的第一张页面
function SplashScreen() {
    return (
        <View>
            <Text>Splash</Text>
        </View>
    )
}

// App的第一个路由
function MainStackScreen({ navigation }) {
    const authContext = useContext(AuthContext)
    useEffect(() => {
        userStore.getToken().then(data => {
            userStore.setToken(data)
            authContext.dispatch({ type: data ? RouteType.Main : RouteType.LOGIN })
        })
    }, [])

    return (
        <>
            <MainStack.Navigator headerMode={'none'}>
                {authContext.state.type === RouteType.Main ? (
                    <MainStack.Screen
                        name={RouteType.Main}
                        component={AppNavigation}
                        options={{
                            animationEnabled: false
                        }}
                    />
                ) : authContext.state.type === RouteType.LOGIN ? (
                    <MainStack.Screen
                        name={RouteType.LOGIN}
                        component={LoginModule}
                        options={{
                            animationEnabled: false
                        }}
                    />
                ) : (
                    <MainStack.Screen
                        name={RouteType.DEFAULT}
                        component={SplashScreen}
                        options={{
                            animationEnabled: false
                        }}
                    />
                )}
            </MainStack.Navigator>
            <DebugButton
                onPress={() => {
                    navigation.navigate('DebugModal')
                }}
            />
        </>
    )
}

/**
 * APP的根路由
 * Main: APP路由栈
 * DebugModal: Debug路由栈
 */
export function Root() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case RouteType.Main:
                    return {
                        ...prevState,
                        type: RouteType.Main
                    }
                case RouteType.LOGIN:
                    return {
                        ...prevState,
                        type: RouteType.LOGIN
                    }
            }
        },
        {
            type: RouteType.DEFAULT
        }
    )
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <RootStack.Navigator mode={'modal'} headerMode={'none'}>
                <RootStack.Screen name={'App'} component={MainStackScreen} />
                <RootStack.Screen name={'DebugModal'} component={DebugModule} />
            </RootStack.Navigator>
        </AuthContext.Provider>
    )
}
