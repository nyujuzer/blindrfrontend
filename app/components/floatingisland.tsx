import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';

const FloatingIsland = ({uid}) => {
  const nav = useNavigation() as any
  const profile = <Icon name="user" size={30} color="white" />;
  const search = <Icon name="search" size={30} color="white" />;
  useEffect(()=>{console.log(uid, "AAAAAAAAAA")})
  return (
    <View style={styles.container}>
      <View style={styles.island}>
        <TouchableOpacity style={styles.button} onPress={() => {console.log(uid, "___________________ "),nav.navigate("Profile", {uid:uid})}}>
          {profile}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Search button pressed')}>
          {search}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'flex-end', // Align items to the right
  },
  island: {
    opacity: 0.8,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5, // Add some space from the right edge
  },
  button: {
    width: 40,
    height: 40,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingIsland;