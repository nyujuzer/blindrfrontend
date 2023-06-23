import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Button , Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ip } from '../../../components/helpers/conf';
import xhtmlrequestBuilder from '../../../components/helpers/request';

const requestUserDetails = (id) =>{
  const x = new xhtmlrequestBuilder()
  x.to(ip).atRoute("").setHeaders({"Content-Type":"application/json"})
}
const ProfileScreen = ({uid}) => {
  useEffect(()=>{
    requestUserDetails(uid)
  },  [])
 return (
  <View>
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
