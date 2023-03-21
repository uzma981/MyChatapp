import React from "react";
import SearchUserItem from "../Shared/SearchUserItem";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import globalStyle from "../global-style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
export default function Settings(props) {
  const chatId = props.route.params.chatId;
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [userinChat, setuserinChat] = useState([]);
  const handleUpdateChat = async (chat_id) => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      "X-Authorization": token,
      "Content-Type": "application/json",
    };
    axios
      .patch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}`,

        {
          name: name,
        },
        {
          headers,
        }
      )

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

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
        const members = response.data.members;
        setuserinChat(members);
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
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          backgroundColor: "#EFEBEB",
          padding: 10,
          margin: 5,
          borderRadius: 30,
          marginRight: 10,
          // flex: 1,
        }}
      >
        <TextInput
          style={{
            width: "100%",
            textAlign: "center",
          }}
          placeholder="Update Conversation name:"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
          }}
          onPress={() => handleUpdateChat(chatId)}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
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
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fdaca5",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 14 }}>Add User to Chat</Text>
      </View>

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
