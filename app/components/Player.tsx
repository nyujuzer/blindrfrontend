import React, {Children, useRef} from "react";
import { View, StyleSheet, Dimensions, ImageStyle, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { ip } from "./helpers/conf";

const { width, height } = Dimensions.get("window");


interface IWrapperProps{
  isThumbnail:boolean,
  onPress?:()=>void,
}
// const VideoTouchWrapper:React.FC<any> = ({isThumbnail, onPress}:IWrapperProps)=>{
//   if (isThumbnail){
//     return (
//       {{Children}}
//     )
//   }else{return (
//     <TouchableOpacity>
//       {{Children}}
//     </TouchableOpacity>
//   )}
// }
const Player = ({ shouldplay, url, style }: Iplayerprops) => {
  const videoRef = useRef(null);
  return (
      <Video
      posterSource={{uri:"../../img/ClipCrush2.png"}}
      usePoster={true}
        onLoadStart={()=>console.log("SRC = ",videoRef.current.props.source)}
        onLoad={()=>{
          console.log("FINISHED - "+videoRef.current.props.source.uri)
        }}
        ref={videoRef}
        style={style?style:styles.video}
        isMuted={true}
        resizeMode={ResizeMode.CONTAIN}
        source={{ uri: url }}
        isLooping
        shouldPlay={shouldplay}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  video: {
    flex: 1,
    width: "33%",
    height: height,
    aspectRatio: 16 / 9,
  },
});

export default Player;
