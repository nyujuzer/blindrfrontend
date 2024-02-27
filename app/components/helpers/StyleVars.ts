import { Platform, StatusBar, StyleSheet } from "react-native";
import { useTheme, DefaultTheme } from "react-native-paper";

const global = StyleSheet.create({
    h1:{
        fontSize:40,
    },
    logo:{
        width:50,
        height:50
    }
})

/*possible colors:
  primary:"#222625"
  accent:"#bf1500"
  secondary:"#fefefe"

  primary:"#38244e",
  accent:"#f6473a",
  secondary:"#eaed9f",
  
  primary:"#2ddffc",
  accent:"#129ac1",
  secondary:"#031a2a",

  primary:"#201e3f",
  accent:"#f84356",
  secondary:"#ffffff",

  primary:"#27445e",
  accent:"#ea33b8",
  secondary:"#fbd8c8",

  primary:"#aef5f5",
  accent:"#e35649",
  secondary:"#203244",

*/

const theme ={
  primary:"#38244e",
  accent:"#f6473a",
  secondary:"#eaed9f",
}

const Green="#40ff00"
const Red="#ff4000"
const lightblue = "#00ffff"
const darkGray = "#424242"

const androidAreaStyle = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }})

export {theme, androidAreaStyle, global, lightblue, darkGray, Green, Red};
