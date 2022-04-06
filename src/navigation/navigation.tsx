import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabAsset } from '@configure/assets'
import HomeScreen from '@page/stories/home/home-screen'
import ProfileScreen from '@page/stories/profile/profile-screen'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { navigationConfig } from './route'
import { bubbleStore } from '@store/bubble-store'
import { TabName } from 'src/enum/common-enum'
import { observer } from 'mobx-react'
import { Badge } from 'teaset'
import { DemoScreen } from '@page/stories/demo/demo-screen'

const TabStack = createBottomTabNavigator()
const PageStack = createStackNavigator()

// 底部Tab的Icon和红点
const TabIconComponent = observer(props => {
    const { routeName, focused } = props
    let iconName
    let badgeCount
    switch (routeName) {
        case TabName.Demo:
            iconName = focused ? TabAsset.homeActive : TabAsset.home
            badgeCount = bubbleStore.tabBubble.Home
            break
        case TabName.Home:
            iconName = focused ? TabAsset.homeActive : TabAsset.home
            badgeCount = bubbleStore.tabBubble.Home
            break
        case TabName.Profile:
            iconName = focused ? TabAsset.profileActive : TabAsset.profile
            badgeCount = bubbleStore.tabBubble.Profile
            break
    }
    return (
        <View style={styles.tabContainer}>
            <Image source={iconName} style={styles.tabImage} />
            {badgeCount > 0 && (
                <View style={styles.tabTextContainer}>
                    <Badge type={'capsule'} count={badgeCount} />
                </View>
            )}
        </View>
    )
})

// tab主页
function Tab() {
    return (
        <TabStack.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    return <TabIconComponent routeName={route.name} focused={focused} />
                }
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray'
            }}
        >
            <TabStack.Screen name='Demo' component={DemoScreen} />
            <TabStack.Screen name='Home' component={HomeScreen} />
            <TabStack.Screen name='Profile' component={ProfileScreen} />
        </TabStack.Navigator>
    )
}

// app导航栈,默认tab主页,  map内定义了所有在app内要用到的子页面
export default function app_navigation() {
    return (
        <PageStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <PageStack.Screen name={'Tab'} component={Tab} />
            {navigationConfig.map(item => {
                return <PageStack.Screen key={item.name} name={item.name} component={item.component} />
            })}
        </PageStack.Navigator>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        width: 24,
        height: 24,
        margin: 5
    },
    tabImage: {
        width: 20,
        height: 20
    },
    tabTextContainer: {
        position: 'absolute',
        right: -12,
        top: -3
        // backgroundColor: 'red',
        // borderRadius: 6,
        // width: 12,
        // height: 12,
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingHorizontal: 2..adaptW(),
        // paddingVertical: 1..adaptW()
    }
})
