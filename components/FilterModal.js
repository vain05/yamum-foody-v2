import React, { useState, useEffect, useRef } from 'react'
import {
  Modal,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Easing,
} from 'react-native'

import {
  IconButton,
  FilterSection,
  TwoPointSlider,
  TextButton,
  TextIconButton,
} from '.'

import Slider from '@react-native-community/slider'

import { constants, icons, FONTS, COLORS, SIZES } from '../constants'
import { color, ColorSpace } from 'react-native-reanimated'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const FilterModal = ({ isVisible, onClose }) => {
  const [showFilterModal, setShowFilterModal] = useState(isVisible)
  const [distanceVal, setDistanceVal] = useState([])
  const [deliveryTime, setDiliveryTime] = useState('')
  const [priceRange, setPriceRange] = useState([])
  const [ratings, SetRatings] = useState('')
  const [tags, setTags] = useState('')

  const animatedVal = useRef(new Animated.Value(0)).current

  // interpolate Animated Value
  const modalY = animatedVal.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.totalHeight, 0],
  })

  useEffect(() => {
    setShowFilterModal(isVisible)
  }, [isVisible])

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(animatedVal, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animatedVal, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        setDistanceVal(0)
        onClose()
      })
    }
  }, [showFilterModal])

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
      style={{ margin: 0 }}
      statusBarTranslucent={true}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentBlack7,
          minHeight: Dimensions.get('screen').height,
        }}
      >
        {/* Transparent Background */}
        <TouchableWithoutFeedback
          onPress={() => {
            setShowFilterModal(false)
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '80%',
            transform: [{ translateY: modalY }],
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          {/* HEADER */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
              Filter Your Search
            </Text>
            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{ tintColor: COLORS.gray2 }}
              onPress={() => {
                setShowFilterModal(false)
              }}
            />
          </View>
          {/* FILTERS CONTAINER */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}
          >
            {/* Distance Section */}
            <FilterSection title={'Distance'}>
              <View style={{ alignItems: 'center' }}>
                <TwoPointSlider
                  values={[3, 10]}
                  min={1}
                  max={20}
                  postfix={'km'}
                  onValuesChange={(values) => setDistanceVal(values)}
                />
              </View>
            </FilterSection>

            {/* Dilivery Time Section */}
            <FilterSection
              title={'Dilivery Time'}
              containerStyle={{
                marginTop: 40,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {constants.delivery_time.map((item, index) => {
                  return (
                    <TextButton
                      key={`delivery_time-${index}`}
                      label={item.label}
                      labelStyle={{
                        color:
                          item.id == deliveryTime ? COLORS.white : COLORS.gray,
                        ...FONTS.body3,
                      }}
                      buttonContainerStyle={{
                        width: '30%',
                        height: 30,
                        margin: 5,
                        alignItems: 'center',
                        borderRadius: SIZES.base,
                        backgroundColor:
                          item.id == deliveryTime
                            ? COLORS.primary
                            : COLORS.lightGray2,
                      }}
                      onPress={() => setDiliveryTime(item.id)}
                    ></TextButton>
                  )
                })}
              </View>
            </FilterSection>

            {/* Pricing Range Section */}
            <FilterSection title={'Pricing Range'}>
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <TwoPointSlider
                  values={[10, 50]}
                  min={1}
                  max={100}
                  prefix={'$'}
                  postfix={''}
                  onValuesChange={(values) => setPriceRange(values)}
                ></TwoPointSlider>
              </View>
            </FilterSection>

            {/* Ratings Section */}
            <FilterSection
              title={'Ratings'}
              containerStyle={{
                marginTop: 40,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {constants.ratings.map((item, index) => {
                  return (
                    <TextIconButton
                      key={`Rating-${index}`}
                      containerStyle={{
                        flex: 1,
                        height: 50,
                        margin: 5,
                        alignItems: 'center',
                        borderRadius: SIZES.base,
                        backgroundColor:
                          item.id == ratings
                            ? COLORS.primary
                            : COLORS.lightGray2,
                      }}
                      label={item.label}
                      labelStyle={{
                        color: item.id == ratings ? COLORS.white : COLORS.gray,
                      }}
                      icon={icons.star}
                      iconStyle={{
                        tintColor:
                          item.id == ratings ? COLORS.white : COLORS.gray,
                      }}
                      onPress={() => SetRatings(item.id)}
                    />
                  )
                })}
              </View>
            </FilterSection>
            <FilterSection title='Tags'>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {constants.tags.map((item, index) => {
                  return (
                    <TextButton
                      key={`Tags-${index}`}
                      label={item.label}
                      labelStyle={{
                        color: item.id == tags ? COLORS.white : COLORS.gray,
                        ...FONTS.body3,
                      }}
                      buttonContainerStyle={{
                        height: 50,
                        margin: 5,
                        paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        borderRadius: SIZES.base,
                        backgroundColor:
                          item.id == tags ? COLORS.primary : COLORS.lightGray2,
                      }}
                      onPress={() => setTags(item.id)}
                    />
                  )
                })}
              </View>
            </FilterSection>
          </ScrollView>

          {/* Apply Button */}
          <View
            style={{
              position: 'absolute',
              bottom: 30,
              left: 0,
              right: 0,
              height: 110,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
            }}
          >
            <TextButton
              label={'Apply Filters'}
              buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => console.log('Apply Filter')}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default FilterModal
