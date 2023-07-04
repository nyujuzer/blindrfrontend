  import React, { useState, } from 'react';
  import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
  import * as ImagePicker from 'expo-image-picker';
  import { ip } from './helpers/conf';
  import StyledButton from './styledbutton';

  const UploadField = ({uid}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access the camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.canceled === true) {
        return;
      }

      const image = {
        uri: pickerResult.assets[0].uri,
        type: 'image/jpeg', // Change this if your image is of a different type
        name: 'image.jpg', // Change this if you want a different name for your image file
      };

      setSelectedImage(image);
      console.log(image.uri);
    };

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append("uid", uid)
      try {
        const response = await fetch(ip + '/uploadImage/', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        return data;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
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
            <View style={style.square} />
          </Pressable>
        );
      }
    };

    return (
      <View style={[style.container, { marginBottom: 50 }]}>
        {renderContent()}
        <StyledButton text={'Upload Image'} onPress={uploadImage} />
              </View>
    );
  };

  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 3,
      borderColor: "red",
      borderWidth: 3,
    },
    square:{
      width:100, height:100, backgroundColor:'gray'
    }
  })

  export default UploadField