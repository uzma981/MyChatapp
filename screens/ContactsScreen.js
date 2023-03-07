import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-web";

import globalStyle from "../components/global-style";

const ContactsScreen = (props) => {
  const SearchBar = () => {
    return (
      <View style={styles.searchcontainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here.."
        ></TextInput>
      </View>
    );
  };
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Contacts</Text>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate("Add Contact")}>
            <AntDesign name="adduser" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <SearchBar />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchcontainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#EFEBEB",
    borderRadius: 20,
    marginLeft: 5,
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
    alignItems: "flex-end",
    marginRight: 16,
    marginBottom: 10,
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingLeft: 8,
    fontSize: 16,
  },
});

export default ContactsScreen;
