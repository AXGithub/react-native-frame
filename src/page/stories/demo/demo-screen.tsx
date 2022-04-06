import { NavigationHeader } from '@component/navigation-header'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'teaset'


interface Props {

}

/**
 * 用途:
 * @param props
 * @returns
 */
const _DemoScreen = (props: Props) => {
    return (
        <View style={style.main}>
            <NavigationHeader title={'Demo'} isLeft={false} />
            <View style={style.view}>
                <Button style={style.btn} title={'1'} onPress={() => {
                    console.log(111);
                }} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1,
    },
    view: {
        flexDirection: 'column',
        paddingTop: 30
    },
    btn: {
        width: 100,
        height: 30,
        alignSelf: 'center'
    }
})

export const DemoScreen = React.memo(_DemoScreen)
