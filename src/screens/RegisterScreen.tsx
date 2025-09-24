import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';



export default function RegisterScreen({ navigation }) {
    
  const [form, setForm] = useState({ fullName: '', email: '', username: '', password: '' });

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      Alert.alert("Success", "Registered! Please login.");
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <View>
      <TextInput placeholder="Full Name" onChangeText={(val) => setForm({ ...form, fullName: val })} />
      <TextInput placeholder="Email" onChangeText={(val) => setForm({ ...form, email: val })} />
      <TextInput placeholder="Username" onChangeText={(val) => setForm({ ...form, username: val })} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={(val) => setForm({ ...form, password: val })} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
