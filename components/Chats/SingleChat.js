import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import globalStyle from "../global-style";

export default function SingleChat(props) {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState(null);

  const [message, setMessage] = useState("");

  const chatId = props.route.params.chatId; // get chatId from route params

  const viewSingleChat = async (chat_id) => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .get(`http://localhost:3333/api/1.0.0/chat/` + chat_id, {
        headers: {
          "X-Authorization": token,
        },
      })
      .then(function (response) {
        console.log(response.data.messages);
        setChats(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
  const updateMessage = async (message_id) => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .patch(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message/${message_id}`,
        {
          message: message,
        },
        {
          headers: {
            "X-Authorization": token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        viewSingleChat(chatId); // refresh the chat messages
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
  const deleteMessage = async (chatId, message_id) => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .delete(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message/${message_id}`,

        {
          headers: {
            "X-Authorization": token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        viewSingleChat(chatId); // refresh the chat messages
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const sendMessage = async () => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .post(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message`,
        {
          message: message,
        },
        {
          headers: {
            "X-Authorization": token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setMessage(""); // clear the message box
        viewSingleChat(chatId); // refresh the chat messages
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      await viewSingleChat(chatId);
      const id = await AsyncStorage.getItem("id");
      setUserId(id);
    });
    return unsubscribe;
  }, []);

  const MessageBox = () => {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={styles.textInput}
            autoFocus={true}
          />
          <TouchableOpacity onPress={sendMessage}>
            <View style={styles.btnContainer}>
              <Ionicons name="send" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    const sentByUser = item.author.user_id == userId;
    return (
      <TouchableOpacity
        onLongPress={() => deleteMessage(chatId, item.message_id)}
      >
        <View
          style={[
            styles.messageContainer,
            sentByUser && styles.messageContainerSent,
          ]}
        >
          <Text style={styles.messageText}>
            {item.author.first_name}: {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const keyExtractor = (item) => {
    return item.message_id.toString();
  };

  const { navigation } = props;

  return (
    <View style={globalStyle.appcontainer}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}> {chats.name}</Text>
      </View>
      <View style={globalStyle.icon}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings", { chatId: chatId })}
        >
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={chats.messages}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        inverted={true}
      ></FlatList>

      <MessageBox />
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
  },
  container: {
    alignItems: "baseline",
    flexDirection: "row",
    margin: 10,
  },
  textInput: {
    width: "80%",
  },

  messageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#cecece",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    maxWidth: "70%",
  },

  messageContainerSent: {
    alignSelf: "flex-end",
    backgroundColor: "#fdaca5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    maxWidth: "70%",
  },

  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },

  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#EFEBEB",
    padding: 5,
    margin: 5,
    borderRadius: 30,
    marginRight: 10,
    flex: 1,
  },
  btnContainer: {
    backgroundColor: "#fb5b5a",
    borderRadius: 50,
    width: 50,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingLeft: 8,
    fontSize: 16,
  },
});
