import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { ip } from "../../../components/helpers/conf";
import StyledButton from "../../../components/styledbutton";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import styles from "./profileStyle";
import Player from "../../../components/Player";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../components/helpers/types";
const ProfileScreen = (route,uid:string) => {
  const isFocus = useIsFocused();
  const [profileImage, setProfileImage] = useState<string>(null);
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {width,height} = Dimensions.get("window")

  useEffect(() => {
    try{
      uid = route.route.params.uid
      console.log(route.route);
      
      console.log("route");
    }catch{
      console.log("id");
      
      uid = route.uid
    }
    if (isFocus) {
      // Fetch profile image from the server
      fetchProfileImage();

      // Fetch videos from the server and generate thumbnails
      fetchVideos();
    }

    
  }, [isFocus, uid]);

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
      console.log(uid, route);
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
          onPress={() => nav.navigate("Vid" )}
          style={[styles.button, styles.add, {}]}
        >
          <Text style={{ textAlign: "center" }}>{plus}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ProfileScreen;

//045c6906-3c7f-4318-917a-6e36601cb01edd
//