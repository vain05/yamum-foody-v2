import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList

} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,


} from "react-native-reanimated";

import {  connect  } from "react-redux";
import {  setSelectedTab  } from "../stores/tab/tabActions";
import {
    Home,
    Search,
    CartTab,
    Favourite,
    Notification
} from "../screens";
import {Header} from "../components";
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData
} from "../constants"

const MainLayout = ({drawerAnimationStyle, navigation,selectedTab,setSelectedTab}) => {
    
    React.useEffect(() => {
        setSelectedTab(constants.screens.home)
    }, [])
    
    return (
        <Animated.View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                ...drawerAnimationStyle
            }}
        >
            {/* Header */}
            <Headers
                containerStyle = {{
                    height: 50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: 'center'
                }}
                title = {selectedTab.toUpperCase()}
                left = {
                    <TouchableOpacity
                        style = {{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                            borderRadius
                        }}
                        onPress = {() => navigation.openDrawer()}
                    >
                        <Image
                            source = {icons.menu}
                        />
                        
                    </TouchableOpacity>
                }
            />
            {/* Content */}
            <View
                style = {{
                    flex: 1
                }}
            >
                <Text>MainLayout</Text>
            </View>
            {/* Footer */}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(state) {
    return {
        setSelectedTab: (selectedTab) => {return dispatch
        (setSelectedTab(selectedTab))}
    }
}

export default connect{mapStateToProps, mapDispatchToProps} (MainLayout)