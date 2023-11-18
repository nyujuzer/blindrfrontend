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

import { Card } from "react-native-paper";
import xhtmlrequestBuilder from "../../components/helpers/request";
import EmailField from "../../components/emailfield";
import PasswordField from "../../components/passwordfield";
import StyledButton from "../../components/styledbutton";
import { registerIndieID } from "native-notify";
import { LoginScreenNavProps, navProps } from "../../components/helpers/interfaces";



export const LoginScreen: React.FC<navProps> = (props:navProps) => {
  useEffect(() => {
    getMultipleVals(["email", "pass"]).then((vals) => {
      console.log(vals);
      loginF(vals["email"], vals["pass"]);
    });
  }, []);

  const login = () => {
    props.navigation.navigate("Home");
  };
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function loginF(email: string, Pass: string) {
    const url = `${ip}/login/${email}+${Pass}/`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(LoginData => {
        console.log(LoginData);
        if (LoginData.login === 'successful') {
          registerIndieID(LoginData.uid, 10776, 'bMAL30KDs4RJB8RaFqimlb')
            .catch(e => console.log(e));
          save('uid', LoginData.uid);
          save('email', email);
          save('pass', Pass);
          login();
        } else {
          alert('password or email is incorrect');
        }
      })
      .setHeaders({
        "Content-Type": "application/json",
      })
      .send();
  }

  return (
    <SafeAreaView style={loginStyles.container}>
      <Card style={loginStyles.card}>
        <View style={loginStyles.logoContainer}>
          <Image
            source={require("../../../img/knsz.png")}
            style={loginStyles.logo}
          />
        </View>
        <EmailField onChangeText={(text: string) => setEmail(text)} />
        <PasswordField onChangeText={(text: string) => setPassword(text)} />
        <StyledButton text="Login" onPress={() => loginF(email, password)} />
        <TouchableOpacity
          style={loginStyles.createAccountLink}
          onPress={() => props.navigation.navigate("Register")}
        >
          <Text style={loginStyles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
};