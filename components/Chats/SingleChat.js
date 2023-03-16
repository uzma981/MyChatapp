import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import globalStyle from "../global-style";

export default function SingleChat(props) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const route = useRoute();
  const { chatId } = route.params;

  const viewSingleChat = async (chat_id) => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .get(`http://localhost:3333/api/1.0.0/chat/` + chat_id, {
        headers: {
          "X-Authorization": token,
        },
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        setChats(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      viewSingleChat(chatId);
    });
    return unsubscribe;
  }, []);
  const MessageBox = () => {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TextInput
            onChangeText={(text) => setMessage(text)}
            style={styles.textInput}
          ></TextInput>
          <TouchableOpacity>
            <View style={styles.btnContainer}>
              <Ionicons name="send" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const { navigation } = props;
  return (
    <View style={globalStyle.appcontainer}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}> {chats.name}</Text>
      </View>
      <View style={globalStyle.icon}>
        <TouchableOpacity onPress={() => navigation.navigate("Add User")}>
          <AntDesign name="adduser" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <MessageBox />
      {/* <Text>Message: {message}</Text> */}
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
    flex: 1,
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
