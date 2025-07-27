import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // adjust path to your store
import { sendLocation } from '../../utils/locationTracker';




const LocationTrackingScreen = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSendLocation = async () => {
    if (!token) {
      setStatus('You must be logged in to send location');
      return;
    }

    setLoading(true);
    try {
      await sendLocation(token);
      setStatus('Location sent successfully');
    } catch (error) {
      setStatus('Failed to send location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Location Tracking</Text>
      <Button title="Send Current Location" onPress={handleSendLocation} disabled={loading} />
      {loading && <ActivityIndicator style={styles.spinner} />}
      {status && <Text style={styles.status}>{status}</Text>}
    </View>
  );
};

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

