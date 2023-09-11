import React, { useEffect, useState } from "react";
import { getValueOf } from "../../../components/helpers/app.loginHelper";
import { ip } from "../../../components/helpers/conf";
import { View, Text, StyleSheet, Dimensions, Modal } from "react-native";
import VideoUploadField from "../../../components/videoUploadField";
import UploadField from "../../../components/uploadfield";
import StyledButton from "../../../components/styledbutton";
import InputField from "../../../components/inputfield";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
// import { Modal } from "react-native-paper";
const dimensions = Dimensions.get("window");
const Vidupload = () => {
  useEffect(() => {
    getValueOf("uid").then((uid) => {
      setuid(uid);
    });
  }, []);
  const nav = useNavigation()
  const [uid, setuid] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, settags] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("video", selectedImage);
    formData.append("uid", uid);
    formData.append("title", title)
    formData.append("tags", tags)
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", ip + "/uploadVideo/", true);
      
      xhr.onreadystatechange = function () {
        console.log(this.readyState);
        
        if (xhr.readyState!==4){
          setLoading(true)
          console.log(isLoading);
          
        } 
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setLoading(false)
            const data = JSON.parse(xhr.responseText);
    
            if (data['success']) {
              console.log("should go back");
              nav.goBack()
            } else if (data['reason'] === "tooShort") {
              alert("The title is too long! The longest you can set the title to be is 100 characters");
            }
          } else {
            console.error("Error uploading image:", xhr.statusText);
            throw new Error("Failed to upload image");
          }
        }
      };
    
      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
    
  };
  return (
    <View style={style.container}>
      <Text style={{color:"white", fontSize:30, fontWeight:"bold"}}>Select a video</Text>
      <VideoUploadField
        handleSelection={(img) => setSelectedImage(img)}
        uid={uid}
      />
      {selectedImage ? (
        <StyledButton
          text="Continue!"
          onPress={() => {
            setOpen(true);
          }}
        ></StyledButton>
      ) : null}
      <Modal visible={open} transparent={true} animationType="slide">
        <View
          style={[
            style.container,
            {
              alignSelf: "center",
              width: dimensions.width * 0.8,
              height: dimensions.height * 0.8,
              backgroundColor: "rgba(0,0,0,0.8)",
            },
          ]}
        >
          <Text style={{color:"white", fontSize:22}}>Give it a Great title!</Text>
          <InputField
            onChangeText={(text) => {
              setTitle(text);
            }}
            placeholder="Title"
          />
          {/* <InputField
            onChangeText={(text)=>{settags(text)}}
            placeholder="tags"
          /> */}
          {title.length >= 5 ? (
            <StyledButton
            isDisabled = {isLoading}
              text={isLoading?<ActivityIndicator size={"small"}/>:"Upload"}
              onPress={() => {
                uploadImage();
              }}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "black",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Vidupload;
