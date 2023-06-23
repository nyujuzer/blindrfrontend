import React, { useEffect, } from "react";
import { useState } from "react";
import { Text,SafeAreaView, Image,  Alert } from 'react-native';
import { loginStyles } from "./loginStyle";
import { save, getValueOf, } from "../../components/helpers/app.loginHelper";
import { ip } from "../../components/helpers/conf";
import { StyledButton, PasswordField, EmailField } from "../../components/pre-styled/components";
import { Card } from "react-native-paper";
import xhtmlrequestBuilder from "../../components/helpers/request";



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
      loginF(email, password)
  }, [])
  const login = () => { prop.navigation.navigate("Home") }
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  function loginF(email: any, Pass: any) {
    const request = new xhtmlrequestBuilder()
    request.to(ip).atRoute("login/"+email+"+"+Pass+"/").asType("GET").onCompletion((res)=>{if (JSON.parse(res)['login'] === "successful"){login()}else{alert("password or email is incorrect")}}).setHeaders({"Content-Type":"application/json"}).send()
  }
  return (
    <SafeAreaView style={loginStyles.container}>
      <Card style={loginStyles.card}>
        <Image source={require("../../../img/knsz.png")} style={{height:150,width:150}}/>
        <EmailField onChangeText={(text)=>setEmail(text)} />
        <PasswordField onChangeText={(text)=>setPassword(text)} />
        <StyledButton text="Login" onPress={()=>loginF(email, password)} />
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



