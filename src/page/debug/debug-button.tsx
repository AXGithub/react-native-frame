import * as React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Animated, StyleSheet, PanResponder, PanResponderInstance, Text } from 'react-native'
import { PlatformConstants } from '@theme/platform'

const MOVE_DIS = 1.5
const BUTTON_H = 40
const BUTTON_W = 70

interface State {
    aLeft: any
    aBottom: any
}

@observer
export default class debugButton extends React.Component<any, State> {
    static propTypes = {
        onPress: PropTypes.func.isRequired // 点击加载的回调函数
    }
    static defaultProps = {
        onPress: () => {
            console.warn('Warn: Check whether set onPress function on SuspensionButton~')
        }
    }
    tapX: number
    tapY: number
    tapXInWin: number
    tapYInWin: number
    isFirstTap: boolean
    isTap: boolean
    multiTap: boolean
    imgWidth: number
    imgHeight: number
    _panResponder: PanResponderInstance

    constructor(props) {
        super(props)
        this.tapX = 0 // 首次点击在图片中位置
        this.tapY = 0
        this.tapXInWin = 0 // 首次点击在屏幕中的位置
        this.tapYInWin = 0

        this.isFirstTap = true
        this.isTap = true
        this.multiTap = false
        this.imgWidth = 0
        this.imgHeight = 0
        this.state = {
            aLeft: new Animated.Value(0),
            aBottom: new Animated.Value(200)
        }
    }

    UNSAFE_componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        })
    }

    _handlePanResponderGrant = (event, gestureState) => {
        this.tapX = event.nativeEvent.locationX.toFixed(3)
        this.tapY = event.nativeEvent.locationY.toFixed(3)
        if (gestureState.numberActiveTouches > 1) {
            this.multiTap = true
            return null
        }
    }

    _handlePanResponderMove = (event, gestureState) => {
        if (gestureState.numberActiveTouches > 1) {
            this.multiTap = true
        }
        if (this.multiTap) {
            return null
        }
        if (this.isFirstTap) {
            this.tapXInWin = gestureState.moveX.toFixed(3)
            this.tapYInWin = gestureState.moveY.toFixed(3)
            this.isFirstTap = false
        } else {
            // 用距离判断是不是tap
            let thisTapX = gestureState.moveX.toFixed(3)
            let thisTapY = gestureState.moveY.toFixed(3)
            let x_dis = Math.abs(thisTapX - this.tapXInWin)
            let y_dis = Math.abs(thisTapY - this.tapYInWin)
            let dis = Math.sqrt(x_dis * x_dis + y_dis * y_dis)
            this.isTap = MOVE_DIS >= dis
        }

        if (!this.isTap) {
            // 手指在整个屏幕的坐标点
            const moveX = gestureState.moveX
            const moveY = gestureState.moveY

            const offsetX = this.imgWidth - this.tapX
            const offsetY = this.imgHeight - this.tapY

            this.state.aLeft.setValue(moveX - offsetX)
            this.state.aBottom.setValue(PlatformConstants.windowHeight - moveY - offsetY)
        }
    }

    _handlePanResponderEnd = (event, gestureState) => {
        if (this.multiTap) {
            this.multiTap = false
            this.isFirstTap = true
            this.isTap = true
            return null
        }
        if (this.isTap) {
            this._onImageClick()
        } else {
            this._checkBtnPosition()
        }
        this.isFirstTap = true
        this.isTap = true
    }

    _checkBtnPosition = () => {
        let mar_left = this.state.aLeft._value
        let mar_bottom = this.state.aBottom._value
        let screen_w = PlatformConstants.windowWidth
        let screen_h = PlatformConstants.windowHeight

        if (mar_left < screen_w - screen_w / 2 - BUTTON_W / 2) {
            mar_left = 0
        } else {
            mar_left = screen_w - BUTTON_W
        }
        if (mar_bottom < 0) {
            mar_bottom = 20
        } else if (mar_bottom > screen_h - BUTTON_H * 2) {
            // 由于这里如果顶到状态栏，会导致按钮点击不到，所以乘以了个2倍的按钮高度
            mar_bottom = screen_h - BUTTON_H * 2
        }

        Animated.timing(this.state.aLeft, {
            toValue: mar_left,
            duration: 150,
            useNativeDriver: false
        }).start()
        Animated.timing(this.state.aBottom, {
            toValue: mar_bottom,
            duration: 150,
            useNativeDriver: false
        }).start()
    }

    _onImageClick = () => {
        if (typeof this.props.onPress === 'function') {
            this.props.onPress()
        }
    }

    onLayout = event => {
        if (this.imgWidth && this.imgHeight) {
            return null
        }
        const { width, height } = event.nativeEvent.layout
        this.imgWidth = width
        this.imgHeight = height
    }

    render() {
        return (
            <Animated.View
                {...this._panResponder.panHandlers}
                onLayout={this.onLayout}
                style={[
                    styles.imageContainer,
                    styles.suspensionButton,
                    this.props.style,
                    {
                        left: this.state.aLeft,
                        bottom: this.state.aBottom
                    }
                ]}
            >
                <Text style={styles.buttonText}>Debug</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 100001
    },
    imageContainer: {
        position: 'absolute',
        backgroundColor: 'transparent'
    },
    suspensionButton: {
        width: BUTTON_W,
        height: BUTTON_H,
        borderRadius: BUTTON_W / 2,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e60012',
        zIndex: 100001
    },
    buttonText: {
        color: '#fff'
    }
})
