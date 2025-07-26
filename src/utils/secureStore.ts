// utils/secureStore.ts
import * as SecureStore from "expo-secure-store";

export const saveToSecureStore = async (key: string, value: any) => {
  try {
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);
    await SecureStore.setItemAsync(key, stringValue);
  } catch (error) {
    console.log("SecureStore save error:", error);
  }
};
