import React from "react";
import SearchUserItem from "../Shared/SearchUserItem";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import globalStyle from "../global-style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
export default function AddUsertoChatScreen(props) {
  const chatId = props.route.params.chatId;
  const [contacts, setContacts] = useState([]);
  const [userinChat, setuserinChat] = useState([]);

  const handleAddUserToChat = async (chat_id, user_id) => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .post(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}/user/${user_id}`,
        null,
        {
          headers: {
            "X-Authorization": token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
  const handleRemoveUserFromChat = async (chat_id, user_id) => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .delete(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}/user/${user_id}`,

        {
          headers: {
            "X-Authorization": token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        const updatedUsersinchat = userinChat.filter(
          (user) => user.user_id !== user_id
        );
        setuserinChat(updatedUsersinchat);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
  const handleGetContact = async () => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .get(`http://localhost:3333/api/1.0.0/contacts`, {
        headers: {
          "X-Authorization": token,
        },
      })
      .then(function (response) {
        console.log(response);
        setContacts(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      handleGetContact();
      viewDetails(chatId);
    });
    return unsubscribe;
  }, []);

  const viewDetails = async (chat_id) => {
    const token = await AsyncStorage.getItem("token");
    await axios
      .get(`http://localhost:3333/api/1.0.0/chat/` + chat_id, {
        headers: {
          "X-Authorization": token,
        },
      })
      .then(function (response) {
        console.log(response);
        setuserinChat(response.data.members);
        console.log(response.data.members);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    <View style={globalStyle.appcontainer}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}>Chats</Text>
      </View>
      <FlatList
        data={userinChat}
        keyExtractor={(member) => member.user_id}
        renderItem={({ item: member }) => (
          <View style={globalStyle.singlecontainer}>
            <View style={globalStyle.singlecontainerContent}>
              <View style={globalStyle.singlecontainerRow}>
                <Text style={styles.name}>
                  {member.first_name} {member.last_name}
                </Text>
              </View>
              <Text>{member.email}</Text>
            </View>
            <View style={styles.icon}>
              <TouchableOpacity
                onPress={() => handleRemoveUserFromChat(chatId, member.user_id)}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      ></FlatList>
      <Text>Add User to Chat:</Text>
      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.user_id}
        renderItem={({ item: contact }) => (
          <View style={globalStyle.singlecontainer}>
            <View style={globalStyle.singlecontainerContent}>
              <View style={globalStyle.singlecontainerRow}>
                <Text style={styles.name}>
                  {contact.first_name} {contact.last_name}
                </Text>
              </View>
              <Text>{contact.email}</Text>
            </View>
            <View style={styles.icon}>
              <TouchableOpacity
                onPress={() => handleAddUserToChat(chatId, contact.user_id)}
              >
                <AntDesign name="adduser" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  name: {
    flex: 1,
    fontWeight: "bold",
  },
});
