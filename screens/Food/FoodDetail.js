import React from "react";
import {
    Text,
    View,
    Image,
    ScrollView
} from "react-native";

import {
    FONTS,
    COLORS,
    SIZES,
    images,
    icons,
    dummyData
} from "../../constants"

import {
    Header,
    IconButton,
    CartQuantityButton,
    TextButton
} from "../../components"

const FoodDetail = () => {

    const [foodItem, setFoodItem] = React.useState(dummyData.vegBiryani)
    const [qty, setQty] = React.useState(1)

    function renderHeader() {
        <Header
            title = "DETAILS"
            containerStyle={{
                height: 50,
                marginHorizontal: SIZES.padding,
                marginTop: 40
            }}
            leftComponent = {
                <IconButton
                    icon = {icons.back}
                    containerStyle ={{
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: SIZES.radius,
                        borderColor: COLORS.gray2
                    }}
                    iconStyle = {{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.gray2
                    }}
                    onPress = {() => console.log("Back")}
                />
            }
            rightComponent = {
                <CartQuantityButton
                    quantity={3}
                />
            }
        />
    }

    function renderDetails() {
        return (
            <View
                style = {{
                    marginTop: SIZES.radius,
                    marginBottom: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <View
                    style = {{
                        height: 190,
                        borderRadius: 15,
                        backgroundColor: COLORS.lightGray2
                    }}
                >
                    <View
                        style = {{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: SIZES.base,
                            paddingHorizontal: SIZES.radius
                        }}
                    >
                        <View
                            style = {{
                                flexDirection: 'row',

                            }}
                        >
                            <Image
                                source= {icons.calories}
                                style = {{
                                    width: 30,
                                    height: 30 
                                }}
                            />

                            <Text
                                style = {{
                                    color: COLORS.gray2,
                                    ...FONTS.body4
                                }}
                            >
                                {foodItem?.calories} calories
                            </Text>
                        </View>

                        <Image
                            source={icons.love}
                            style = {{
                                width: 20, 
                                height: 20,
                                tintColor: foodItem?.isFavorite ? COLORS.primary : COLORS.gray
                            }}
                        />
                    </View>

                    <Image
                        source={foodItem?.image}
                        resizeMode = "contain"
                        style = {{
                            height: 170,
                            width: "100%"
                        }}
                    />

                    <View
                        style = {{
                            marginTop: SIZES.padding
                        }}
                    >
                        <Text
                            style = {{
                                ...FONTS.h1
                            }}
                        >
                            {foodItem?.name}
                        </Text>

                        <Text
                            style = {{
                                marginTop: SIZES.base,
                                color: COLORS.darkGray,
                                textAlign: 'justify', 
                                ...FONTS.body3
                            }}
                        >
                            {foodItem?.description}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderRestaurant() {
        return (
            <View
                style = {{
                    flexDirection: "row",
                    marginVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                <Image
                    source={images.profile}
                    style = {{
                        width: 50,
                        height: 50,
                        borderRadius: SIZES.radius
                    }}
                />

                <View
                    style = {{
                        flex: 1,
                        marginLeft:SIZES.radius,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style = {{
                            ...FONTS.h3
                        }}
                    >
                        Restaurant Name
                    </Text>

                    <Text
                        style = {{
                            color: COLORS.lightGray1,
                            ...FONTS.body4
                        }}
                    >
                        69km away from you
                    </Text>
                </View>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style = {{
                    flexDirection: 'row',
                    height: 120,
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.radius
                }}
            >
                {/* StepperInput */}
                <StepperInput
                    value = {qty}
                    onAdd = {() => setQty(qty + 1)}
                    onMinus = {() => {
                        if(qty > 1) {
                            setQty(qty - 1) 
                        }
                    }}
                />
                {/* Text Button */}
                <TextButton>
                    style = {{
                        flex: 1,
                        flexDirection: 'row',
                        height: 60,
                        marginLeft: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}
                    label = "Buy Now"
                    label2 = "$15.99"
                </TextButton>
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
            {/* Header */}

            {renderHeader()}

            {/* body */}

            <ScrollView>
                {/* DETAILS */}
                {renderDetails()}
                {/* Restaurant */}
                {renderRestaurant}
            </ScrollView>

            {/* Footer */}
            {renderFooter}
        </View>
    )
}

export default FoodDetail;