import React, { useEffect, } from "react";
import { useState } from "react";
import { Text,SafeAreaView, Image,  Alert } from 'react-native';
import { loginStyles } from "./loginStyle";
import { save, getValueOf, } from "../../components/helpers/app.loginHelper";
import { ip } from "../../components/helpers/conf";
import { StyledButton, PasswordField, EmailField } from "../../components/pre-styled/components";
import { Card } from "react-native-paper";



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
    const xhtml = new XMLHttpRequest()
    xhtml.onreadystatechange = function () {

      if (this.readyState == 4) {

        var response;
        try {
          response = JSON.parse(this.responseText)
        }catch{
          response = JSON.parse("{login:unsuccessful}")
        }
        if (response['login'] === "successful") {          
          console.log(email, password)
          save("email", email)
          save("pass", password)
          console.log(response['uid']+'response')
          save("uid", response['uid'])
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



