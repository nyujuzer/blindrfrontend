import React from 'react';
import {SafeAreaView ,TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ActionColor, SecondaryColor, secondaryBg } from './helpers/StyleVars';
import Icon from 'react-native-vector-icons/FontAwesome'

const CustomInputToolbar = (props) => {
  const { text, onTextChanged, onSend } = props;
  const fa_pplane = <Icon name="paper-plane" size={31} color={SecondaryColor}></Icon>;
  return (
    <SafeAreaView style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={text}
        onChangeText={onTextChanged}
      />
      <TouchableOpacity onPress={onSend}>
    <Text style={{color:"white"}}>{fa_pplane}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal:20,
    backgroundColor:secondaryBg,
    borderTopEndRadius:300,
    borderBottomLeftRadius:300
},
    input: {
    backgroundColor:ActionColor,
    flex: 1,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey', // Adjust the border color as needed
  },
});

export default CustomInputToolbar;