import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DebugScreen from './debug-screen'
import FetchHistoryScreen from './fetch-history-screen'
/**
 * debug模块
 */
const DebugStack = createStackNavigator()
export function DebugModule() {
    return (
        <DebugStack.Navigator
            initialRouteName={'DebugScreen'}
            screenOptions={{
                headerShown: false
            }}
        >
            <DebugStack.Screen name={'DebugScreen'} component={DebugScreen} />
            <DebugStack.Screen name={'FetchHistoryScreen'} component={FetchHistoryScreen} />
        </DebugStack.Navigator>
    )
}
