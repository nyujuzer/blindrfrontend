import React from "react";
import { TextInput, StyleSheet } from "react-native";

const EmailField = ({ onChangeText }: any) => {
  return (
    <TextInput
      style={styles.inputFieldStyle}
      placeholder="Email"
      placeholderTextColor={"white"}
      keyboardType="email-address"
      autoCapitalize="none"
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    height: 45,
    padding:10,
    width: 300,
    fontSize: 20,
    opacity: 0.4,
    color: "white",
    borderRadius: 6,
    borderColor: "white",
    backgroundColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    margin: 5,
  },
});

export default EmailField;
