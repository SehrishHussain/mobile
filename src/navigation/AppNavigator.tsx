import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../redux/screens/LoginScreen";
import TestScreen from "../redux/screens/TestScreen"; // remove later
import HomeScreen from "../redux/screens/HomeScreen";
import LocationTrackingScreen from "../redux/screens/LocationTrackingScreen";

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
