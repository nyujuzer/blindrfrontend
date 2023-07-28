import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Alert,
  Touchable,
  TouchableOpacity,
} from "react-native";

import * as Location from "expo-location";
import { ip } from "../../../components/helpers/conf";
import { AntDesign } from "@expo/vector-icons";
import { Green, Red, lightblue } from "../../../components/helpers/StyleVars";
import xhtmlrequestBuilder from "../../../components/helpers/request";

const ExploreScreen = ({ uid }) => {
  const HeartIcon = <AntDesign name="heart" size={30}></AntDesign>;
  const CrossIcon = <AntDesign name="close" size={30}></AntDesign>;
  const Message = <AntDesign name="message1" size={20}></AntDesign>;
  const [uses, setUsers] = useState()
  const getUsers = ()=>{
    const xhr = new xhtmlrequestBuilder()
    xhr.to(ip).asType("GET").atRoute("/getProfileData/"+uid).onCompletion((resp)=>console.log(resp)).send()
  }
  const getPermissions = async () => {
    console.log("hello");
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant location permissions");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    const newLocation = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };
    setLocation(newLocation);
    console.log("hello there");
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.response);
      }
    };
    xhr.open("POST", ip + "updateLocation/", true);
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
    getUsers()
  }, [1]);
  const handleReaction = (reaction: "LIKE" | "DISLIKE" | "MESSAGE") => {
    switch (reaction) {
      case "LIKE":
        console.log("yay");
        break;
      case "DISLIKE":
        console.log("IMPLEMENT IN PROGRESS");
        break;
      case "MESSAGE":
        console.log("IMPLEMENTATION IN PROGRESS");
        break;
    }
  };

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => getPermissions()}
        style={[style.button, style.heart]}
      >
        <Text style={{ textAlign: "center" }}>{HeartIcon}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleReaction("MESSAGE")}
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
    flex: 1,
  },
  button: {
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
