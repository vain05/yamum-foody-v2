import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ToastAndroid,
  ScrollView,
} from 'react-native'

import { icons, COLORS, SIZES, FONTS, constants } from '../../constants'

import { Header, IconButton, CartQuantityButton } from '../../components'

const Restaurant = ({ route, navigation }) => {
  const scrollX = new Animated.Value(0)

  const [orderItems, setOrderItems] = useState(route.params?.orderItems)
  const [restaurant, setRestaurant] = useState(route.params?.restaurant)
  const [currentLocation, setCurrenLocation] = useState(
    route.params?.currentLocation
  )

  function editOrder(action, menuIndex, menuId, name, price) {
    let order = orderItems.slice()
    let res = order.filter((res) => res.restaurantId == restaurant?.id)
    let item = []
    if (res.length > 0) {
      item = res[0].items.filter((item) => item.menuId == menuId)

      if (action == '+') {
        if (item.length > 0) {
          item[0].quant += 1
        } else {
          res[0].items.push({
            name: name,
            menuIndex: menuIndex,
            menuId: menuId,
            quant: 1,
            price: price,
            restaurantId: restaurant?.id,
          })
        }

        setOrderItems(order)
      } else {
        if (item[0]?.quant > 1) {
          item[0].quant -= 1
          setOrderItems(order)
        } else {
          res[0].items = res[0].items.filter((item) => item.menuId != menuId)

          if (res[0].items.length <= 0) {
            order = order.filter((res) => res.restaurantId != restaurant?.id)
          }

          setOrderItems(order)
        }
      }
    } else {
      if (action == '+') {
        order.push({
          restaurantId: restaurant?.id,
          items: [
            {
              name: name,
              menuIndex: menuIndex,
              menuId: menuId,
              quant: 1,
              price: price,
              restaurantId: restaurant?.id,
            },
          ],
        })

        setOrderItems(order)
      }
    }
  }

  function getOrderQuantity(menuId) {
    let res = orderItems.filter((res) => res.restaurantId == restaurant?.id)

    if (res.length <= 0) {
      return 0
    }

    let item = res[0].items.filter((item) => item.menuId == menuId)

    if (item.length > 0) {
      return item[0].quant
    }

    return 0
  }

  function getBasketItemCount() {
    let res = orderItems.filter((res) => res.restaurantId == restaurant?.id)

    if (res.length <= 0) {
      return 0
    }

    let itemCount = res[0].items.reduce((a, b) => a + (b.quant || 0), 0)

    return itemCount
  }

  function sumOrder() {
    let res = orderItems.filter((res) => res.restaurantId == restaurant?.id)

    if (res.length <= 0) {
      return 0
    }

    let total = res[0].items.reduce((a, b) => a + (b.quant * b.price || 0), 0)

    return total
  }

  function renderHeader() {
    return (
      <Header
        title={route.params?.restaurant.name}
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 40,
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => {
              route.params?.setOrderItems(orderItems)
              route.params?.setSelectedTab(constants.screens.home)
              navigation.navigate('MainLayout')
            }}
          />
        }
        rightComponent={
          <CartQuantityButton
            quantity={getBasketItemCount(orderItems)}
            onPress={() => {
              route.params.setOrderItems(orderItems)
              route.params?.setSelectedTab(constants.screens.cart)
              navigation.navigate('MainLayout')
            }}
          />
        }
      />
    )
  }

  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {restaurant?.menu.map((item, index) => (
          <View key={`menu-${index}`} style={{ alignItems: 'center' }}>
            <View style={{ height: SIZES.height * 0.35 }}>
              {/* Food Image */}
              <Image
                source={item.photo}
                resizeMode='cover'
                style={{
                  width: SIZES.width,
                  height: '100%',
                }}
              />

              {/* Quantity */}
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  onPress={() =>
                    editOrder(
                      '-',
                      item.menuIndex,
                      item.menuId,
                      item.name,
                      item.price
                    )
                  }
                >
                  <Text style={{ ...FONTS.body1 }}>-</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 50,
                    backgroundColor: COLORS.lightGray,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ ...FONTS.h2 }}>
                    {getOrderQuantity(item.menuId)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}
                  onPress={() =>
                    editOrder(
                      '+',
                      item.menuIndex,
                      item.menuId,
                      item.name,
                      item.price
                    )
                  }
                >
                  <Text style={{ ...FONTS.body1 }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Name & Description */}
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}
            >
              <Text
                style={{
                  marginVertical: 10,
                  textAlign: 'center',
                  ...FONTS.h2,
                }}
              >
                {item.name} -{' '}
                {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
              <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
            </View>

            {/* Calories */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <Image
                source={icons.fire}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />

              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.darkgray,
                }}
              >
                {item.calories.toFixed(2)} cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    )
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width)

    return (
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}
        >
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            })

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            })

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            })

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            )
          })}
        </View>
      </View>
    )
  }

  function renderOrder() {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 0.8,
              paddingHorizontal: SIZES.padding * 0.8,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>
              {getBasketItemCount()} items in Cart
            </Text>
            <Text style={{ ...FONTS.h3 }}>
              $
              {sumOrder()
                .toPrecision(4)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>

          <View
            style={{
              paddingVertical: SIZES.padding * 0.8,
              paddingHorizontal: SIZES.padding * 0.8,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.location}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
              <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
                {currentLocation?.streetNumber +
                  ', ' +
                  currentLocation?.street +
                  ', ' +
                  currentLocation?.region}
              </Text>
            </View>
          </View>

          {/* Order Button */}
          <View
            style={{
              padding: SIZES.padding * 0.7,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.8,
                padding: SIZES.padding * 0.8,
                backgroundColor:
                  orderItems.filter((res) => res.restaurantId == restaurant?.id)
                    ?.length > 0
                    ? COLORS.primary
                    : COLORS.gray2,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}
              onPress={() => {
                route.params?.setOrderItems(orderItems)
                if (
                  orderItems.filter((res) => res.restaurantId == restaurant?.id)
                    ?.length > 0
                ) {
                } else
                  ToastAndroid.show(
                    'You must order at least one item',
                    ToastAndroid.SHORT
                  )
              }}
            >
              <Text style={{ color: COLORS.black, ...FONTS.h2 }}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
    </View>
  )
}

export default Restaurant
