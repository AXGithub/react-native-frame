import React, { memo, useContext } from 'react'
import { View, NativeModules, Platform, ScrollView, TouchableOpacity, Text, StyleSheet, Button } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import { useNavigation } from '@react-navigation/native'
import { NavigationHeader } from '@component/navigation-header'
import { randomColor } from '@theme/color'
import { DeviceInfoConstants, PlatformConstants } from '@theme/platform'
import { config } from '@configure/config'
import AsyncStorage from '@react-native-community/async-storage'
import { getEnvDesp } from '@configure/env'
import { observer } from 'mobx-react'
import { userService } from '@services/user-service'
import { AuthContext, RouteType } from '@navigation/route-context'
import mainStore from '@store/index'
import { userStore } from '@store/user-store'

const WalleModule = NativeModules.WalleModule

interface Props {
    navigation?: any
}

interface State {
    walleChannel: string
}

@observer
export default class DebugScreen extends React.Component<Props, State> {
    _overlayComp
    cc = 0
    state = {
        walleChannel: ''
    }

    componentDidMount() {
        if (Platform.OS === 'android' && WalleModule != null) {
            WalleModule.getChannel()
                .then(channel => {
                    this.setState({ walleChannel: channel })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    _getContentArr = () => {
        let contentArr = [
            ['BundleId', DeviceInfoConstants.bundleId],
            ['二进制 / App', DeviceInfoConstants.version + ' / ' + config.version],
            ['环境 / socket版本号', getEnvDesp(config.env) + ' / ' + ''],
            ['手机型号 / 用户id', DeviceInfoConstants.brand + ' / ' + ''],
            ['DeviceId', DeviceInfoConstants.uniqueId]
        ]
        if (Platform.OS === 'android') {
            contentArr = contentArr.concat([['渠道', this.state.walleChannel]])
        }
        return contentArr
    }

    _renderRow = (name, value, index) => {
        return (
            <TouchableOpacity
                key={index}
                onLongPress={async () => {
                    Clipboard.setString(value)
                }}
            >
                <View style={styles.rowContainer}>
                    <Text style={styles.itemText}>{name}</Text>
                    <Text>{value}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationHeaderFunc />
                <ScrollView>
                    {this._getContentArr().map((item, index) => {
                        return this._renderRow(item[0], item[1], index)
                    })}
                    <View style={styles.bottomView}>
                        <Item
                            title={'网络请求'}
                            onPress={() => {
                                this.props.navigation.navigate({
                                    key: 'FetchHistoryScreen',
                                    name: 'FetchHistoryScreen'
                                })
                            }}
                        />
                        <Item title={'清空缓存'} onPress={() => AsyncStorage.clear()} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

function itemButton({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonTouch}>
            <View style={[styles.buttonView, { backgroundColor: randomColor(0.4) }]}>
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Item = memo(itemButton)

function NavigationHeaderFunc() {
    const navigation = useNavigation()
    const authContext = useContext(AuthContext)
    return (
        <NavigationHeader
            title={'调试页面'}
            leftClick={() => {
                navigation.goBack()
            }}
            rightView={
                userStore.token ? (
                    <Button
                        title={'登出'}
                        color={'#fff'}
                        onPress={() => {
                            userService.loginOut().then(() => {
                                navigation.goBack()
                                authContext.dispatch({ type: RouteType.LOGIN })
                            })
                        }}
                    />
                ) : null
            }
        />
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        height: 60,
        width: PlatformConstants.windowWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomColor: 'rgba(229, 229, 229, 1.0)'
    },
    itemText: {
        fontSize: 16,
        color: '#5c5c5c',
        marginRight: 'auto'
    },
    bottomView: {
        marginTop: 8,
        flexDirection: 'row',
        width: PlatformConstants.windowWidth,
        flexWrap: 'wrap',
        paddingRight: 15
    },
    buttonTouch: {
        marginTop: 10,
        marginLeft: 15
    },
    buttonView: {
        width: (PlatformConstants.windowWidth - 60) / 3,
        height: 37,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})
