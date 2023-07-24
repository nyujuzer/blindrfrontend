import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const TextAreaWithOverlay = ({maxLength, value, onChangeText, overlayText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textArea}
        multiline
        maxLength={maxLength}
        numberOfLines={3}
        value={value}
        onChangeText={onChangeText}
      />
      <View style={styles.overlayContainer}>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{overlayText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  textArea: {paddingTop:30,
    borderRadius:10,
    textAlignVertical:"top",
    height:150,
    color: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    padding:10
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: 'transparent', // Add this line to set a transparent background
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // padding: 5,
  },

  overlayText: {
    color: '#fff',
    fontSize: 16,
    textAlignVertical: 'top', // Add this line to align the text to the top
  },
});

export default TextAreaWithOverlay;
