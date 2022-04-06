import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { userStore, UserStore } from '@store/user-store'
import { userService } from '@services/user-service'
import { AuthContext, RouteType } from '@navigation/route-context'

interface IP {
    userStore: UserStore
    navigation?: any
}

export default function LoginScreen() {
    const authContext = useContext(AuthContext)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>LoginScreen!</Text>
            <Button
                title='登录'
                onPress={() => {
                    // userService.login().then((data: any) => {
                    //     if (data) {
                    //         userStore.setToken(data?.token)
                    //         authContext.dispatch({ type: RouteType.Main })
                    //     }
                    // })
                    userStore.setToken("token")
                            authContext.dispatch({ type: RouteType.Main })
                }}
            />
        </View>
    )
}
