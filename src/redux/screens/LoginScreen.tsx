import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { loginUser } from "../../api/authApi";
import { saveToSecureStore } from "../../hooks/useSecureStore";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log("Trying to login with", email, password);
    try {
      const res = await loginUser({ email, password });
      console.log("Login success:", res.data);

      dispatch(
        setCredentials({
          accessToken: res.accessToken,
          user: res.user,
        })
      );

      await saveToSecureStore("refreshToken", res.refreshToken);

      Alert.alert("Login Success", `Welcome ${res.user.fullName}`);
      navigation.navigate("Home" as never); // replace with actual HomeScreen later
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      Alert.alert("Login Failed", err.response?.data?.message || "Try again");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f1f5f9", // light grayish blue
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#0f172a", // dark blue-gray
  },
  input: {
    height: 50,
    borderColor: "#94a3b8",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#ffffff",
  },
  buttonContainer: {
    marginTop: 16,
  },
});
