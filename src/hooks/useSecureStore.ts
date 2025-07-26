import * as SecureStore from "expo-secure-store";

// Make it accept string OR any serializable value
export const saveToSecureStore = async (key: string, value: any) => {
  try {
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);
    await SecureStore.setItemAsync(key, stringValue);
  } catch (error) {
    console.log(`SecureStore save error for ${key}:`, error);
  }
};

export const getFromSecureStore = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.log(`SecureStore read error for ${key}:`, error);
    return null;
  }
};

export const deleteFromSecureStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(`SecureStore delete error for ${key}:`, error);
  }
};
