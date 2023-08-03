import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { ResizeMode, Video } from "expo-av";
import xhtmlrequestBuilder from "./helpers/request";
import {LinearGradient} from 'expo-linear-gradient'
import { darkColor, secondaryBg } from "./helpers/StyleVars";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
const Player = ({ url, shouldplay, }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const _ = () => {
    const xhr = new xhtmlrequestBuilder();
    xhr
      .to("https://www.boredapi.com/api/")
      .atRoute("activity/")
      .asType("GET")
      .onCompletion((text) => {
        console.log(text);
      })
      .send();
  };
  const like = <AntDesign name="like1"></AntDesign>
  return (
    <View style={styles.container}>      
      <Video
        ref={videoRef}
        style={styles.video}
        isMuted
        resizeMode={ResizeMode.CONTAIN}
        source={{ uri: url }}
        // source={require("../../img/3b8649cb-0f21-41b3-a824-312484c3e0ae.mp4")}
        isLooping
        shouldPlay={shouldplay}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    alignSelf: "center",
    width: width,
    height: height,
  },
});

export default Player;
