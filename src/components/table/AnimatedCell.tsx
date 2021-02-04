import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface IProps {
    text: string;
}

export const AnimatedCell = (props: IProps) => {
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [firstLoad, setFirstLoad] = useState(true);

    const handleAnimation = () => {
        Animated.timing(animation, {
            toValue:1,
            duration: 500,
            useNativeDriver: false
        }).start( () => {
            Animated.timing(animation,{
                toValue:0,
                duration: 500,
                useNativeDriver: false
            }).start()
        })
    }

    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange:["rgb(0,0,0)" , "rgb(255,255,255)"]
      })
    const animatedStyle = {
        color: boxInterpolation
    }

    useEffect(() => {
        !firstLoad && handleAnimation();
        setFirstLoad(false);
    }, [props.text])

    return (
        <View style={styles.text}>
            <Animated.Text style={animatedStyle}>{props.text}</Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        alignItems: 'center'
    }
});