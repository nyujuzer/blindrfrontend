import React, { useEffect, useRef, useState,  } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, Dimensions, StyleSheet, Platform } from "react-native"
import {ip, socketIp} from '../../../components/helpers/conf'
import { Button, TextInput } from "react-native-paper"
import { getValueOf } from "../../../components/helpers/app.loginHelper"
import { FlatList } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { BackgroundColor, theme } from "../../../components/helpers/StyleVars"
import { StackNavigationProp } from "@react-navigation/stack"



const {width, height} = Dimensions.get("window")
const MatchScreen = ()=>{
  const [users, setUsers] = useState<Array<TmessageUser>>()
  useEffect(()=>{
    fetchMatches()
  },[])
  const fetchMatches = async ()=>{
    try {
      const response =await fetch(`${ip}/getLikes/${await getValueOf("uid")}`)
      const json = await response.json()
      console.log(json["results"]);
      
      setUsers(json['results'] as TmessageUser[])
    } catch (error) {
      
    }
  }

  const nav = useNavigation<StackNavigationProp<RootStackParamList>>()
  return(
<SafeAreaView style={{backgroundColor:theme.primary, paddingTop:30}}>
  <FlatList data={users} 
    renderItem={(user)=>{
    console.log(user.item.profileName, ip+user.item.pfpurl)
    return(
    <View>
      <TouchableOpacity style={{width:width,
        display:"flex",
       flexDirection:"column"}}onPress={()=>{nav.navigate("chatScreen",{otherId:user.item.id, ephemeral:user.item.ephemeral})}}>
      <View style={styles.container}>
      <Image source={{uri:ip+user.item.pfpurl}} style={styles.image} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.item.profileName}</Text>
        <Text style={styles.description}>{user.item.lastText}</Text>
      </View>
    </View>
      </TouchableOpacity>
    </View>
    )
  } 
}/>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main:{
    backgroundColor:theme.primary,
    height: height
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    color:theme.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
export default MatchScreen