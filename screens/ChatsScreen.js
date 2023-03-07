import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-web";
import ChatItem from "../components/Chats/ChatItem";
import { Entypo } from "@expo/vector-icons";

const ChatsScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Chats</Text>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate("New Chat")}>
            <Entypo name="new-message" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  headerText: {
    fontSize: 20,
  },
  headerContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    alignItems: "flex-end",
    marginRight: 16,
    marginBottom: 10,
  },
});

export default ChatsScreen;
