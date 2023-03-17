import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import globalStyle from "../global-style";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ContactItem({ contacts }) {
  const handleRemoveContact = async (user_id) => {
    const [contacts, setContacts] = useState([]);
    const token = await AsyncStorage.getItem("token");

    await axios
      .delete(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
        headers: {
          "X-Authorization": token,
        },
      })
      .then(function (response) {
        console.log(response);
        // Filter out the removed contact from the contacts array
        const updatedContacts = contacts.filter(
          (contact) => contact.user_id !== user_id
        );
        setContacts(updatedContacts);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
  const blockContact = async (user_id) => {
    const token = await AsyncStorage.getItem("token");
    await axios
      .post(`http://localhost:3333/api/1.0.0/user/${user_id}/block`, null, {
        headers: {
          "X-Authorization": token,
          "Content-Type": "image/png",
        },
      })
      .then(function (response) {
        console.log(response);
        const updatedContacts = contacts.filter(
          (contact) => contact.user_id !== user_id
        );
        // setContacts(updatedContacts);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
  return (
    <View style={globalStyle.singlecontainer}>
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
        }}
        style={styles.image}
      />
      <View style={globalStyle.singlecontainerContent}>
        <View style={globalStyle.singlecontainerRow}>
          <Text numberOfLines={1} style={styles.name}>
            {contacts.first_name} {contacts.last_name}
          </Text>
        </View>
        <Text>Email: {contacts.email}</Text>
      </View>

      <TouchableOpacity
        onPress={() => blockContact(contacts.user_id)}
        style={styles.btnContainer}
      >
        <Entypo name="block" size={20} color="black"></Entypo>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => handleRemoveContact(contacts.user_id)}
      >
        <Ionicons name="remove-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },

  name: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
  },
});
