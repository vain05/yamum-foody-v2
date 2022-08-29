import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native'

import { Search, FoodList, FilterModal } from '../../components'

import {
  categoryData,
  restaurantData,
  dummyData,
  SIZES,
  COLORS,
  FONTS,
  icons,
} from '../../constants'

const Home = ({ currentLocation, orderItems, setOrderItems }) => {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [filterData, setFilterData] = useState({
    distanceVal: [0, 3],
    deliveryTime: 60,
    pricingRange: [1, 100],
    ratings: '',
    tags: '',
  })

  const [restaurants, setRestaurants] = useState(restaurantData)

  function handleFilter(categoryId) {
    let res = restaurantData

    setSelectedCategoryId(selectedCategoryId != categoryId ? categoryId : null)

    if (categoryId != null) {
      res = res.filter((restaurant) =>
        restaurant.categories.includes(categoryId)
      )
    }

    setRestaurants(res)
  }

  function renderDeliveryInfo() {
    return (
      <View
        style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}
      >
        <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
          DELIVERY TO:
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            alignItems: 'center',
          }}
        >
          <Text style={{ ...FONTS.h3 }}>
            {currentLocation?.streetNumber +
              ', ' +
              currentLocation?.street +
              ', ' +
              currentLocation?.region}
          </Text>
          <Image
            source={icons.down_arrow}
            style={{ marginLeft: SIZES.base, height: 20, width: 20 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  function renderFoodCategories() {
    return (
      <FlatList
        data={categoryData}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 55,
              marginVertical: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight: index == categoryData.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor:
                selectedCategoryId == item.id
                  ? COLORS.primary
                  : COLORS.lightGray2,
            }}
            onPress={() => {
              handleFilter(selectedCategoryId != item.id ? item.id : null)
            }}
          >
            <Image
              source={item.icon}
              style={{ marginTop: 10, marginRight: 5, height: 30, width: 30 }}
            />
            <Text
              style={{
                alignSelf: 'center',
                marginRight: SIZES.base,
                color:
                  selectedCategoryId == item.id
                    ? COLORS.white
                    : COLORS.darkGray,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    )
  }

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: SIZES.padding * 2,
        marginBottom: SIZES.padding * 2,
      }}
      onPress={() => {}}
    >
      {/* Image */}
      <View
        style={{
          marginBottom: SIZES.padding,
        }}
      >
        <Image
          source={item.photo}
          resizeMode='cover'
          style={{
            width: '100%',
            height: 200,
            borderRadius: SIZES.radius,
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: SIZES.width * 0.3,
            backgroundColor: COLORS.primary,
            borderTopRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
        </View>
      </View>

      {/* Restaurant Info */}
      <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
        }}
      >
        {/* Rating */}
        <Image
          source={icons.star}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.primary,
            marginRight: 10,
          }}
        />
        <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* SEARCH SECTION */}
      <Search setShowFilterModal={setShowFilterModal} />

      {/* FILTER MODAL */}
      <FilterModal
        isVisible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filterData={filterData}
        setFilterData={(filterData) => setFilterData(filterData)}
      />

      {/* LIST RESTAURANT*/}
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderRestaurant}
        ListHeaderComponent={
          <View>
            {renderDeliveryInfo()}

            {renderFoodCategories()}
          </View>
        }
        style={{
          marginBottom: 150,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.yellow,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
})

export default Home
