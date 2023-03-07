import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";

export default function SingleChat(props) {
  const InputBox = () => {
    return (
      <View styles={styles.container}>
        <View style={styles.mainContainer}>
          <TextInput style={styles.textInput}></TextInput>
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
    <View style={styles.main}>
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => navigation.navigate("Add User")}>
          <AntDesign name="adduser" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <InputBox />
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
  icon: {
    alignItems: "flex-end",
    marginRight: 16,
    marginBottom: 10,
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
