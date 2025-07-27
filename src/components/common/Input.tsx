import React, { ReactNode } from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  children?: ReactNode;
}

const Input = ({ children, style, ...props }: InputProps) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput style={[styles.input, style]} {...props} />
      {children && <View style={styles.icon}>{children}</View>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#94a3b8",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
  },
  icon: {
    paddingLeft: 10,
  },
});
