import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TestScreen from "../screens/TestScreen"; // remove later
import HomeScreen from "../screens/HomeScreen";
import LocationTrackingScreen from "../screens/LocationTrackingScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="LocationTracking" component={LocationTrackingScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
