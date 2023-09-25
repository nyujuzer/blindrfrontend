import {Dimensions, StyleSheet} from 'react-native'
import { ActionColor, BackgroundColor } from '../../../components/helpers/StyleVars';
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  videoThumbnail: {
    width: width/3.33, // Each video takes up 1/3 of the container width
    aspectRatio: 9 / 16, // Adjust the aspect ratio as needed
    margin: 5, // Adjust the margin as needed
  },
    container: {
      width:"100%",
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent:"center",
      justifyContent:"center",
    },
    videoItem: {
      aspectRatio:0.75/1.25,
      width:width/4,
      margin:3,
      height:height/3
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