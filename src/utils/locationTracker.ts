import * as Location from 'expo-location';


console.log("here ib LocationTracker");

export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Location permission not granted');
  
    }

    const location = await Location.getCurrentPositionAsync({});
   // const { latitude, longitude } = location.coords;
    console.log("Getting Current Location");
    return {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
    timestamp: new Date(),
  };

  } catch (err) {
    console.error('Error getting or sending location:', err);
  }
};
