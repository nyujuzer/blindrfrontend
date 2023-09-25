import React, { useEffect, useState } from "react";
import { getValueOf } from "../../../components/helpers/app.loginHelper";
import { ip } from "../../../components/helpers/conf";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import VideoUploadField from "../../../components/videoUploadField";
import StyledButton from "../../../components/styledbutton";
import InputField from "../../../components/inputfield";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { BackgroundColor } from "../../../components/helpers/StyleVars";

const dimensions = Dimensions.get("window");

const Vidupload = () => {
  useEffect(() => {
    getValueOf("uid").then((uid) => {
      setUid(uid);
    });
  }, []);

  const nav = useNavigation();
  const [uid, setUid] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const uploadImage = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("video", selectedImage);
    formData.append("uid", uid);
    formData.append("title", title);
    formData.append("tags", tags);

    try {
      const response = await fetch(ip + "/uploadVideo/", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          console.log("should go back");
          nav.goBack();
        } else if (data.reason === "tooShort") {
          alert(
            "The title is too long! The longest you can set the title to be is 100 characters"
          );
        }
      } else {
        console.error("Error uploading image:", response.statusText);
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
        Select a video
      </Text>
      <VideoUploadField
        handleSelection={(img) => setSelectedImage({ ...img, name: title })}
        uid={uid}
      />
      {selectedImage ? (
        <StyledButton
          text="Continue!"
          onPress={() => {
            setOpen(true);
          }}
        />
      ) : null}
      <Modal visible={open} transparent={true} animationType="slide">
        <View
          style={[
            styles.container,
            {
              alignSelf: "center",
              width: dimensions.width * 0.8,
              height: dimensions.height * 0.8,
              backgroundColor: "rgba(0,0,0,0.8)",
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 22 }}>
            Give it a Great title!
          </Text>
          <InputField
            onChangeText={(text) => {
              setTitle(text);
              setSelectedImage({ ...selectedImage, name: text + ".mp4" });
            }}
            placeholder="Title"
          />
          {/* <InputField
            onChangeText={(text)=>{setTags(text)}}
            placeholder="tags"
          /> */}
          {title.length >= 5 ? (
            <StyledButton
              isDisabled={isLoading}
              text={isLoading ? <ActivityIndicator size={"small"} color={BackgroundColor}/> : "Upload"}
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

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "black",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Vidupload;
