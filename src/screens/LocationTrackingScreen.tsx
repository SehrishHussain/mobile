import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // adjust path to your store
import { getCurrentLocation} from '../utils/locationTracker';

import { saveLocationOrCache } from '../services/locationService'; // wherever you saved it
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './HomeScreen';



const LocationTrackingScreen = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  console.log('accessToken from Redux:', token);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSendLocation = async () => {
    if (!token) {
      setStatus('You must be logged in to send location');
      return;
    }

    setLoading(true);
    try{
     // 🔄 Reuse your modular function to get current location
      const currentLocation = await getCurrentLocation();
      if (!currentLocation) {
        setStatus('Failed to get location');
        return;
      }

      // 🔐 Get user ID
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        setStatus('User ID not found');
        return;
      }

      // 🚀 Send or cache
      await saveLocationOrCache({ ...currentLocation, user: userId });

      setStatus('Location sent or cached successfully');
    } catch (error) {
      console.error(error);
      setStatus('Error sending location');
    } finally {
      setLoading(false);
    }
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Location Tracking</Text>
      <Button title="Send Current Location" onPress={handleSendLocation} disabled={loading} />
      {loading && <ActivityIndicator style={styles.spinner} />}
      {status && <Text style={styles.status}>{status}</Text>}
    </View>
  );
};
}

export default LocationTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  spinner: {
    marginTop: 10,
  },
  status: {
    marginTop: 10,
    textAlign: 'center',
    color: 'green',
  },
});


//colour: black
//shape: tirangle
//maps: HomeScreen
// map_colour: Rainbow