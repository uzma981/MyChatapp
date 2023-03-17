import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import globalStyle from "../global-style";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SearchUserItem({ user }) {
  const handleAddContact = async (user_id) => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .post(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, null, {
        headers: {
          "X-Authorization": token,
        },
      })
      .then(function (response) {
        console.log(response);
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
            {user.given_name} {user.family_name}
          </Text>
        </View>
        <Text>Email: {user.email}</Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => handleAddContact(user.user_id)}>
          <AntDesign name="adduser" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
