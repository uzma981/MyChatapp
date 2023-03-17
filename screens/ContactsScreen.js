import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyle from "../components/global-style";
import axios from "axios";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ContactsScreen = (props) => {
  const [contacts, setContacts] = useState([]);
  const [loaded, setLoaded] = useState(false);
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
        setLoaded(true);
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

  const handleRemoveContact = async (user_id) => {
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
  const getUserProfilePhoto = async (user_id) => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .get("http://localhost:3333/api/1.0.0/user/" + user_id + "/photo", {
        headers: {
          "X-Authorization": token,
          "Content-Type": "image/png",
        },
        responseType: "blob",
      })
      .then(function (response) {
        console.log(response);
        const url = URL.createObjectURL(response.data);
        console.log(url);
        setImage(url);
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
        setContacts(updatedContacts);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={globalStyle.headerContainer}>
          <Text style={globalStyle.headerText}>Contacts</Text>
        </View>
        <View style={globalStyle.icon}>
          <TouchableOpacity onPress={() => navigation.navigate("Add Contact")}>
            <AntDesign name="adduser" size={24} color="black"></AntDesign>
          </TouchableOpacity>
        </View>
        {loaded && (
          <>
            {contacts.map((contact) => (
              <View key={contact.user_id} style={globalStyle.singlecontainer}>
                <View style={globalStyle.singlecontainerContent}>
                  <View style={globalStyle.singlecontainerRow}>
                    <Text style={styles.name}>
                      {contact.first_name} {contact.last_name}
                    </Text>

                    <TouchableOpacity
                      onPress={() => blockContact(contact.user_id)}
                      style={styles.btnContainer}
                    >
                      <Entypo name="block" size={20} color="black"></Entypo>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnContainer}
                      onPress={() => handleRemoveContact(contact.user_id)}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text>{contact.email}</Text>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    flex: 1,
    fontWeight: "bold",
  },

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
    flexDirection: "row",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginRight: 10,
  },

  searchInput: {
    width: "100%",
    height: "100%",
    paddingLeft: 8,
    fontSize: 16,
  },
});

export default ContactsScreen;
