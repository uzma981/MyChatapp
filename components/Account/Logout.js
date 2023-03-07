import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
export default function Logout() {
  const handleLogout = async () => {
    const sessionToken = await AsyncStorage.getItem("token");

    axios
      .post("http://localhost:3333/api/1.0.0/logout", null, {
        headers: { "X-Authorization": sessionToken },
      })
      .then(async (response) => {
        if (response.status == 200) {
          const r = await AsyncStorage.removeItem("token");
          console.log(response);
          await AsyncStorage.removeItem("id");
          navigation.navigate("Login");
        } else if (response.status == 401) {
          console.log("401 error, unauthorised");
        } else if (response.status == 500) {
          console.log("500 error, server error");
          setDisplayMessage(
            "Something is wrong from our side, please try again later!"
          );
        }
      });
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signupText: {
    textAlign: "center",
    color: "black",
  },
  btnDisabled: {
    backgroundColor: "gray",
    opacity: 0.5,
    height: 40,
    width: "80%",
    marginBottom: 5,
    marginTop: 20,
    borderRadius: 40,
  },
});
