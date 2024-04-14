import React, { useState, useEffect, useId } from "react";
import {Bubble, GiftedChat, InputToolbar, Message, MessageContainer, Send, } from "react-native-gifted-chat";
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
      var msgs = fetch(`${ip}/getMessages/${userId}/${otherId}`);
      setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, msgs)
      );
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
;
      fetch(`${ip}/sendMessage body:${userId, otherId, JSON.stringify(newMessages[0])}`);
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
