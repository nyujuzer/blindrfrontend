import React, { useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import UploadField from '../../../../components/uploadfield';
import axios from 'axios'
import StyledButton from '../../../../components/styledbutton';
import { getValueOf } from '../../../../components/helpers/app.loginHelper';
import { ip } from '../../../../components/helpers/conf';
import Form from '../../../../components/form';


const Finish = ()=>{
    const [SelectedImages, setSelectedImages] = useState([]);
    const [UID, setuid] = useState()
    getValueOf("uid").then((uid)=>setuid(uid))
    const handleImageSelect = (imageUri) => {
        setSelectedImages([...SelectedImages, imageUri]);
      };
      const handleUpload = () => {
        console.log("hello");
        const formData = new FormData();
        formData.append("uid", UID);
      
        const xhr = new XMLHttpRequest();
        xhr.open("POST", ip + "uploadImage/", true);
      
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log("Upload success!", xhr.responseText);
              // Handle response from the server
            } else {
              console.error("Upload error:", xhr.statusText);
              // Handle upload error
            }
          }
        };
      
        SelectedImages.forEach(async (imageUri, index) => {
          const filename = `image_${index + 1}.jpg`;
          const response = await fetch(imageUri);
          const blob = await response.blob();
      
          formData.append("images", blob, filename);
        });
      
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(formData);
      };
      return (
        <View>
            <Form>
        </Form>
        </View>
        )
}
export default Finish