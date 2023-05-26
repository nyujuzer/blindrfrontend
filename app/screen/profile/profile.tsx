import React, { useState } from 'react';
import { StyleSheet, View, Image, Button , Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ip } from '../../components/helpers/conf';


const ProfileScreen = () => {
 return (
  <View>
    <Text> hello world</Text>
  </View>
 )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
});

export default ProfileScreen;
