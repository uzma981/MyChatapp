import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ChatItem from "../components/Chats/ChatItem";
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
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}>Chats</Text>
      </View>
      <View style={globalStyle.icon}>
        <TouchableOpacity onPress={() => navigation.navigate("New Chat")}>
          <Entypo name="new-message" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ChatItem chat={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.chat_id}
      />
    </View>
  );
};

export default ChatsScreen;
