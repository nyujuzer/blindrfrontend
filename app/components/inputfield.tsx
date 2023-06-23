import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputField = ({ onChangeText, placeholder }: any) => {
  return (
    <TextInput
      style={styles.inputFieldStyle}
      placeholder={placeholder}
      onChangeText={onChangeText}
      selectionColor={"green"}
      cursorColor={"red"}
      placeholderTextColor={"white"}
    />
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    height: 45,
    width: 300,
    opacity:0.4,
    fontSize: 20,
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
