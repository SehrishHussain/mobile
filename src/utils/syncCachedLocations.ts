export const syncCachedLocations = async (userId: string) => {
  const online = await isOnline();
  if (!online) return;

  const raw = await AsyncStorage.getItem(LOCATION_CACHE_KEY);
  if (!raw) return;

  const cached: LocationPayload[] = JSON.parse(raw);

  for (const location of cached) {
    try {
      await axios.post('http://<your-server-ip>:5000/api/location', {
        user: userId,
        coordinates: {
          lat: location.lat,
          lng: location.lng,
        },
        timestamp: location.timestamp,
        isSynced: false,
      });
    } catch (err) {
      console.warn('❌ Failed to sync cached location:', err);
      return; // Stop syncing on failure (optional)
    }
  }

  await AsyncStorage.removeItem(LOCATION_CACHE_KEY);
  console.log('🔁 All cached locations synced');
};
