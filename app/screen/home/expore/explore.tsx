import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
  FlatList,
  Dimensions,
} from "react-native";

import * as Location from "expo-location";
import { ip } from "../../../components/helpers/conf";
import { AntDesign } from "@expo/vector-icons";
import {
  BackgroundColor,
  Green,
  Red,
  lightblue,
  secondaryBg,
} from "../../../components/helpers/StyleVars";
import xhtmlrequestBuilder from "../../../components/helpers/request";
import Player from "../../../components/Player";
import { LinearGradient } from "expo-linear-gradient";
import FloatingIsland from "../../../components/floatingisland";
import { useNavigation } from "@react-navigation/native";


const { height, width } = Dimensions.get("window");

// Define the type for the video object
type Video = {
  hasBeenLiked?: boolean;
  pk: number;
  video_url: string;
  title: string;
  // Add more properties here if needed
}

// Define the type for the response data
interface ExploreScreenResponse {
  videos: Video[];
}
const ExploreScreen = ({ uid }) => {
  const nav = useNavigation() as any;
  const HeartIcon = useMemo(
    () => <AntDesign name="heart" color={"#f0f0f0"} size={30}></AntDesign>,
    []
  );

  const CrossIcon = useMemo(
    () => <AntDesign name="close" color={"#f0f0f0"} size={30}></AntDesign>,
    []
  );

  const Message = useMemo(
    () => <AntDesign name="user" color={"#f0f0f0"} size={20}></AntDesign>,
    []
  );
  const [users, setUsers] = useState<Video[]>([]);

  const [current, setCurrentIndex] = useState(0);
  const getUsers = (): void => {
    if (!uid) {
      return;
    }
    const xhr = new xhtmlrequestBuilder();
    const test = uid;
    console.log(test )
    xhr
      .to(ip)
      .asType("GET")
      .atRoute(`/getRandomVideos/${test}/5`)
      .onCompletion((resp) => {
        console.log(test);
        const parsedResponse: ExploreScreenResponse = JSON.parse(resp);

        setUsers(parsedResponse.videos);
      })
      .send();
  };
  const sendLike = (uid: any, pk: number, action:"ADD"|"DECREASE") => {
    if (users[current].hasBeenLiked){
      return
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", ip + "/setLikes/");
    xhr.onreadystatechange = function(resp) {
      console.log(resp, "safe");
    };
    const fd = new FormData();
    fd.append("uid", uid);
    fd.append("video", pk.toString());
    fd.append("action", action)
    xhr.send(fd);
    users[current].hasBeenLiked = true
    
  };
  const getMore = (): void => {
    if (!uid) {
      return;
    }
    var exclusions = users
      .map((video: Video) => {
        return video.pk;
      })
      .join("-");
    const xhr = new xhtmlrequestBuilder();
    xhr
      .to(ip)
      .asType("GET")
      .atRoute(`/getRandomVideos/${uid}/5/${exclusions}`)
      .onCompletion((resp) => {
        const parsedResponse: ExploreScreenResponse = JSON.parse(resp);
        setUsers((prevUsers) => [...prevUsers, ...parsedResponse.videos]);
      })
      .send();
  };
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Please grant location permissions");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    const newLocation = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };
    setLocation(newLocation);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      }
    };
    xhr.open("POST", ip + "updateLocation/" + uid, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(
      JSON.stringify({
        uid: uid,
        location: newLocation,
      })
    );
  };

  const [location, setLocation] = useState({});
  useEffect(() => {
    getPermissions();
    getUsers();
  }, [uid]);
  const handleReaction = useCallback(
    (reaction: "LIKE" | "DISLIKE" | "USER") => {
      console.log(users[current].hasBeenLiked)
      switch (reaction) {
        case "LIKE":
          sendLike(uid, users[current].pk, "ADD");
          break;
        case "DISLIKE":
          sendLike(uid, users[current].pk, "DECREASE");
          break;
        case "USER":
          nav.navigate("Profile", {uid:uid})
      }
    },
    [current, users]
  );
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      if (viewableItems && viewableItems.length == 1) {
        setCurrentIndex(viewableItems[0].index);
        console.log(viewableItems[0]);
      }
    },
    [setCurrentIndex]
  );

    const renderIf = ()=>{
      return (
        <View style={style.container}>
          <FlatList
              style={{backgroundColor:BackgroundColor}}
                data={users}
                onViewableItemsChanged={onViewableItemsChanged}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={height}
                onEndReachedThreshold={2}
                extraData={users}
                // keyExtractor={(item: Video) => item.pk.toString()}
                onEndReached={() => getMore()}
                renderItem={function(
                  info: ListRenderItemInfo<any>
                ): React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                > {
                  return (
                    <Player
                    isThumbnail = {false}
                      shouldplay={info.index == current}
                      url={`${ip}${info.item.video_url}`}
                    // url={"http://192.168.1.9:8000/media/videos/undefined46d87b5b-86a7-4866-9ee5-5badf07a6929.mp4"}
                      />
                  );
                }}
              ></FlatList>
               <LinearGradient
                colors={["rgba(255,255,255,0)", secondaryBg]}
                style={{
                  position: "absolute",
                  zIndex: 10,
                  bottom: 0,
                  height: 110,
                  paddingLeft: 30,
                  width: width,
                }}
              >
                {users[current] && users[current].title && (
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {users[current].title}
                  </Text>
                )}
              </LinearGradient>
              <TouchableOpacity
        disabled = {users[current].hasBeenLiked}
        onPress={() => handleReaction("LIKE")}
        // style = {()=>{
        //   if (users[current].hasBeenLiked){
        //     return {BackgroundColor:BackgroundColor}
        //   }
        // }}
        style={[style.button, users[current].hasBeenLiked && style.disabledInteractButton, style.heart]}
      >
        <Text style={{ textAlign: "center" }}>{HeartIcon}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleReaction("USER")}
        style={[style.button, style.msg]}
      >
        <Text style={{ textAlign: "center" }}>{Message}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleReaction("DISLIKE")}
        style={[style.button, users[current].hasBeenLiked ? style.disabledInteractButton:style.cross]}
      >
        <Text style={{ textAlign: "center" }}>{CrossIcon}</Text>
      </TouchableOpacity>
        </View>

   )
             
  }

  if (users.length > 0){
    return renderIf()
  }else {
    return(
        <>
          <View style={style.fail}>
            <Text style={style.failText}>
              Sadly we ran out of videos to show you!
            </Text>
          </View>
        </>
      )}
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  fail: {
    backgroundColor:BackgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  failText: {
    color:"white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  button: {
    zIndex: 10,
    opacity: 0.8,
    borderRadius: 100,
    position: "absolute",
    width: 50,
    justifyContent: "center",
    height: 50,
    margin: 30,
    alignContent: "center",
  },
  heart: {
    backgroundColor: Green,
    bottom: 0,
    right: 0,
  },
  cross: {
    backgroundColor: Red,
    bottom: 0,
    left: 0,
  },
  disabledInteractButton: {
    backgroundColor: "gray",
    bottom: 0,
    left: 0,
  },
  msg: {
    alignSelf: "center",
    backgroundColor: lightblue,
    bottom: 0,
    opacity: 0.8,
    borderRadius: 100,
    position: "absolute",
    width: 35,
    justifyContent: "center",
    height: 35,
    margin: 30,
    alignContent: "center",
  },
});
export default ExploreScreen;
