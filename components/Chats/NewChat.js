import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import globalStyle from "../global-style";

export default function NewChat(props) {
  const { navigation } = props;
  const [name, setname] = useState("");

  //api call - Start a new conversation POST :/chat
  const addChat = async () => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      "X-Authorization": token,
      "Content-Type": "application/json",
    };
    axios
      .post(
        `http://localhost:3333/api/1.0.0/chat`,

        {
          name: name,
        },
        {
          headers,
        }
      )

      .then(function (response) {
        if (response.status == 201) {
          navigation.navigate("Single Chat");
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add New Chat</Text>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Ionicons name="arrow-back" size={20} color="black"></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.convoContainer}>
          <TextInput
            style={styles.textContainer}
            placeholder="Start a new conversation..."
            onChangeText={(text) => {
              setname(text);
            }}
            value={name}
          ></TextInput>
          <TouchableOpacity
            title="Create"
            onPress={() => {
              addChat();
            }}
            style={globalStyle.btn}
          >
            <View style={{ padding: 10 }}>
              <Text style={globalStyle.btnText}>Create</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
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
    alignItems: "flex-start",
    marginRight: 16,
    marginBottom: 10,
    marginLeft: 8,
  },
  convoContainer: {
    justifyContent: "center",

    padding: 20,
    marginTop: 20,
  },
  textContainer: {
    height: 40,
    justifyContent: "center",
  },
});
