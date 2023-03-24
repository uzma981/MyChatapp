import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import globalStyle from "../global-style";
export default function ChatItem({ chat, navigation }) {
  const handleChatPress = () => {
    navigation.navigate("Single Chat", { chatId: chat.chat_id });
  };
  const formatDate = (timestamp) => {
    return moment(timestamp).format("hh:mm A");
  };
  return (
    <TouchableOpacity
      onPress={handleChatPress}
      style={globalStyle.singlecontainer}
    >
      <View style={globalStyle.singlecontainerContent}>
        <View style={globalStyle.singlecontainerRow}>
          <Text style={styles.name}>{chat.name}</Text>
          <Text style={styles.subTitle}>
            {formatDate(chat.last_message.timestamp)}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.subTitle}>
          {chat.last_message.author.first_name}: {chat.last_message.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
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
