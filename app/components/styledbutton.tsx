import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { ActionColor } from "./helpers/StyleVars";
import { styledbuttonProps } from "./helpers/interfaces";

const StyledButton = ({ onPress, text, style, isDisabled }: styledbuttonProps) => {
  return (
    <Pressable
    disabled={isDisabled}
      style={({ pressed }) => [styles.button, style, pressed && styles.buttonPressed]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: ActionColor,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default StyledButton;
