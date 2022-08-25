import React from "react";

import { View } from "react-native";

import { connect } from "react-redux";

import { setSelectedTab } from "../../stores/tab/tabActions";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainLayout } from "../../screens";

import DrawerContent from "./DrawerContent";

import { COLORS } from "../../constants"

const Drawer = createDrawerNavigator()

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary
      }}
    >
      <Drawer.Navigator
        useLegacyImplementation
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: { 
            flex: 1,
            width: '65%',
            paddingRight: 20,
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {
            backgroundColor: 'transparent'
          }
        }}

        initialRouteName="MainLayout"
        
        drawerContent={props => (
          <DrawerContent 
            navigation={props.navigation}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        )}
      >
        <Drawer.Screen name="MainLayout">
          {(props) => <MainLayout {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  )
};

function mapStateToProps(state) {
  return { selectedTab: state.tabReducer.selectedTab };
}

function mapDispacthToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab));
    }
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(CustomDrawer);
