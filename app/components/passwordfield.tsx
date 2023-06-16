import React from "react";
import { TextInput, StyleSheet } from "react-native";

const PasswordField = ({ onChangeText }: any) => {
  return (
    <TextInput
      style={styles.inputFieldStyle}
      placeholder="Password"
      placeholderTextColor={"white"}
      secureTextEntry={true}
      onChangeText={onChangeText}
      autoComplete="off"
    />
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    height: 45,
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

export default PasswordField;
