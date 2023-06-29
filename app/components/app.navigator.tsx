import React from "react";
import { createStackNavigator, TransitionPreset } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screen/login/login";
import Home from "../screen/home/home";
import ProfileScreen from "../screen/home/profile/profile";
import { RegSite } from "../screen/register/register";
import Finish from "../screen/home/profile/signup/finish";
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={(({ headerShown: false }))} initialRouteName="Login">
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Register" component={RegSite}/>
                <Stack.Screen name="Finish" component={Finish}/>
            </Stack.Navigator>
        </NavigationContainer>)
}

export default AppNavigator;



//TODO: add the register nav
//TODO: add the other profile nav
//TODO: add the matches nav
//TODO: add the chats nav
//TODO: add the specific chat nav
//TODO: add the settings navnp