import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import xhtmlrequestBuilder from "./helpers/request";
import { LinearGradient } from "expo-linear-gradient";
import { ActionColor, darkColor, secondaryBg } from "./helpers/StyleVars";
import { AntDesign } from "@expo/vector-icons";
import ConvertToProxyUrl from 'react-native-video-cache'

const { width, height } = Dimensions.get("window");

interface Iplayerprops {
  shouldplay: boolean;
  isThumbnail: boolean;
  style?: any;
  url: string;
}

const Player = ({ shouldplay, url, style, isThumbnail }: Iplayerprops) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    console.log(url);
  }, []);

  const like = <AntDesign name="like1"></AntDesign>;
  const tryGettingImg = async ()=>{
    try {
      const img_fetch = await fetch(url, {
        method:"GET"
      })
      console.log(img_fetch)
    } catch (err) {
      console.log(err)
    }
  }
  // tryGettingImg()
  return (
    <View
      style={[
        isThumbnail === true
          ? {  flexDirection:"row"}
          : styles.container,
      ]}
    >
      <Video
      onLoadStart={()=>console.log("SRC = ",videoRef.current.props.source)}
      
      onLoad={()=>{
        console.log("FINISHED")
      }}
        posterSource={require("../../assets/favicon.png")}
        ref={videoRef}
        style={[isThumbnail === true ? {} : styles.video, style]}
        isMuted={isThumbnail}
        resizeMode={ResizeMode.COVER}
        source={{ uri: (url) }}
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
s    alignSelf: "center",
    width: width,
    height: height,
  },
});

export default Player;
