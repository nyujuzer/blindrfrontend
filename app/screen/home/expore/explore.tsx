import React, { useEffect, useState,  } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Alert } from 'react-native';

import * as Location from 'expo-location'
import { getPathFromState } from '@react-navigation/native';
import { ip } from '../../../components/helpers/conf';
import StyledButton from '../../../components/styledbutton';

const ExploreScreen = ({uid}) => {
  const [count, setcount]=useState(0)
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Please grant location permissions");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    const newLocation = {'latitude':currentLocation.coords.latitude,'longitude': currentLocation.coords.longitude};
    setLocation(newLocation);
    console.log(newLocation)
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4&&this.status == 200) {
        console.log(this.response)
        
      }
    };
    xhr.open("POST", ip + "getUsers/", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify({
      "uid": uid,
      location: newLocation,
    }));

  };
  const [location, setLocation] = useState({})
  useEffect(() => {
    getPermissions();
    
  }, [1]); 
  return (
    <View style={style.container}>
      <StyledButton text={'test'} onPress={()=>{setcount(count+1);Alert.alert(count.toLocaleString())}}/>
    </View>
  )
}
const style = StyleSheet.create({
  container:{
    alignItems:'center',
    alignSelf:'center'
  }
})
export default ExploreScreen;
