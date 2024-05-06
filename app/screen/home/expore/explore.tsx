import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
  FlatList,
  Dimensions,
} from "react-native";

import { ip } from "../../../components/helpers/conf";
import { AntDesign } from "@expo/vector-icons";
import {
  Green,
  Red,
  androidAreaStyle,
  lightblue,
  theme,
} from "../../../components/helpers/StyleVars";
import xhtmlrequestBuilder from "../../../components/helpers/request";
import Player from "../../../components/Player";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getValueOf } from "../../../components/helpers/app.loginHelper";

const { height, width } = Dimensions.get("window");
// Define the type for the video object
interface Video {
  pk: number;
  title: string;
  video_url: string;
  otherid: string;
  user: TUser;
  description: string;
  likes: number;
}

// Define the type for the response data
interface ExploreScreenResponse {
  videos: Video[];
}

const ExploreScreen = () => {
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [current, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState<Video[]>([]);
  const [uid, setUserId] = useState<string>("");

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

  useEffect(() => {
    getVideos();
  }, []);
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      if (viewableItems && viewableItems.length == 1) {
        setCurrentIndex(viewableItems[0].index);

        console.log(viewableItems[0]);
      }
    },
    [setCurrentIndex]
  );

  const getVideos = async (exclusions?: string) => {
    const xhr = new xhtmlrequestBuilder();
    const userid = await getValueOf("uid");
    xhr
      .to(ip)
      .asType("GET")
      .atRoute(`/getRandomVideos/${userid}/5/${exclusions}`)
      .onCompletion((resp) => {
        const parsedResponse: ExploreScreenResponse = JSON.parse(resp);
        setUsers((prevUsers) => [...prevUsers, ...parsedResponse.videos]);
      })
      .send();
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
    getVideos(exclusions);
  };

  const sendLike = (uid: any, pk: number, action: "ADD" | "DISLIKE") => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", ip + "/setLikes/");
    xhr.onreadystatechange = function (resp) {
      console.log(resp, "safe");
    };
    const fd = new FormData();
    fd.append("uid", uid);
    fd.append("action", action);
    fd.append("video", pk.toString());
    xhr.send(fd);
  };

  const handleReaction = useCallback(
    (reaction: "LIKE" | "DISLIKE" | "PROFILE") => {
      switch (reaction) {
        case "LIKE":
          console.log("users -- ", users, "\ncurrent -- ", current);
          sendLike(uid, users[current].pk, "ADD");
          break;
        case "DISLIKE":
          sendLike(uid, users[current].pk, "DISLIKE");
          break;
        case "PROFILE":
          nav.navigate("Profile", { uid: users[current].otherid });
          // {uid:"21205b5a-5483-4872-8b1c-70428f12943c"}
          break;
      }
    },
    [current, users]
  );

  return (
    <View style={style.container}>
      {users.length > 0 ? (
        <>

          <FlatList
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            data={users}
            style={{}}
            onViewableItemsChanged={onViewableItemsChanged}
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={height}
            onEndReachedThreshold={2}
            extraData={users}
            onEndReached={() => getMore()}
            renderItem={function (
              info: ListRenderItemInfo<any>
            ): React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            > {
              const isOnViewport = info.index == current;
              return (
                <View
                  style={{
                    aspectRatio: 16 / 9,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Player
                    //style={{
                    //  flex:1,
                    //  width: width,
                    //  height: height,
                    //  aspectRatio: 16 / 9,
                    //}}
                    shouldplay={isOnViewport}
                    url={`${ip}${info.item.video_url}`}
                  />
                </View>
              );
            }}
          ></FlatList>
          <View style={{
            backgroundColor:theme.primary,
            width: width,
          }}>
              <Text style={
                {
                  color: theme.secondary,
                  fontSize:20,
                  paddingBottom:5,
                }}> 
                {users[current].title}
              </Text>
          </View>
        </>
      ) : (
        <>
          <View style={style.fail}>
            <Text style={style.failText}>
              Sadly we ran out of videos to show you!
            </Text>
          </View>
        </>
      )}
      <TouchableOpacity
        onPress={() => handleReaction("LIKE")}
        style={[style.button, style.heart]}
      >
        <Text style={{ textAlign: "center" }}>{HeartIcon}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleReaction("PROFILE")}
        style={[style.button, style.msg]}
      >
        <Text style={{ textAlign: "center" }}>{Message}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleReaction("DISLIKE")}
        style={[style.button, style.cross]}
      >
        <Text style={{ textAlign: "center" }}>{CrossIcon}</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    borderBlockColor: "red",
    borderWidth: 3,
    height: height,
    alignContent: "center",
    justifyContent: "center",
  },
  fail: {
    backgroundColor: theme.secondary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  failText: {
    color: "white",
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

  listview: {
    flex: 1,
    justifyContent: "center",
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
  msg: {
    alignSelf: "center",
    backgroundColor: lightblue,
    bottom: 0,
    opacity: 0.8,
    borderRadius: 100,
    position: "absolute",
    justifyContent: "center",
    margin: 30,
    alignContent: "center",
  },
  gradient: {
    position: "absolute",
    zIndex: 10,
    bottom: 0,
    height: 110,
    paddingLeft: 30,
    width: width,
  },
  info: {

  },
});
export default ExploreScreen;