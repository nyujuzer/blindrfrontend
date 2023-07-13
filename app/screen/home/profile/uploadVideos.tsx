import React, { useState, } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getValueOf } from '../../../components/helpers/app.loginHelper';
import { lightGray } from '../../../components/helpers/StyleVars';
import { Button } from 'react-native-paper';
import { ip } from '../../../components/helpers/conf';

const Vidupload = () => {

  const myIcon = <Icon name="camera" size={30} color={lightGray} />;
  const [uid, setuid] = useState()
  const [selectedImage, setSelectedImage] = useState(null);
  const generateName = ()=>{
    let name
    getValueOf("email").then((text) =>{ name = text.split("@")[0];})
    console.log(name);
    
    return name
  }
  getValueOf("uid").then((uid) =>{setuid(uid)})
  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (pickerResult.canceled === true) {
      return;
    }

    const image = {
      uri: pickerResult.assets[0].uri,
      type: 'video/mp4', // Change this if your image is of a different type
      name: uid+'.mp4', // Change this if you want a different name for your image file
    };

    setSelectedImage(image);
    console.log(image.name);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("video", selectedImage);
    formData.append("uid", uid);
    try {
      const response = await fetch(ip + "/uploadVideo/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Image uploaded successfully:", data);
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const renderContent = () => {
    if (selectedImage) {
      return (
        <Pressable onPress={handleImageUpload}>
          <Image style={style.image} source={selectedImage} />
        </Pressable>
      );
    } else {
      return (
        <Pressable onPress={handleImageUpload}>
          <View style={style.square} >
            <Text>{myIcon}</Text>
            </View>
        </Pressable>
      );
    }
  };

  return (
    <View style={[style.container, { marginBottom: 50 }]}>
      {renderContent()}
      <Button onPress={()=>{uploadImage()}}>Upload</Button>
            </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderColor: "red",
  },
  square:{
    justifyContent: 'center',
    alignItems: 'center',
    width:150,
    height:150,
    backgroundColor:"#d1d1d1",
    borderRadius:10
  },
  camera:{
    alignSelf:'center',
  }
})

export default Vidupload