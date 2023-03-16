import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Single Chat", { chatId: item.chat_id })
      }
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
          <Text style={styles.name}>{item.name}</Text>
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
  );

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
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <ChatItem chat={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.chat_id}
        />
      </ScrollView>
    </View>
  );
};

export default ChatsScreen;
