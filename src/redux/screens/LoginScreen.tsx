import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { loginUser } from "../../api/authApi";
import { saveToSecureStore } from "../../hooks/useSecureStore";
import { useNavigation } from "@react-navigation/native";

// Google Sign-In
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import * as AuthSession from "expo-auth-session";
import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";




const {
  googleWebClientId,
  googleAndroidClientId,
  googleIosClientId,
  googleExpoClientId,
} = Constants.expoConfig?.extra || {};

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true } as any);
//console.log("🔁 Using redirect URI:", redirectUri);
//console.log("🧪 googleEEEEEEEEExpoClientId = ", googleExpoClientId);

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: googleWebClientId,
    androidClientId: googleAndroidClientId,
    iosClientId: googleIosClientId,
    expoClientId: googleExpoClientId,
    redirectUri,
  } as any);

  const handleLogin = async () => {
    console.log("Trying to login with", email, password);
    try {
      const res = await loginUser({ email, password });
      console.log("Login success:");

      dispatch(
        setCredentials({
          accessToken: res.accessToken,
          user: res.user.fullName,
        })
      );

      //await saveToSecureStore("refreshToken", res.refreshToken);
      Alert.alert("Login Success", `Welcome ${res.user.fullName}`);
      navigation.navigate("Home" as never);
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      Alert.alert("Login Failed", err.response?.data?.message || "Try again");
    }
  };

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      axios
        .post("http://192.168.1.2:5000/api/auth/google", {
          idToken: response.authentication.accessToken,
          timeout: 20000,
        })
        .then((res) => {
          dispatch(
            setCredentials({
              accessToken: res.data.accessToken,
              user: res.data.user,
            })
          );
          saveToSecureStore("refreshToken", res.data.refreshToken);
          Alert.alert("Welcome", `Logged in as ${res.data.user.fullName}`);
          navigation.navigate("Home" as never);
        })
        .catch((err) => {
          console.error("Google login failed:", err.response?.data || err.message);
          Alert.alert("Google Login Failed", err.response?.data?.message || "Try again");
        });
    }
  }, [response]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>

      <Input
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />

      <Input
        placeholder="Password"
        secureTextEntry={!showPassword}
        onChangeText={setPassword}
        value={password}
      >
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={22}
          color="#64748b"
          onPress={() => setShowPassword(!showPassword)}
        />
      </Input>

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />

        <View style={{ marginTop: 10 }}>
          <Button
            title="Don't have an account? Register"
            onPress={() => navigation.navigate("Register" as never)}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Button
            title="Sign in with Google"
            onPress={() => {
              console.log("🔁 Redirect URI:", redirectUri);
              console.log("📤 Requesting URL:", request?.url);
              promptAsync();
            }}
            disabled={!request}
          />
        </View>
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
    backgroundColor: "#f1f5f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#0f172a",
  },
  buttonContainer: {
    marginTop: 16,
  },
});
