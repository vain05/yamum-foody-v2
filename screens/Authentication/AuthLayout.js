import React from "react";
import {
    View,
    Text,
    Image
} from "react-native"

import {
    KeyboardAwareScrollView
} from "react-native-keyboard-aware-scroll-view";

import {
    images,
    FONTS,
    COLORS,
    SIZES
} from "../../constants"

const AuthLayout = ({title, subtitle, titleContainerStyle, children}) => {
    return (
        <View
            style = {{
                flex: 1,
                paddingVertical: SIZES.padding,
                backgroundColor: COLORS.white
            }}
        >
            <KeyboardAwareScrollView
                keyboardDimissMode = "on-drag"
                contentContainerStyle = {{
                    flex: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
            {/* App icons */}
                <View
                    style = {{
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source = {images.logo_02}
                        resizeMode = "contain"
                        style ={{
                            height: 100,
                            width: 200
                        }}
                    >
                        
                    </Image>
                </View>
            {/* Title */}

                <View
                    style = {{
                        marginTop: SIZES.padding,
                        ...titleContainerStyle
                    }}
                >
                    <Text
                        style = {{
                            textAlign: 'center',
                            ...FONTS.h2
                        }}
                    >
                        {title}
                    </Text>

                    <Text
                        style = {{
                            textAlign: 'center',
                            color: COLORS.darkGray,
                            marginTop: SIZES.base,
                            ...FONTS.body3
                        }}
                    >
                        {subtitle}
                    </Text>
                </View>

            {/* Children */}
            {children}
            </KeyboardAwareScrollView>
        </View>
    )
}

export default AuthLayout;