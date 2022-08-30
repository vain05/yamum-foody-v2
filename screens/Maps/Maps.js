import React from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import {
  restaurantData,
  COLORS,
  FONTS,
  SIZES,
  icons,
  dummyData,
} from '../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
})

const Maps = ({
  route,
  navigation,
  currentLocation,
  orderItems,
  setOrderItems,
}) => {
  const mapView = React.useRef()

  const [region, setRegion] = React.useState(null)

  React.useEffect(() => {
    let mapRegion = {
      latitude:
        restaurantData.reduce((total, restaurant) => {
          return total + restaurant.location.latitude
        }, 0) / restaurantData.length,

      longitude:
        restaurantData.reduce((total, restaurant) => {
          return total + restaurant.location.longitude
        }, 0) / restaurantData.length,

      latitudeDelta: 0.043,

      longitudeDelta: 0.043,
    }

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

  function renderMap() {
    const renderRestaurantMarker = (item) => (
      <Marker
        key={item.id}
        coordinate={item.location}
        title={item.name}
        onPress={() => {
          /* navigation.navigate('Restaurant', { */
          /*   prevScreen: 'Maps', */
          /*   orderItems: orderItems, */
          /*   restaurant: item, */
          /*   currentLocation: currentLocation, */
          /* }) */
        }}
      >
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
              source={item.icon}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
        </View>
      </Marker>
    )

    const userMarker = () =>
      currentLocation?.location != null ? (
        <Marker coordinate={currentLocation?.location} title={'Your Location'}>
          <Image
            source={dummyData.myProfile.profile_image}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </Marker>
      ) : null

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{ flex: 1 }}
        >
          {/* User location */}
          {userMarker()}

          {/* Restaurants location */}
          {restaurantData.map((restaurant) =>
            renderRestaurantMarker(restaurant)
          )}
        </MapView>
      </View>
    )
  }

  function renderButtons() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
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
          <Text style={{ ...FONTS.body1 }}>+</Text>
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
          <Text style={{ ...FONTS.body1 }}>-</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderMap()}
      {renderButtons()}
    </View>
  )
}

export default Maps
