import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { observer } from 'mobx-react'
import NetworkLogger, { clearRequests } from 'react-native-network-logger'
import { NavigationHeader } from '@component/navigation-header'

export interface Props {
    navigation?: any
}

export interface State {}

@observer
export default class FetchHistoryScreen extends Component<Props, State> {
    render() {
        return (
            <View style={styles.container}>
                <NavigationHeader
                    title={'网络请求列表'}
                    leftClick={() => {
                        this.props.navigation.goBack()
                    }}
                    rightView={
                        <Button
                            title={'清空'}
                            onPress={() => {
                                clearRequests()
                            }}
                            color={'#fff'}
                        />
                    }
                />
                <NetworkLogger />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    }
})
