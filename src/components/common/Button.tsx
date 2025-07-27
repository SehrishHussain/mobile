import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const Button = ({ title, onPress, style }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
