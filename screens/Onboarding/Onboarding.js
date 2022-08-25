import React from "react";
import {
    View,
    Text,
    ImageBackground,
    Image,
    Animated
} from "react-native"
import { Extrapolate } from "react-native-reanimated";

import {
    constants,
    images,
    FONTS,
    SIZES,
    COLORS
} from "../../constants"

import {
    TextButton
} from "../../components"

const OnBoarding = ({navigation}) => {

    const scrollX = new Animated.Value(0)

    const Dots = () => {

        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return (
            <View
            style = {{
                flex: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                {
                    constants.onboarding_screens.map((item, index) => {
                        
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.lightOrange, COLORS.primary, COLORS, lightOrange],
                            extrapolate: "clamp"
                        })

                        const dotWidth = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [10, 30, 10],
                            extrapolate: "clamp"
                        })
 
                        
                        return (
                            <Animated.View
                                key = {`dot-${index}`}
                                style ={{
                                    borderRadius: 5,
                                    marginHorizontal: 6,
                                    width: dotWidth,
                                    height: 10,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }
    
    function renderHeaderLogo() {
        return (
            <View
                style = {{
                    position: 'absolute',
                    top: SIZES.height > 800 ? 50 :25,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source = {images.logo_02}
                    resizeMode = 'contain'
                    style = {{
                        width: SIZES.width*0.5,
                        height: 100
                    }}
                >

                </Image>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style = {{
                    height: 160
                }}
            >
            {/* Dots */}
                <View
                style = {{
                    flex: 1,
                    justifyContent: 'center'
                }}
                >
                    <Dots />
                </View>
            {/* Buttons */}
                <View
                    style = {{
                        flex: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZES.padding,
                        marginVertical: SIZES.padding
                    }}
                >
                    <TextButton
                        label = "Skip"
                        buttonContainerStyle = {{
                            backgroundColor: null
                        }}

                        labelStyle = {{
                            color: COLORS.darkGray2
                        }}

                        onPress ={() => navigation.replace("SignIn")}
                    />

                    <TextButton
                        label = "Next"
                        buttonContainerStyle = {{
                            height: 60,
                            width: 200,
                            borderRadius: SIZES.radius
                        }}

                        //onPress
                    />
                </View>
            </View>
        )
    }

    return (
        <View
            style = {{
                flex: 1,
                backgroundColor: COLORS.white
            }}    
        >
            {renderHeaderLogo()}
            <Animated.FlatList
                horizontal
                pagingEnabled
                data = {constants.onboarding_screens}
                scrollEventThrottle = {16}
                snapToAlignment = "center"
                showsHorizontalScrollIndicator = {false}
                onScroll = {Animated.event(
                    [
                        {nativeEvent: {contentOffset: {x: scrollX}}}
                    ],
                    {useNativeDriver: false}
                )}
                keyExtractor = {(item) => `${item.id}`}
                renderItem = {({item,index}) =>{
                    return (
                        <View
                            style = {{
                                width: SIZES.width,
                            }}
                        >
                            {/* Header */}
                            <View
                            style = {{
                                flex: 3
                            }}                            
                            >
                                <ImageBackground
                                    source={item.backgroundImage}
                                    style = {{
                                        flex: 1,
                                        alignItems:'center',
                                        justifyContent: 'flex-end',
                                        height: index == 1 ? "92%" : "100%",
                                        width: "100%"
                                    }}
                                >
                                    <Image
                                        source = {item.bannerImage}
                                        resizeMode = "contain"
                                        style ={{
                                            width: SIZES.width*0.8,
                                            height: SIZES.width*0.8,
                                            marginBottom: -SIZES.padding
                                        }}
                                    >

                                    </Image>
                                </ImageBackground>
                            </View>

                            {/* Detail */}
                            <View
                                style = {{
                                    flex:1,
                                    marginTop:30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: SIZES.radius,

                                }}
                            >
                                <Text
                                    style = {{
                                        ...FONTS.h1,
                                        fontSize:25
                                    }}
                                >
                                    {item.title}
                                </Text>

                                <Text
                                    style = {{
                                        marginTop: SIZES.radius,
                                        textAlign: 'center',
                                        color: COLORS.darkGray,
                                        paddingHorizontal: SIZES.padding,
                                        ...FONTS.body3
                                    }}
                                >
                                    {item.title}
                                </Text>
                            </View>            
                            
                        </View>
                    )
                }} 
            />

            {renderFooter()}
        </View>
    )
}

export default OnBoarding;