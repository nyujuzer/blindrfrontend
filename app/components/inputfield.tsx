import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputField = ({ onChangeText, placeholder }: any) => {
  return (
    <TextInput
      style={styles.inputFieldStyle}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={"white"}
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

export default InputField;
