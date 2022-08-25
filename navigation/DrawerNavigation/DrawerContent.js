import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import {
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  dummyData
} from "../../constants"

import DrawerItem from "./DrawerItem";

const DrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {
  return (
    <DrawerContentScrollView 
      scrollEnable={true}
      contentContainerStyle={{ flex: 1}}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius
        }}
      >
        {/* Close button */}
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{
                height: 35,
                width: 35,
                tintColor: COLORS.white
              }}
            />

          </TouchableOpacity>
        </View>
        
        {/* Profile */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            marginBottom: SIZES.radius,
            alignItems: 'center'
          }}

          onPress={() => console.log("Profile")}
        >
          <Image
            source={dummyData.myProfile?.profile_image}
            style={{
              width: 50,
              height: 50,
              borderRadius: SIZES.radius
            }}
          />
          
          <View
            style={{
              marginLeft: SIZES.radius
            }}
          >
            <Text style={{ color: COLORS.white, ... FONTS.h3 }}>
              {dummyData.myProfile?.name}
            </Text>

            <Text style={{ color: COLORS.white, ... FONTS.body4 }}>
              View your profile
            </Text>
          </View>
        </TouchableOpacity>

        {/* Drawer Items*/}
        <View 
          style={{
            flex: 1,
            marginTop: SIZES.padding
          }}
        >
          <DrawerItem
            label={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab === constants.screens.home}
            onPress={() => {
              setSelectedTab(constants.screens.home);
              navigation.navigate("MainLayout");
            }}
          />

          <DrawerItem
            label={constants.screens.my_wallet}
            icon={icons.wallet}
            isFocused={selectedTab === constants.screens.wallet}
            onPress={() => {
              setSelectedTab(constants.screens.my_wallet);
              navigation.navigate("MainLayout"); 
            }}
          />

          <DrawerItem
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocused={selectedTab === constants.screens.favourite}
            onPress={() => {
              setSelectedTab(constants.screens.favourite);
              navigation.navigate("MainLayout");
            }}
          />

          <DrawerItem
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={selectedTab === constants.screens.notification}
            onPress={() => {
              setSelectedTab(constants.screens.notification);
              navigation.navigate("MainLayout");
            }}
          />

          {/* Line Divider */}
          <View 
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1
            }}
          />

          <DrawerItem
            label="Track Your Order"
            icon={icons.location}
          />
          
          <DrawerItem
            label="Coupons"
            icon={icons.coupon}
          />

          <DrawerItem
            label="Settings"
            icon={icons.setting}
          />

          <DrawerItem
            label="Help Center"
            icon={icons.help}
          />
          
        </View>

        <View 
          style={{
            marginBottom: SIZES.paddinghttps
          }}
        >
          <DrawerItem
            label="Logout"
            icon={icons.logout}
          />
        </View>

      </View>
    </DrawerContentScrollView>
  )
}

export default DrawerContent;
