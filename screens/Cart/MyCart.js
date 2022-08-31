import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'

import { SwipeListView } from 'react-native-swipe-list-view'

import { Header, IconButton, StepperInput } from '../../components'

import { COLORS, FONTS, SIZES, icons, restaurantData } from '../../constants'

const MyCart = ({
  navigation,
  currentLocation,
  distances,
  orderItems,
  setOrderItems,
  setSelectedTab,
}) => {
  useEffect(() => {
    setOrderItems(orderItems)
  }, [orderItems])

  function editOrder(action, menuIndex, menuId, name, price, restaurantId) {
    let order = orderItems.slice()
    let res = order.filter((res) => res.restaurantId == restaurantId)
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
            restaurantId: restaurantId,
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
            order = order.filter((res) => res.restaurantId != restaurantId)
          }

          setOrderItems(order)
        }
      }
    } else {
      if (action == '+') {
        order.push({
          restaurantId: restaurantId,
          items: [
            {
              name: name,
              menuIndex: menuIndex,
              menuId: menuId,
              quant: 1,
              price: price,
              restaurantId: restaurantId,
            },
          ],
        })

        setOrderItems(order)
      }
    }
  }

  function removeItem(menuId, restaurantId) {
    let order = orderItems.slice()
    let res = order.findIndex((res) => res.restaurantId == restaurantId)

    if (res == -1) return

    let remainItems = order[res].items.filter((item) => item.menuId != menuId)

    if (remainItems.length > 0) order[res].items = remainItems
    else order = order.filter((res) => res.restaurantId != restaurantId)

    return order
  }

  function getOrderQuantity(menuId, restaurantId) {
    let res = orderItems.filter((res) => res.restaurantId == restaurantId)

    if (res.length <= 0) {
      return 0
    }

    let item = res[0].items.filter((item) => item.menuId == menuId)

    if (item.length > 0) {
      return item[0].quant
    }

    return 0
  }

  function getBasketItemCount(restaurantId) {
    let res = orderItems.filter((res) => res.restaurantId == restaurantId)

    if (res.length <= 0) {
      return 0
    }

    let itemCount = res[0].items.reduce((a, b) => a + (b.quant || 0), 0)

    return itemCount
  }

  function sumOrder(restaurantId) {
    let res = orderItems.filter((res) => res.restaurantId == restaurantId)

    if (res.length <= 0) {
      return 0
    }

    let total = res[0].items.reduce((a, b) => a + (b.quant * b.price || 0), 0)

    return total
  }

  function renderItems(restaurant) {
    const renderItem = ({ item }) => {
      let index = item.menuIndex
      let res = item.restaurantId - 1
      return (
        <View
          style={{
            height: 100,
            backgroundColor: COLORS.lightGray2,
            ...styles.cartItemContainer,
          }}
        >
          {/* Food Image */}
          <View
            style={{
              width: 90,
              height: 100,
              marginLeft: -10,
            }}
          >
            <Image
              source={restaurantData[res]?.menu[index].photo}
              style={{
                width: '80%',
                height: '80%',
                position: 'absolute',
                top: 10,
                left: 10,
                borderRadius: SIZES.radius,
              }}
            />
          </View>

          {/* Food Info */}
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                ...FONTS.body3,
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                color: COLORS.primary,
                ...FONTS.h3,
              }}
            >
              ${item.price}
            </Text>
          </View>

          {/* Edit Quantity */}
          <StepperInput
            containerStyle={{
              height: 50,
              width: 125,
              backgroundColor: COLORS.white,
            }}
            value={getOrderQuantity(item.menuId, item.restaurantId)}
            onAdd={() =>
              editOrder(
                '+',
                item.menuIndex,
                item.menuId,
                item.name,
                item.price,
                item.restaurantId
              )
            }
            onMinus={() =>
              editOrder(
                '-',
                item.menuIndex,
                item.menuId,
                item.name,
                item.price,
                item.restaurantId
              )
            }
          />
        </View>
      )
    }

    const renderHiddenItem = ({ item }) => {
      console.log(item)
      return (
        <IconButton
          containerStyle={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: COLORS.primary,
            ...styles.cartItemContainer,
          }}
          icon={icons.delete_icon}
          iconStyle={{
            marginRight: 10,
          }}
          onPress={() => {
            order = removeItem(item.menuId, restaurant.restaurantId)
            setOrderItems(order)
          }}
        />
      )
    }

    return (
      <View>
        <SwipeListView
          data={restaurant.items}
          listKey={(item) => `${item.menuId}`}
          keyExtractor={(item) => `${item.menuId}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
          }}
          disableRightSwipe={true}
          rightOpenValue={-75}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
        />

        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            paddingLeft: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ ...FONTS.h3 }}>
            Total:{' $'}
            {sumOrder(restaurant.restaurantId)
              .toPrecision(4)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            - {getBasketItemCount(restaurant.restaurantId)}
            {' items'}
          </Text>

          <TouchableOpacity
            style={{
              width: 80,
              height: 50,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('OrderDelivery', {
                restaurant: restaurant,
                currentLocation: currentLocation,
                setSelectedTab: setSelectedTab
              })
            }}
          >
            <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function renderCartList() {
    const renderRestaurant = ({ item }) => {
      const index = item.restaurantId - 1

      return (
        <View
          style={{
            backgroundColor: COLORS.primary,
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            paddingBottom: SIZES.radius,
            borderRadius: SIZES.radius,
          }}
        >
          {/* Restaurant Info */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: -10,
              paddingVertical: 10,
            }}
          >
            <Image
              source={restaurantData[index].photo}
              style={{
                width: 40,
                height: 40,
                borderRadius: SIZES.radius,
                marginHorizontal: 10,
                marginTop: 8,
              }}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...FONTS.body2,
                }}
              >
                {restaurantData[index].name}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                {/* Rating */}
                <Image
                  source={icons.star}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.lightOrange2,
                    marginRight: 10,
                  }}
                />
                <Text style={{ ...FONTS.body3 }}>
                  {restaurantData[index].rating} - {distances[index]} KM away
                  from you
                </Text>
              </View>
            </View>
          </View>
          {renderItems(item)}
        </View>
      )
    }

    return (
      <FlatList
        nestedScrollEnabled
        data={orderItems}
        listKey={(item) => `${item.restaurantId}`}
        keyExtractor={(item) => `${item.restaurantId}`}
        renderItem={renderRestaurant}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}
        style={{
          marginBottom: 150,
        }}
      />
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* CartList */}
      {renderCartList()}

      {/* Footer */}
      {/* <FooterTotal total={10.0} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
})

export default MyCart
