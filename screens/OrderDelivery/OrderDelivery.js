import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import {
  COLORS,
  FONTS,
  SIZES,
  GOOGLE_API_KEY,
  icons,
  dummyData,
  constants,
} from '../../constants'

import { Header, IconButton } from '../../components'

const OrderDelivery = ({ route, navigation }) => {
  const mapView = React.useRef()

  const courierLocation = {
    latitude: 9.6096156,
    longitude: 105.973507,
    /* latitude: 10.7701381, */
    /* longitude: 106.6832578, */
  }

  const [restaurant, setRestaurant] = React.useState(null)
  const [currentLocation, setCurrentLocation] = React.useState(null)
  const [region, setRegion] = React.useState(null)

  const [duration1, setDuration1] = React.useState(0)
  const [duration2, setDuration2] = React.useState(0)
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    let { restaurant, currentLocation } = route.params

    let fromLoc = courierLocation
    let toLoc = restaurant.location

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    }

    setRestaurant(restaurant)
    setCurrentLocation(currentLocation)
    setRegion(mapRegion)
  }, [])

  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    }

    setRegion(newRegion)
    mapView.current.animateToRegion(newRegion, 200)
  }

  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    }

    setRegion(newRegion)
    mapView.current.animateToRegion(newRegion, 200)
  }

  function renderHeader() {
    return (
      <Header
        title={'Your Orders Is Delivering'}
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
              route.params?.setSelectedTab(constants.screens.home)
              navigation.navigate('MainLayout')
            }}
          />
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
    )
  }

  function renderMap() {
    const courierRestaurantDirection = () => (
      <MapViewDirections
        origin={courierLocation}
        destination={restaurant?.location}
        apikey={GOOGLE_API_KEY}
        strokeWidth={5}
        strokeColor={COLORS.primary}
        optimizeWaypoints={true}
        onReady={(result) => {
          setDuration1(result.duration)

          if (!isReady) {
            // Fit route into maps
            mapView.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: SIZES.width / 20,
                bottom: SIZES.height / 4,
                left: SIZES.width / 20,
                top: SIZES.height / 8,
              },
            })
          }
        }}
      />
    )

    const restaurantUserDirection = () => (
      <MapViewDirections
        origin={restaurant?.location}
        destination={currentLocation?.location}
        apikey={GOOGLE_API_KEY}
        strokeWidth={5}
        strokeColor={COLORS.primary}
        optimizeWaypoints={true}
        onReady={(result) => {
          setDuration2(result.duration)

          if (!isReady) {
            // Fit route into maps
            mapView.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: SIZES.width / 20,
                bottom: SIZES.height / 4,
                left: SIZES.width / 20,
                top: SIZES.height / 8,
              },
            })
          }
        }}
      />
    )

    const destinationMarker = () => (
      <Marker coordinate={restaurant?.location} title={restaurant?.name}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}
          >
            <Image
              source={restaurant?.icon}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
        </View>
      </Marker>
    )

    const courierMarker = () => (
      <Marker coordinate={courierLocation} title={'Courier'}>
        <Image
          source={icons.delivery_man}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    )

    const userMarker = () => (
      <Marker coordinate={currentLocation?.location} title={'Your Location'}>
        <Image
          source={icons.woman}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    )

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{ flex: 1 }}
        >
          {courierRestaurantDirection()}
          {restaurantUserDirection()}
          {destinationMarker()}
          {courierMarker()}
          {userMarker()}
        </MapView>
      </View>
    )
  }

  function renderDestinationHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}
        >
          <Image
            source={icons.red_pin}
            style={{
              width: 30,
              height: 30,
              marginRight: SIZES.padding,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.body3 }}>
              {currentLocation?.streetName}
            </Text>
          </View>

          <Text style={{ ...FONTS.body3 }}>
            {Math.ceil(duration1 + duration2)} mins
          </Text>
        </View>
      </View>
    )
  }

  function renderDeliveryInfo() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Avatar */}
            <Image
              source={restaurant?.courier.avatar}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.padding }}>
              {/* Name & Rating */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={icons.star}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: COLORS.primary,
                      marginRight: SIZES.padding,
                    }}
                  />
                  <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
                </View>
              </View>

              {/* Restaurant */}
              <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
                {restaurant?.name}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                backgroundColor: COLORS.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  function renderButtons() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.4,
          right: SIZES.padding * 1.4,
          width: 60,
          height: 130,
          justifyContent: 'space-between',
        }}
      >
        {/* Zoom In */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomIn()}
        >
          <Text
            style={{
              height: 28,
              ...FONTS.body1,
            }}
          >
            +
          </Text>
        </TouchableOpacity>

        {/* Zoom Out */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomOut()}
        >
          <Text
            style={{
              height: 29,
              ...FONTS.body1,
            }}
          >
            -
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  function renderInfo() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        {/* LinearGradient */}

        {/* Info */}
        <View
          style={{
            padding: SIZES.padding,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: COLORS.white,
            height: 300,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={icons.fire}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <View
              style={{
                marginLeft: SIZES.padding,
              }}
            >
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.body4,
                }}
              >
                Delivery time
              </Text>

              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                {duration} minutes
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.padding,
            }}
          >
            <Image
              source={icons.woman}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <View
              style={{
                marginLeft: SIZES.padding,
              }}
            >
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.body4,
                }}
              >
                Your Address
              </Text>

              <Text
                style={{
                  ...FONTS.h4,
                }}
              >
                {currentLocation?.streetNumber +
                  ', ' +
                  currentLocation?.street +
                  ', ' +
                  currentLocation?.region}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      {renderMap()}
    </View>
  )
}

export default OrderDelivery
