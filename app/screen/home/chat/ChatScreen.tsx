import React, { useState, useEffect, useId } from "react";
import {Bubble, GiftedChat, InputToolbar, Message, MessageContainer, Send, } from "react-native-gifted-chat";
import xhtmlrequestBuilder from "../../../components/helpers/request";
// import * as WebSocket from 'websocket';
import { getValueOf } from "../../../components/helpers/app.loginHelper";
import { ip} from "../../../components/helpers/conf";
import { View } from "react-native";
import {
theme
} from "../../../components/helpers/StyleVars";
import CustomInputToolbar from "../../../components/inputbar";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [inputText, setInputText] = useState("");

  // Getw otherId from navigation prop
  const otherId = route.params.otherId;

  useEffect(() => {
    getValueOf("uid").then((res) => {
      setUserId(res);
    });
    if (userId != null) {

      fetch(`${ip}/getMessages/${userId}/${otherId}/`)
      .then(res => res.json())
      .then((data) => {

        console.log(data);
        console.log("bingus");
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, messages)
        );
      });


      /*
      const xhr = new xhtmlrequestBuilder();
      xhr
        .to(ip)
        .asType("GET")
        .atRoute("/getMessages/" + userId + "/" + otherId + "/")
        .onCompletion((e) => {
          const message = JSON.parse(e).data;
          console.log(message);
          console.log("xd");

          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, message)
          );
        })
        .send();
        */
    }
  }, [userId]);

  const handleSend = (newMessages = []) => {
    if (newMessages.length > 0) {
      // const message = newMessages[0];
      // console.log(newMessages[0]);
      setInputText("")
      // socket.send(JSON.stringify(message));
      // Update the local state with the new message
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, newMessages)
      );

      fetch(`${ip}/sendMessage/`, {
        method:"POST", 
        body: {
          uid:userId, 
          otherId:otherId, 
          message:newMessages 
        }})
      
      /*
      const xhr = new xhtmlrequestBuilder();
      xhr.to(ip).asType("POST").atRoute("/sendMessage/").message({userID:userId, other:otherId, message:JSON.stringify(newMessages)})
      */
      console.log("lol");
    }
  };

  return (
    <View style={{flex:1, backgroundColor:theme.primary, paddingBottom:10}}>
      <GiftedChat
        renderInputToolbar={(props) => (
          <CustomInputToolbar
            {...props}
            text={inputText}
            onTextChanged={setInputText}
            onSend={() => {
              if (inputText.length > 0){
                handleSend([
                  {
                    _id:Date.now()+userId,
                    text: inputText,
                    createdAt: Date.now(),
                    user: { _id: userId },
                  },
                ]);
              }
            }}
          />
        )}
        renderMessage={(props) => {
          return (
            <View style={{ backgroundColor: theme.primary, padding: 10 }}>
              <Message {...props} />
            </View>
          );
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "black",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: theme.accent,
                },
                right: {
                  backgroundColor: theme.secondary,
                },
              }}
            />
          );
        }}
        messages={messages}
        onSend={handleSend}
        showUserAvatar={true}
        user={{
          _id: userId,
          avatar:
            "http://192.168.1.3:8000/media/img/8b421920-5d64-4ee7-b479-3d1d9bfc2dde.jpg",
        }}
      />
    </View>
    
  );
};

export default ChatScreen;
