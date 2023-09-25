import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { ip } from "../../../components/helpers/conf";
import StyledButton from "../../../components/styledbutton";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "cloudinary-react-native";
import * as VideoThumbnails from "expo-video-thumbnails";
import styles from "./profileStyle";
import Video from 'react-native-video'
import Player from "../../../components/Player";
import { ResizeMode } from "expo-av";
const ProfileScreen = ({ uid }) => {
  const isFocus = useIsFocused();
  const [profileImage, setProfileImage] = useState<string>(null);
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const nav = useNavigation() as any;

  const {width,height} = Dimensions.get("window")

  useEffect(() => {
    console.log(uid);

    if (isFocus) {
      console.log("isFocus :>> ", isFocus);
      // Fetch profile image from the server
      fetchProfileImage();

      // Fetch videos from the server and generate thumbnails
      fetchVideos();
    }
  }, [isFocus]);

  const plus = <Icon name="add" size={40}></Icon>;

  const fetchProfileImage = async () => {
    try {
      const response = await fetch(`${ip}/getProfileData/${uid}/`);
      const data = await response.json();
      console.log(data);

      if (!data["success"]) {
        console.log("null");
        setProfileImage(null);
      } else {
        setProfileImage(`${data["profileImageRoute"]}`);
        setUser(data["username"]);
      }
    } catch (error) {
      console.log(error);
      console.log(profileImage);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${ip}/videos/${uid}`);
      const videoData = await response.json();
      setVideos(videoData)
    }catch{
      alert("There were some errors fetching the videos")
    }
  }
  const renderElse = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          It seems you haven't finished your registration
        </Text>
        <StyledButton
          text={"Finish Registration"}
          onPress={() => {
            nav.navigate("Finish");
          }}
        ></StyledButton>
      </View>
    );
  };

  const renderIf = () => {
    console.log(videos);
    console.log();
    return (
      <View style={{ flex: 3, alignItems: "center", flexDirection: "column" }}>
        <View>
          <Image
            source={{ uri: ip + profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.title}>{user}</Text>
          <Text style={styles.subtitle}>Videos:</Text>
        </View>
        <View style={styles.videoContainer}>
          {videos.map((item)=>{
            return(
              <View key={item.pk.toString()}>
                <Player
                isThumbnail={true}
                  url={ip+item.video_url}
                  style={styles.videoItem}
                  shouldplay={false}
                />
              </View>
            )
          })
          }
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {profileImage ? renderIf() : renderElse()}
      {profileImage ? (
        <TouchableOpacity
          onPress={() => nav.navigate({ name: "Vid" })}
          style={[styles.button, styles.add, {}]}
        >
          <Text style={{ textAlign: "center" }}>{plus}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ProfileScreen;
