// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <Text style={styles.subtext}>Choose an option from the menu or continue tracking.</Text>
      <Button
  title="Go to Location Tracking"
  onPress={() => navigation.navigate("LocationTracking" as never)}
/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
