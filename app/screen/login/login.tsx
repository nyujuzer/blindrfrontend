import React, { useEffect } from "react";
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Alert } from 'react-native';
import { loginStyles } from "./loginStyle";
import { saveLogin, readStorage } from "../../components/helpers/app.loginHelper";
import { ip } from "../../components/helpers/conf";
import { StyledButton, PasswordField, EmailField } from "../../components/pre-styled/components";
import { Card } from "react-native-paper";
import { global } from "../../components/helpers/StyleVars";


interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen = (prop: LoginScreenProps) => {
  useEffect(() => {
    readStorage("email").then((result: any) => {
      setName(result);
      console.log(result); // Display the retrieved email value
    }).catch((err) => {
      Alert.alert("Something went wrong while retrieving email");
    });
    
    readStorage("pass").then((result: any) => {
      setPass(result);
      console.log(result); // Display the retrieved password value
    }).catch((err) => {
      Alert.alert("Something went wrong while retrieving password");
    });
    
  }, [])
  const login = () => { prop.navigation.navigate("Home") }
  const [password, setPass] = useState('')
  const [name, setName] = useState('')

  function loginF(Name: any, Pass: any) {
    const xhtml = new XMLHttpRequest()
    xhtml.onreadystatechange = function () {

      if (this.readyState == 4) {


        if (JSON.parse(this.responseText)['login'] === "successful") {
          saveLogin("email", name)
          saveLogin("pass", password)
          readStorage("pass")
          login()
        } else {
          alert("Password or email incorrect")
        }
      }

    }
    if (Name !== null && Pass !== null) {
      xhtml.open("GET", ip + "/login/" + Name.trim() + "+" + Pass.trim() + "/")
      xhtml.send()
    }
  }
  return (
    <View style={loginStyles.OuterContainer}>
      <Card style={loginStyles.card}>
        <View style={loginStyles.container}>
          <Image source={require('../../../img/knsz.png')} style={loginStyles.thumbnail}></Image>

          <Text style={[loginStyles.header, global.h1]}>Login</Text>
          <EmailField onChangeText={(text: string) => setName(text)}></EmailField>
          <PasswordField onChangeText={(newPass: string) => { setPass(newPass); }}></PasswordField>
          <View style={loginStyles.test}>
            <StyledButton text={"Login"} onPress={() => { loginF(name, password) }}></StyledButton>
            <StyledButton text={"Register"} onPress={() => { prop.navigation.navigate("Register") }}></StyledButton>
          </View>
        </View>
      </Card>


      <StatusBar style="auto" />
    </View>
  );
}

