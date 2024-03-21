import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { ip } from "../../../components/helpers/conf";
import StyledButton from "../../../components/styledbutton";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import styles from "./profileStyle";
import Player from "../../../components/Player";
import { StackNavigationProp } from "@react-navigation/stack";
import Thumbnail from "../../../components/helpers/thumbnail";
const ProfileScreen = (route) => {
  const isFocus = useIsFocused();
  const [profileImage, setProfileImage] = useState<string>("");
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState("");
  const [userId, setUID] = useState<string>(null);
  const [source, setsource] = useState<string>(null);
  const [thumbnails, setThumbnails] = useState([]);
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {width,height} = Dimensions.get("window")
  useEffect(() => {
    let uid;
    if (route.uid){
      setsource("route")
      setUID(route.uid)
      uid = route.uid;
    }
    else if(route.route.params.uid){
      setsource("params")
      console.log(route.route.params.uid, "route.route.params.uid");
      setUID(route.route.params.uid)
      uid = route.route.params.uid
    }
          // Fetch profile image from the server
      fetchProfileImage(uid);

      // Fetch videos from the server and generate thumbnails
      fetchVideos(uid);
  },[route, isFocus])// runs 
 
  const plus = <Icon name="add" size={40}></Icon>;

  const fetchProfileImage = async (uid:string) => {
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
      console.log(uid, route);
    }
  };

  const fetchVideos = async (uid:string) => {
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
    return (
      <View style={{ flex: 3, alignItems: "center", flexDirection: "column" }}>
        <>
          <Image
            source={{ uri: ip + profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.title}>{user}</Text>
          <Text style={styles.subtitle}>Videos:</Text>
        </>
        <ScrollView contentContainerStyle={styles.videoContainer}>         
          {/*
          TODO:Create Singular Video View... Somehow...
          */}
          {videos.flatMap((video)=>{
            return(
                <Thumbnail
                  key={video.pk}
                  url={ip+video.video_url}
                  style={styles.videoItem}
                  />
            )
          })}
        </ScrollView>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {profileImage ? renderIf() : renderElse()}
      {source === "route" && profileImage ? (
        <TouchableOpacity
          onPress={() => nav.navigate("Vid" )}
          style={[styles.button, styles.add, {}]}
        >
          <Text style={{ textAlign: "center"}}>{plus}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ProfileScreen;

//045c6906-3c7f-4318-917a-6e36601cb01edd