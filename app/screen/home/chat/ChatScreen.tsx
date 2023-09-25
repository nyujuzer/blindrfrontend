import React, { useState, useEffect, useId } from "react";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Message,
  MessageContainer,
  Send,
} from "react-native-gifted-chat";
// import * as WebSocket from 'websocket';
import { getValueOf } from "../../../components/helpers/app.loginHelper";
import { ip, socketIp } from "../../../components/helpers/conf";
import xhtmlrequestBuilder from "../../../components/helpers/request";
import { View } from "react-native";
import {
  ActionColor,
  BackgroundColor,
  lightGray,
} from "../../../components/helpers/StyleVars";
import CustomInputToolbar from "../../../components/inputbar";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [inputText, setInputText] = useState("");

  // Getw otherId from navigation prop
  const otherId = route.params.otherId;
  useEffect(() => {
    getValueOf("uid").then((res) => {
      setUserId(res);
    });
    console.log(socketIp)
    if (userId != null) {
      var sock = new WebSocket(`${socketIp}/ws/${userId}/${otherId}/`);
      sock.onopen = () => {
        const xhr = new xhtmlrequestBuilder();
        xhr
          .to(ip)
          .asType("GET")
          .atRoute("/getMessages/" + userId + "/" + otherId + "/")
          .onCompletion((e) => {
            const message = JSON.parse(e).data;
            console.log(message);

            setMessages((prevMessages) =>
              GiftedChat.append(prevMessages, message)
            );
          })
          .send();
      };
      sock.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.message.user._id !== userId) {
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, message.message)
          );
        }
      };
      sock.onclose = (e) => {
        console.log("closed");
      };

      setSocket(sock);
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
      socket.send(JSON.stringify(newMessages[0]));
    }
  };

  return (
    <View style={{flex:1, backgroundColor:BackgroundColor, paddingBottom:10}}>
      <GiftedChat
        renderInputToolbar={(props) => (
          <CustomInputToolbar
            {...props}
            text={inputText}
            onTextChanged={setInputText}
            onSend={() => {
              handleSend([
                {
                  text: inputText,
                  createdAt: Date.now(),
                  user: { _id: userId },
                },
              ]);
            }}
          />
        )}
        renderMessage={(props) => {
          return (
            <View style={{ backgroundColor: BackgroundColor, padding: 10 }}>
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
                  backgroundColor: lightGray,
                },
                right: {
                  backgroundColor: ActionColor,
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
