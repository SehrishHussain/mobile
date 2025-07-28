// services/locationService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { isOnline } from '../utils/useNetwork';

const BACKEND_URL = 'http://192.168.1.7:5000/api/location/save';
const LOCATION_CACHE_KEY = 'unsynced_locations';

interface LocationPayload {
  lat: number;
  lng: number;
  timestamp: Date;
  user: string;
}

export const saveLocationOrCache = async (location: LocationPayload) => {
  const online = await isOnline();

  if (online) {
    try {
      await axios.post(
        BACKEND_URL,
        {
          coordinates: {
            lat: location.lat,
            lng: location.lng,
          },
          timestamp: location.timestamp,
          user: location.user,
          isSynced: true,
        }
      );
      console.log('📤 Location sent to backend');
    } catch (err) {
      console.warn('Failed to sync, caching offline:', err);
      await cacheLocation(location);
    }
  } else {
    console.log('📴 Offline, caching location');
    await cacheLocation(location);
  }
};

const cacheLocation = async (location: LocationPayload) => {
  try {
    const existing = await AsyncStorage.getItem(LOCATION_CACHE_KEY);
    const parsed: LocationPayload[] = existing ? JSON.parse(existing) : [];
    parsed.push(location);
    await AsyncStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(parsed));
    console.log('✅ Location cached locally');
  } catch (err) {
    console.error('Failed to cache location:', err);
  }
};
