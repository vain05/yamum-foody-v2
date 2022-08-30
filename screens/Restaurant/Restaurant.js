import React from 'react'
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

import {
  icons,
  restaurantData,
  COLORS,
  SIZES,
  FONTS,
  constants,
} from '../../constants'
import { setSelectedTab } from '../../stores/tab/tabActions'

const Restaurant = ({
  route,
  navigation,
  selectedRestaurant,
  orderItems,
  setOrderItems,
  setSelectedTab,
}) => {
  const scrollX = new Animated.Value(0)

  function editOrder(action, menuId, name, price) {
    let order = orderItems.slice()
    let res = order.filter((res) => res.restaurantId == selectedRestaurant?.id)
    let item = []
    if (res.length > 0) {
      item = res[0].items.filter((item) => item.menuId == menuId)

      if (action == '+') {
        if (item.length > 0) {
          item[0].quant += 1
        } else {
          res[0].items.push({
            name: name,
            menuId: menuId,
            quant: 1,
            price: price,
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
            order = order.filter(
              (res) => res.restaurantId != selectedRestaurant?.id
            )
          }

          setOrderItems(order)
        }
      }
    } else {
      if (action == '+') {
        order.push({
          restaurantId: selectedRestaurant?.id,
          items: [
            {
              name: name,
              menuId: menuId,
              quant: 1,
              price: price,
            },
          ],
        })

        setOrderItems(order)
      }
    }
  }

  function getOrderQuantity(menuId) {
    let res = orderItems.filter(
      (res) => res.restaurantId == selectedRestaurant?.id
    )

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
    let res = orderItems.filter(
      (res) => res.restaurantId == selectedRestaurant?.id
    )

    if (res.length <= 0) {
      return 0
    }

    let itemCount = res[0].items.reduce((a, b) => a + (b.quant || 0), 0)

    return itemCount
  }

  function sumOrder() {
    let res = orderItems.filter(
      (res) => res.restaurantId == selectedRestaurant?.id
    )

    if (res.length <= 0) {
      return 0
    }

    let total = res[0].items.reduce((a, b) => a + (b.quant * b.price || 0), 0)

    return total
  }

  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding + 6,
            justifyContent: 'center',
          }}
          onPress={() => {
            setSelectedTab(constants.screens.home)
          }}
        >
          <Image
            source={icons.back}
            resizeMode='contain'
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>

        {/* Restaurant Name Section */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{selectedRestaurant?.name}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}
        >
          <Image
            source={icons.list}
            resizeMode='contain'
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
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
        {selectedRestaurant?.menu.map((item, index) => (
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
                    editOrder('-', item.menuId, item.name, item.price)
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
                    editOrder('+', item.menuId, item.name, item.price)
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
          {selectedRestaurant?.menu.map((item, index) => {
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
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>
              {getBasketItemCount()} items in Cart
            </Text>
            <Text style={{ ...FONTS.h3 }}>
              ₫
              {sumOrder()
                .toPrecision(4)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
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
                Location
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.master_card}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
                8888
              </Text>
            </View>
          </View>

          {/* Order Button */}
          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 200,
            }}
          >
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor:
                  orderItems.filter(
                    (res) => res.restaurantId == selectedRestaurant?.id
                  )?.length > 0
                    ? COLORS.primary
                    : COLORS.transparentBlack7,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}
              onPress={() => {
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
      <ScrollView>
        {renderFoodInfo()}
        {renderOrder()}
      </ScrollView>
    </View>
  )
}

export default Restaurant
