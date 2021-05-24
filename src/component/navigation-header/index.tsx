import { CommonAsset } from '@configure/assets'
import { useNavigation } from '@react-navigation/native'
import { PlatformConstants } from '@theme/platform'
import React from 'react'
import { ColorValue, Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationBar, Theme } from 'teaset'

/**
 * 顶部导航栏
 */
interface IP {
    title?: string
    backgroundColor?: ColorValue
    isLeft?: boolean
    leftView?: JSX.Element
    leftClick?: () => void
    rightView?: JSX.Element
    navigation?: any
}

const statusBarInsets = true
const H = Theme.navBarContentHeight + (statusBarInsets ? Theme.statusBarHeight : 0)

export const NavigationHeader = (props: IP) => {
    const { title, backgroundColor, isLeft = true, leftView, leftClick, rightView } = props
    const navigation = useNavigation()

    return (
        <View style={style.contain}>
            <NavigationBar
                style={{ backgroundColor: backgroundColor ?? '#4682B4' }}
                title={title}
                titleStyle={{ color: '#ffffff' }}
                statusBarInsets={statusBarInsets}
                animated={true}
                leftView={
                    isLeft ? (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={style.leftView}
                            onPress={() => {
                                if (leftClick) {
                                    leftClick()
                                } else {
                                    navigation.goBack()
                                }
                            }}
                        >
                            {leftView ?? <Image style={style.leftImg} source={CommonAsset.left} />}
                        </TouchableOpacity>
                    ) : null
                }
                rightView={rightView}
            />
        </View>
    )
}

const style = StyleSheet.create({
    contain: {
        height: H,
        width: PlatformConstants.windowWidth,
        backgroundColor: 'red'
    },
    leftView: {
        height: '100%',
        justifyContent: 'center'
    },
    leftImg: {
        width: 20,
        height: 20,
        marginLeft: 14,
        tintColor: '#fff'
    }
})
