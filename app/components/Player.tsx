import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";
import xhtmlrequestBuilder from "./helpers/request";

const Player = ({ url }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const _ =()=>{
    const xhr = new xhtmlrequestBuilder()
    xhr.to("https://www.boredapi.com/api/").atRoute("activity/").asType("GET").onCompletion((text)=>{console.log(text)}).send()
  }
  return (
    <View style={styles.container}>
      <Video
        onLoadStart={()=>{console.log("loading");}}
        onLoad={()=>{console.log("loaded")}}
        ref={videoRef}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        source={{uri: url}}
        // source={require("../../img/3b8649cb-0f21-41b3-a824-312484c3e0ae.mp4")}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={status =>setStatus(()=>status)}
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
    alignSelf:"center",
    width:100,
    height:100,
  },
});

export default Player;
