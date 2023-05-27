import React, { useEffect, } from "react";
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text,SafeAreaView, Image, View,  Alert } from 'react-native';
import { loginStyles } from "./loginStyle";
import { save, getValueOf } from "../../components/helpers/app.loginHelper";
import { ip } from "../../components/helpers/conf";
import { StyledButton, PasswordField, EmailField } from "../../components/pre-styled/components";
import { Card } from "react-native-paper";
import { SecondaryColor, global, secondaryBg } from "../../components/helpers/StyleVars";
import { darkColor } from "../../components/helpers/StyleVars";
import { BackgroundColor } from "../../components/helpers/StyleVars";


interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen = (prop: LoginScreenProps) => {
  useEffect(() => {
    getValueOf("email").then((result: any) => {
      setEmail(result);
      console.log(result); // Display the retrieved email value
    }).catch((err) => {
      Alert.alert("Something went wrong while retrieving email");
    });
    
    getValueOf("pass").then((result: any) => {
      setPassword(result);
      console.log(result); // Display the retrieved password value
    }).catch((err) => {
      Alert.alert("Something went wrong while retrieving password");
    });
    if (email != '' && password != ''){
      loginF(email, password)
    }
  }, [])
  const login = () => { prop.navigation.navigate("Home") }
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  function loginF(email: any, Pass: any) {
    const xhtml = new XMLHttpRequest()
    xhtml.onreadystatechange = function () {

      if (this.readyState == 4) {


        if (JSON.parse(this.responseText)['login'] === "successful") {
          console.log(email, password)
          save("email", email)
          save("pass", password)
          login()
        } else {
          alert("Password or email incorrect")
        }
      }

    }
    if (email !== null && Pass !== null) {
      xhtml.open("GET", ip + "/login/" + email.trim() + "+" + Pass.trim() + "/")
      xhtml.send()
    }
  }
  return (
    <SafeAreaView style={loginStyles.container}>
      <Card style={loginStyles.card}>
        <Image source={require("../../../img/knsz.png")} style={{height:150,width:150}}/>
        <EmailField onChangeText={setEmail} />
        <PasswordField onChangeText={setPassword} />
        <StyledButton text="Login" onPress={loginF(email, password)} />
        <Text style={loginStyles.createAccountText}>
          Don't have an account?{' '}
          <Text style={loginStyles.createAccountLink} onPress={()=>prop.navigation.navigate("Register")}>
            Create one
          </Text>
        </Text>
      </Card>
    </SafeAreaView>
  );
};



