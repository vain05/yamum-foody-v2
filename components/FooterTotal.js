import React from "react";
import {
    View,
    Text,
    Platform
} from 'react-native';

import {
    LinearGradient
} from "react-native-linear-gradient"

import {
    TextButton
} from "../components";

import {
    FONTS,
    COLORS,
    SIZES
} from "../constants"

const FooterTotal = ({total, onPress}) => {
    return (
        <View>
            <LinearGradient
                start = {{x: 0 , y: 0}}
                end = {{x: 0 , y: 1}}
                colors = {[COLORS.transparent, COLORS.lightGray1]}
                style = {{
                    position: 'absolute',
                    top: -15,
                    left: 0,
                    right: 0,
                    height: 50,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                }}
            />

            <View
                style = {{
                    padding: SIZES.padding,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: COLORS.white
                }}
            >

                <View
                    style = {{
                        flexDirection: 'row',
                        marginTop: SIZES.padding
                    }}
                >
                    <Text
                        style = {{
                            flex: 1,
                            ...FONTS.h2
                        }}
                    >
                        Total:
                    </Text>

                    <Text
                        style = {{
                            ...FONTS.h2
                        }}
                    >
                        ${total.toFixed(2)}
                    </Text>
                </View>
                <TextButton
                    buttonContainerStyle={{
                        height: 60,
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColorL: COLORS.primary
                    }}
                    label = "Place your orders"
                    onPress = {onPress}
                />                        
            </View>
        </View>
    )
}

export default FooterTotal