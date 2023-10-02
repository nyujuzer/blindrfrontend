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
import { navProps } from "../../components/helpers/interfaces";

export const LoginScreen = (prop: navProps) => {
  useEffect(() => {
    getMultipleVals(["email", "pass"]).then((vals) => {
      console.log(vals);
      loginF(vals["email"], vals["pass"]);
    });
  }, []);
  const login = () => {
    prop.navigation.navigate("Home");
  };
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function loginF(email: any, Pass: any) {
    const request = new xhtmlrequestBuilder();
    request
      .to(ip)
      .atRoute("/login/" + email + "+" + Pass + "/")
      .asType("GET")
      .onCompletion((res) => {
        console.log(res);
        if (JSON.parse(res)["login"] === "successful") {
          registerIndieID(
            JSON.parse(res)["uid"],
            10776,
            "bMAL30KDs4RJB8RaFqimlb"
          ).catch((e) => console.log(e));
          save("uid", JSON.parse(res)["uid"]);
          save("email", email);
          save("pass", Pass);
          login();
        } else {
          alert("password or email is incorrect");
        }
      })
      .setHeaders({
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
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
        <EmailField onChangeText={(text) => setEmail(text)} />
        <PasswordField onChangeText={(text) => setPassword(text)} />
        <StyledButton text="Login" onPress={() => loginF(email, password)} />
        <TouchableOpacity
          style={loginStyles.createAccountLink}
          onPress={() => prop.navigation.navigate("Register")}
        >
          <Text style={loginStyles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
};
