import {Dimensions, StyleSheet} from 'react-native'
import { ActionColor, BackgroundColor } from '../../../components/helpers/StyleVars';
const {width} = Dimensions.get("screen");
const styles = StyleSheet.create({
  videoThumbnail: {
    height:width/3-5,
    widthr:width/3-5,
    margin: 5,
    resizeMode: 'cover', // Adjust the resizeMode as needed
  },
    container: {
        backgroundColor:BackgroundColor,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    profileImage: {
      width: 100,
      alignSelf:"center",
      height: 100,
      borderRadius: 100,
      marginBottom: 16,
    },
    title: {
        color:"white",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign:"center"
    },
    subtitle: {
        color:"white",
      fontSize: 18,
      fontWeight: "bold",
      textAlign:"center",
      marginBottom: 8,
    },
    videoContainer: {
      marginBottom: 8,
    },
    videoTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    videoDescription: {
      fontSize: 14,
      color: "#888",
    },
    add: {
      backgroundColor: ActionColor,
  
    },
    button: {
      bottom:0,
      borderRadius: 100,
      position: "absolute",
      width: 50,
      justifyContent: "center",
      height: 50,
      margin: 30,
      alignContent: "center",
    },
  });
  
  export default styles