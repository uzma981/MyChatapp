import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import ChatItem from "../components/Chats/ChatItem";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import globalStyle from "../components/global-style";
const ChatsScreen = (props) => {
  const { navigation } = props;
  const [chats, setChats] = useState([]);

  const handleGetChat = async () => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .get(`http://localhost:3333/api/1.0.0/chat`, {
        headers: {
          "X-Authorization": token,
        },
      })
      .then(function (response) {
        console.log(response);
        setChats(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      handleGetChat();
    });
    return unsubscribe;
  }, []);
  return (
    <View style={globalStyle.appcontainer}>
      <ScrollView>
        <View style={globalStyle.headerContainer}>
          <Text style={globalStyle.headerText}>Chats</Text>
        </View>
        <View style={globalStyle.icon}>
          <TouchableOpacity onPress={() => navigation.navigate("New Chat")}>
            <Entypo name="new-message" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <>
          {chats.map((chat) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Single Chat", { chatId: chat.chat_id })
              }
              key={chat.chat_id}
              style={globalStyle.singlecontainer}
            >
              <Image
                source={{
                  uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
                }}
                style={styles.image}
              />
              <View style={globalStyle.singlecontainerContent}>
                <View style={globalStyle.singlecontainerRow}>
                  <Text style={styles.name}>{chat.name}</Text>
                  <Text style={styles.subTitle}>
                    Time:
                    {/* {chat.last_message.timestamp} */}
                  </Text>
                </View>
                <Text numberOfLines={2} style={styles.subTitle}>
                  {/* {chat.last_message.author.first_name}  */}
                  Name:Last message
                  {/* {chat.last_message.message} */}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },

  subTitle: {
    color: "gray",
  },
});

export default ChatsScreen;
