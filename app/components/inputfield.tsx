import React from "react";
import { TextInput, StyleSheet } from "react-native";
type props = {
  onChangeText:(text)=>void,
  placeholder:string
}
const InputField = ({onChangeText, placeholder}:props) => {
  return (
    <TextInput
      style={styles.inputFieldStyle}
      placeholder={placeholder}
      onChangeText={(text)=>onChangeText(text)}
      selectionColor={"green"}
      cursorColor={"red"}
      placeholderTextColor={"white"}
    />
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    padding:10,
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