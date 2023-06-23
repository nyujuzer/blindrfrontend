import React from "react";
import { createStackNavigator, TransitionPreset } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screen/login/login";
import Home from "../screen/home/home";
import ProfileScreen from "../screen/home/profile/profile";
import { RegSite } from "../screen/register/register";
import TestPage from "../screen/tests/test";

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={(({ headerShown: false }))} initialRouteName="Login">
                <Screen name="Login" component={LoginScreen}></Screen>
                <Screen name="Home" component={Home}></Screen>
                <Screen name="Profile" component={ProfileScreen}></Screen>
                <Screen name="Register" component={RegSite}></Screen>
                <Screen name="Test" component={TestPage}></Screen>
            </Navigator>
        </NavigationContainer>)
}

export default AppNavigator;



//TODO: add the register nav
//TODO: add the other profile nav
//TODO: add the matches nav
//TODO: add the chats nav
//TODO: add the specific chat nav
//TODO: add the settings navnp