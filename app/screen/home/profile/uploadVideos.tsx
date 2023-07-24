import React, {useState} from 'react'
import { getValueOf } from '../../../components/helpers/app.loginHelper';
import { ip } from '../../../components/helpers/conf';
import { View, Text} from 'react-native';
import VideoUploadField from '../../../components/videoUploadField';
import UploadField from '../../../components/uploadfield';

const Vidupload = () => {
  const [uid, setuid] = useState()
  const [selectedImage, setSelectedImage] = useState(null);
  getValueOf("uid").then((uid) =>{setuid(uid)})
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
  }
  return(
<View style={{}}>
      <VideoUploadField handleSelection={(img) => setSelectedImage(img)} uid={uid} />
      </View>
  );
}
 

export default Vidupload