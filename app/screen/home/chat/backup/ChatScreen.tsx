// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Linking,
// } from "react-native";
// import { socketIp } from "../../../components/helpers/conf";
// import { getValueOf } from "../../../components/helpers/app.loginHelper";
// import { FontAwesome } from "@expo/vector-icons";

// const ChatScreen = (otherId) => {
//   const [messages, setMessages] = useState<Array<any>>([]);
//   const [inputText, setInputText] = useState("");
//   const [oid, setoid] = useState(null)
//   const [socket, setSocket] = useState<WebSocket>(null);
//   const send = <FontAwesome name="paper-plane" size={30}/>
//   const setup = async () => {
//     setoid(otherId["route"]["params"]["otherId"]);
//     const newsocket = new WebSocket(
//       socketIp + "/ws/" + (await getValueOf("uid")) + "/" + otherId["route"]["params"]["otherId"] + "/"
//     );
//     console.log(await getValueOf("uid"))
//     newsocket.onopen = (e) => {
//       console.log("connect")
//     };
//     newsocket.onmessage = (e) => {
//       var data = JSON.parse(e.data);
//       console.log(data);
      
//       if ('messages' in data){
//         setMessages(data['messages']);
//       }
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { message: data.message, sender: data.sender_username },
//       ]);

//       // Avoid logging 'messages' immediately after calling setMessages
//       // Instead, you can log the updated state within a useEffect hook
//     };
//     setSocket(newsocket);
//   };
//   useEffect(() => {
//     setup();
//   }, []);
//   const sendMessage = () => {
//     socket.send(JSON.stringify({ message: inputText }));
//   };
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={(message) => {
//           return (
//             <View
//               style={
//                 message.item.sender !== oid
//                   ? styles.userMessage
//                   : styles.otherMessage
//               }
//             >
//               <Text style={styles.messageText}>{message.item.message}</Text>
//             </View>
//           );
//         }}
//         contentContainerStyle={styles.messageList}
//       />
//     <View style={{display:"flex", flexDirection:"row"}}>
//       <TextInput
//         style={styles.input}
//         placeholder="Type a message..."
//         value={inputText}
//         onChangeText={(text) => setInputText(text)}
//       />
//       <TouchableOpacity onPress={sendMessage}>
//         <Text >{send}</Text>
//       </TouchableOpacity>
//     </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 10,
//   },
//   messageList: {
//     flexGrow: 1,
//     justifyContent: "flex-end",
//   },
//   userMessage: {
//     alignSelf: "flex-end",
//     backgroundColor: "#007AFF",
//     borderRadius: 10,
//     padding: 8,
//     marginVertical: 4,
//     maxWidth: "70%",
//   },
//   otherMessage: {
//     alignSelf: "flex-start",
//     backgroundColor: "#E5E5EA",
//     borderRadius: 10,
//     padding: 8,
//     marginVertical: 4,
//     maxWidth: "70%",
//   },
//   messageText: {
//     color: "white",
//   },
//   input: {
//     flex:1,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 10,
//   },
// });

// export default ChatScreen;