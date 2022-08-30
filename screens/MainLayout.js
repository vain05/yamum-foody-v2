import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

import { LinearGradient } from 'expo-linear-gradient'

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setSelectedTab } from '../stores/tab/tabActions'

import { Home, Maps, MyCart, Favourite, Notification } from '../screens'

import { Header, TabButton } from '../components'

import { useDrawerProgress } from '@react-navigation/drawer'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native'

import {
  COLORS,
  FONTS,
  SIZES,
  GOOGLE_API_KEY,
  icons,
  constants,
  dummyData,
} from '../constants'

import * as Location from 'expo-location'

const MainLayout = ({ route, navigation, selectedTab, setSelectedTab }) => {
  const [currentCoords, setCurrentCoords] = useState({})
  const [currentLocation, setCurrentLocation] = useState({})
  const [orderItems, setOrderItems] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        return
      }

      let location = await Location.getCurrentPositionAsync({})

      setCurrentCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }

      Location.setGoogleApiKey(GOOGLE_API_KEY)

      let region = await Location.reverseGeocodeAsync(currentCoords)

      setCurrentLocation({
        city: region[0].city,
        country: region[0].country,
        district: region[0].district,
        name: region[0].name,
        region: region[0].region,
        street: region[0].street,
        streetNumber: region[0].streetNumber,
        location: {
          latitude: currentCoords?.latitude,
          longitude: currentCoords?.longitude,
        },
      })

      console.log(region[0])
    })()
  }, [currentCoords])

  const progress = useDrawerProgress()
  const flatListRef = React.useRef()
  //Reanimated Shared Values
  const homeTabFlex = useSharedValue(1)
  const homeTabColor = useSharedValue(COLORS.white)
  const mapsTabFlex = useSharedValue(1)
  const mapsTabColor = useSharedValue(COLORS.white)
  const cartTabFlex = useSharedValue(1)
  const cartTabColor = useSharedValue(COLORS.white)
  const favouriteTabFlex = useSharedValue(1)
  const favouriteTabColor = useSharedValue(COLORS.white)
  const notificationTabFlex = useSharedValue(1)
  const notificationTabColor = useSharedValue(COLORS.white)

  // Reanimated Animated Style

  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    }
  })

  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    }
  })

  const mapsFlexStyle = useAnimatedStyle(() => {
    return {
      flex: mapsTabFlex.value,
    }
  })

  const mapsColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: mapsTabColor.value,
    }
  })

  const cartFlexStyle = useAnimatedStyle(() => {
    return {
      flex: cartTabFlex.value,
    }
  })

  const cartColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: cartTabColor.value,
    }
  })

  const favouriteFlexStyle = useAnimatedStyle(() => {
    return {
      flex: favouriteTabFlex.value,
    }
  })

  const favouriteColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: favouriteTabColor.value,
    }
  })

  const notificationFlexStyle = useAnimatedStyle(() => {
    return {
      flex: notificationTabFlex.value,
    }
  })

  const notificationColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: notificationTabColor.value,
    }
  })

  React.useEffect(() => {
    setSelectedTab(constants.screens.home)
  }, [])

  React.useEffect(() => {
    if (selectedTab == constants.screens.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      })
      homeTabFlex.value = withTiming(4, { duration: 300 })
      homeTabColor.value = withTiming(COLORS.primary, { duration: 300 })
    } else {
      homeTabFlex.value = withTiming(1, { duration: 300 })
      homeTabColor.value = withTiming(COLORS.white, { duration: 300 })
    }

    if (selectedTab == constants.screens.maps) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
        animated: false,
      })
      mapsTabFlex.value = withTiming(4, { duration: 300 })
      mapsTabColor.value = withTiming(COLORS.primary, { duration: 300 })
    } else {
      mapsTabFlex.value = withTiming(1, { duration: 300 })
      mapsTabColor.value = withTiming(COLORS.white, { duration: 300 })
    }

    if (selectedTab == constants.screens.cart) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
        animated: false,
      })
      cartTabFlex.value = withTiming(4, { duration: 300 })
      cartTabColor.value = withTiming(COLORS.primary, { duration: 300 })
    } else {
      cartTabFlex.value = withTiming(1, { duration: 300 })
      cartTabColor.value = withTiming(COLORS.white, { duration: 300 })
    }

    if (selectedTab == constants.screens.favourite) {
      flatListRef?.current?.scrollToIndex({
        index: 3,
        animated: false,
      })
      favouriteTabFlex.value = withTiming(4, { duration: 300 })
      favouriteTabColor.value = withTiming(COLORS.primary, { duration: 300 })
    } else {
      favouriteTabFlex.value = withTiming(1, { duration: 300 })
      favouriteTabColor.value = withTiming(COLORS.white, { duration: 300 })
    }

    if (selectedTab == constants.screens.notification) {
      flatListRef?.current?.scrollToIndex({
        index: 4,
        animated: false,
      })
      notificationTabFlex.value = withTiming(4, { duration: 300 })
      notificationTabColor.value = withTiming(COLORS.primary, {
        duration: 300,
      })
    } else {
      notificationTabFlex.value = withTiming(1, { duration: 300 })
      notificationTabColor.value = withTiming(COLORS.white, { duration: 300 })
    }
  }, [selectedTab])

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  })

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  })

  const animatedStyle = {
    borderRadius,
    transform: [{ scale }],
    overflow: 'hidden',
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: 'white',
        ...animatedStyle,
      }}
    >
      {/* HEADER */}

      <Header
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 40,
          alignItems: 'center',
        }}
        title={selectedTab.toUpperCase()}
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.toggleDrawer()}
          >
            <Image source={icons.menu} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            style={{
              borderRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={dummyData?.myProfile?.profile_image}
              style={{ width: 40, height: 40, borderRadius: SIZES.radius }}
            />
          </TouchableOpacity>
        }
      />

      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment='center'
          snapToInterval={SIZES.width}
          showsVerticalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View style={{ height: SIZES.height, width: SIZES.width }}>
                {item.label == constants.screens.home ? (
                  <Home
                    navigation={navigation}
                    setSelectedTab={setSelectedTab}
                    currentLocation={currentLocation}
                    orderItems={orderItems}
                    setOrderItems={(orderItems) => setOrderItems(orderItems)}
                    setSelectedRestaurant={(restaurant) =>
                      setSelectedRestaurant(restaurant)
                    }
                  />
                ) : null}
                {item.label == constants.screens.maps ? (
                  <Maps
                    route={route}
                    navigation={navigation}
                    currentLocation={currentLocation}
                    orderItems={orderItems}
                    setOrderItems={(orderItems) => setOrderItems(orderItems)}
                  />
                ) : null}
                {item.label == constants.screens.cart ? <MyCart/> : null}
                {item.label == constants.screens.favourite ? (
                  <Favourite />
                ) : null}
                {item.label == constants.screens.notification ? (
                  <Notification />
                ) : null}
              </View>
            )
          }}
        />
      </View>

      {/* FOOTER */}
      <View style={{ height: 100, justifyContent: 'flex-end' }}>
        {/* SHADOW */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.darkGray]}
          style={{
            position: 'absolute',
            top: -20,
            left: 0,
            right: 0,
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        {/* TABS */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            paddingBottom: 10,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: COLORS.white,
          }}
        >
          <TabButton
            label={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab == constants.screens.home}
            outerContainerStyle={homeFlexStyle}
            innerContainerStyle={homeColorStyle}
            onPress={() => setSelectedTab(constants.screens.home)}
          />
          <TabButton
            label={constants.screens.maps}
            icon={icons.map}
            isFocused={selectedTab == constants.screens.maps}
            outerContainerStyle={mapsFlexStyle}
            innerContainerStyle={mapsColorStyle}
            onPress={() => setSelectedTab(constants.screens.maps)}
          />
          <TabButton
            label={constants.screens.cart}
            icon={icons.cart}
            isFocused={selectedTab == constants.screens.cart}
            outerContainerStyle={cartFlexStyle}
            innerContainerStyle={cartColorStyle}
            onPress={() => setSelectedTab(constants.screens.cart)}
          />
          <TabButton
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocused={selectedTab == constants.screens.favourite}
            outerContainerStyle={favouriteFlexStyle}
            innerContainerStyle={favouriteColorStyle}
            onPress={() => setSelectedTab(constants.screens.favourite)}
          />
          <TabButton
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={selectedTab == constants.screens.notification}
            outerContainerStyle={notificationFlexStyle}
            innerContainerStyle={notificationColorStyle}
            onPress={() => setSelectedTab(constants.screens.notification)}
          />
        </View>
      </View>
    </Animated.View>
  )
}

function mapStateToProps(state) {
  return { selectedTab: state.tabReducer.selectedTab }
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
