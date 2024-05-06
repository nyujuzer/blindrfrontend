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
import { StackNavigationProp } from "@react-navigation/stack";
import { getExpiration } from "../../../components/helpers/idempotence";

const dimensions = Dimensions.get("window");

const Vidupload = () => {
  useEffect(() => {
    getValueOf("uid").then((uid) => {
      setUid(uid);
    });
  }, []);

  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [uid, setUid] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function fileSelectedHandler(event): void {
    setSelectedImage(event.target.value);
  }
  const uploadImage = async () => {
    setLoading(true);
    const form = document.getElementById("form") as HTMLFormElement
    const form2 = document.getElementById("form2") as HTMLFormElement
    // console.log([form, form2]);
    // const _form_ = form.
    const formData = new FormData(form);
    try {
      const response = await fetch(ip + "/uploadVideo/", {
        method: "POST",
        body: formData,
        mode:"no-cors",
        headers: {
          // "idempotenceToken":`${day}/${timestamp};${expiration};${uid}/videoUpload`,
          "Content-Type": "multipart/form-data;",
          // "access-control-allow-origin":"http://localhost:19006"
        }
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
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <View>
    
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
