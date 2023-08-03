import React, { useState } from "react";
import { TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install 'expo-vector-icons' or use any other icon library

const PasswordField = ({ onChangeText }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
    <View>
      <TextInput
        style={styles.inputFieldStyle}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry={!showPassword}
        passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
        onChangeText={onChangeText}
        autoComplete="off"
      />
      <TouchableOpacity
        style={styles.showPasswordButton}
        onPress={toggleShowPassword}
      >
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          style={{paddingLeft:10}}
          opacity={0.4}
          color="white"
        />
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    padding: 10,
    height: 45,
    width: 300,
    fontSize: 20,
    opacity: 0.4,
    color: "white",
    borderRadius: 6,
    borderColor: "white",
    backgroundColor: "black",
    borderWidth: 1,
    margin: 5,
  },
  showPasswordButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

export default PasswordField;
