import { NavigationHeader } from '@component/navigation-header'
import React, { useCallback } from 'react'
import { View, Text, Button } from 'react-native'

interface IP {
    navigation?: any
    route?: any
}
export default function DetailsScreen(props: IP) {
    const { item = '', time = '' } = props.route.params ?? {}
    const [count1, setCount1] = React.useState(0)
    const [count2, setCount2] = React.useState(0)

    const increaseCounter1 = useCallback(() => {
        setCount1(count1 => count1 + 1)
    }, [])

    const increaseCounter2 = useCallback(() => {
        setCount2(count2 => count2 + 1)
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <NavigationHeader title={'详情页'} />
            <Text>Detail</Text>
            <Text>Param item {item}</Text>
            <Text>Param time {time}</Text>
            <Button
                title={'详情页'}
                onPress={() => {
                    props.navigation.navigate('DetailScreen')
                }}
            />
            <Button onPress={increaseCounter1} title={'Increase counter 1'} />
            <Button onPress={increaseCounter2} title={'Increase counter 2'} />
            <Counter value={count1}>Counter 1</Counter>
            <Counter value={count2}>Counter 2</Counter>
        </View>
    )
}

const Counter22 = ({ value, children }) => {
    console.log('Render: ', children)

    return (
        <View>
            <Text>
                {children}: {value}
            </Text>
        </View>
    )
}

const Counter = React.memo(Counter22)
