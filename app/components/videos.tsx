import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { ip } from "./helpers/conf";

interface ThumbnailArrayProp {
  thumbnails: Tthumbnail[];
}
const { width } = Dimensions.get("window");
const Videos: React.FC<ThumbnailArrayProp> = ({ thumbnails }) => {
  useEffect(()=>{console.log(thumbnails)},[])
  return (
    <ScrollView
      horizontal={false}
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        width:width,
        justifyContent: "center",
      }}
    >
      {thumbnails.map((thumbnail: Tthumbnail, index) => (
        <View key={index} style={{ margin: 5 }}>
          <TouchableOpacity
            onPress={() => {
              console.log(ip + thumbnail.video_url);
            }}
          >
            <Image
              source={{ uri: ip + thumbnail.thumbnail_url }}
              style={{ width: width * 0.3, height: 150 }}
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};
export default Videos;
