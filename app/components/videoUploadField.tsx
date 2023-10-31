import React, { useState, } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { lightGray } from './helpers/StyleVars';
import { getValueOf } from './helpers/app.loginHelper';
import { imageUploadProps } from './helpers/interfaces';

const dimensions = Dimensions.get("window")
const UploadField = ({handleSelection , uid}:imageUploadProps) => {
  const myIcon = <Icon name="camera" size={30} color={lightGray} />;
  const [selectedImage, setSelectedImage] = useState(null);
  const generateName = ()=>{
    let name
    getValueOf("email").then((text) =>{ name = text.split("@")[0];})
    console.log(name);
    
    return name
  }
  const handleImageUpload = async () => {
    
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("heyya");
    
    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
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
    handleSelection(image)
    console.log(turnURItoJson(pickerResult.assets[0].uri));
  };

 

  const renderContent = () => {
    if (selectedImage) {
      return (
        <TouchableOpacity onPress={handleImageUpload}>
          <Image style={style.image} source={selectedImage} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={handleImageUpload}>
          <View style={style.square} >
            <Text>{myIcon}</Text>
            </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[style.container, { marginBottom: 50 }]}>
      {renderContent()}
            </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: dimensions.width*0.80,
    height: dimensions.height *0.80,
    borderRadius: 10,
    borderColor: "red",
  },
  square:{
    justifyContent: 'center',
    alignItems: 'center',
    width:dimensions.width*0.80,
    height:dimensions.height *0.80,
    backgroundColor:"#d1d1d1",
    borderRadius:10
  },
  camera:{
    alignSelf:'center',
  }
})

export default UploadField

function turnURItoJson(uri: string): any {
  return uri.split("/")[-1]
}
