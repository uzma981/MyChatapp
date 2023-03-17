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

export default function AddUsertoChatScreen(props, { chat_id }) {
  const { navigation } = props;
  const [contacts, setContacts] = useState([]);
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
    });
    return unsubscribe;
  }, []);

  return (
    <View style={globalStyle.appcontainer}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}>Chats</Text>
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
                onPress={() => handleAddUserToChat(chat_id, contact)}
              >
                <AntDesign name="adduser" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* <>
        {contacts.map((contact) => (
          <View key={contact.user_id} style={globalStyle.singlecontainer}>
            <View style={globalStyle.singlecontainerContent}>
              <View style={globalStyle.singlecontainerRow}>
                <Text style={styles.name}>
                  {contact.first_name} {contact.last_name}
                </Text>
              </View>
              <Text>{contact.email}</Text>
            </View>
          </View>
        ))}
      </> */}
    </View>
  );
}
const styles = StyleSheet.create({
  name: {
    flex: 1,
    fontWeight: "bold",
  },
});
