import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import { MainLayout } from "./screens";

import CustomDrawer from "./navigation/CustomDrawer";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          headShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={CustomDrawer}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
