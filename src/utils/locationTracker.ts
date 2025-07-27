import * as Location from 'expo-location';
import axios from 'axios';

const BACKEND_URL = 'http://192.168.1.2:5000/api/location/save';

export const sendLocation = async (token: string) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Location permission not granted');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    await axios.post(
      BACKEND_URL,
      { lat: latitude, lng: longitude },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('Location sent');
  } catch (err) {
    console.error('Error getting or sending location:', err);
  }
};
