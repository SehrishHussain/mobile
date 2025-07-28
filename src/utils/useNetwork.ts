// utils/useNetwork.ts
import * as Network from 'expo-network';

export const isOnline = async (): Promise<boolean> => {
  const networkState = await Network.getNetworkStateAsync();

  const isConnected = networkState.isConnected ?? false;
  const isInternetReachable = networkState.isInternetReachable ?? false;

  return isConnected && isInternetReachable;
};
