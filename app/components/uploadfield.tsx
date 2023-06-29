import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const uploadfield = ({ selectedImage, onImageSelect }) => {
  const [hasImage, setHasImage] = useState(false);

  const handlePress = async () => {
    if (selectedImage) {
      setHasImage(true);
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
          setHasImage(true);
          onImageSelect(result.assets[0].uri);
        }
      }
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {hasImage && selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 100, height: 100 }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default uploadfield;
