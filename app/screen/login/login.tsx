import React, {useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { loginStyles } from "./loginStyle";
import {
  save,
  getValueOf,
  getMultipleVals,
} from "../../components/helpers/app.loginHelper";
import { ip } from "../../components/helpers/conf";

import { Card, useTheme } from "react-native-paper";
import xhtmlrequestBuilder from "../../components/helpers/request";
import EmailField from "../../components/emailfield";
import PasswordField from "../../components/passwordfield";
import StyledButton from "../../components/styledbutton";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";



export const LoginScreen = () => {
  const theme = useTheme()
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    getMultipleVals(["email", "pass"]).then((vals) => {
      console.log(vals);
      loginF(vals["email"], vals["pass"]);
    });
  }, []);

  const login = () => {
    nav.navigate("Home")
  };
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function loginF(email: string, pass: string) {
      const url = `${ip}/login/`;
      const formdata = new FormData();
      formdata.append("email",email);
      formdata.append("password",pass);
      const response = await fetch(url, {
        method: 'POST',
        body:formdata
      });
      // console.log(response.status);
      const text = await response.text()
      console.log(text);
      
      const json = JSON.parse(text);
      if (json.login === 'successful'){
          save('uid', json.uid);
          console.log("uid", json.uid)
          save('email', email);
          save('pass', pass);
          login();
          } else if (json.login !== 'successful' && email !== null && pass !== null) {
            alert('password or email is incorrect');
          }
      }

  return (
    <SafeAreaView style={loginStyles.container}>
      <Card style={loginStyles.card}>
        <View style={loginStyles.logoContainer}>
          <Image
            source={require("../../../img/ClipCrush2.png")}
          />
        </View>
        <EmailField onChangeText={(text: string) => setEmail(text)} />
        <PasswordField onChangeText={(text: string) => setPassword(text)} />
        <StyledButton text="Login" onPress={() => loginF(email, password)} />
        <TouchableOpacity
          style={loginStyles.createAccountLink}
          onPress={() => nav.navigate("Register")}
        >
          <Text style={loginStyles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
};