import React, { useEffect } from "react";
import { createStackNavigator, TransitionPreset } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screen/login/login";
import Home from "../screen/home/home";
import ProfileScreen from "../screen/home/profile/profile";
import { RegSite } from "../screen/register/register";
import Finish from "../screen/home/profile/signup/finish";
import Vidupload from "../screen/home/profile/uploadVideos";
import ChatScreen from "../screen/home/chat/ChatScreen";
// import * as Notifications from "expo-notifications";
const Stack = createStackNavigator();


const AppNavigator = () => {
    // useEffect(()=>{
    //     // registerPushNotifsAsync()
    // },[])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Register" component={RegSite}/>
                <Stack.Screen name="Finish" component={Finish}/>
                <Stack.Screen name="Vid" component={Vidupload}/>
                <Stack.Screen name="chatScreen" component={ChatScreen}/>
            </Stack.Navigator>
        </NavigationContainer>)
}

export default AppNavigator;



//DONE: add the register nav
//TODO: add the other profile nav
//TODO: add the matches nav
//TODO: add the chats nav
//DONE: add the specific chat nav
//TODO: add the settings navnp
