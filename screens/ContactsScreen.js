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

  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Contacts</Text>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate("Add Contact")}>
            <AntDesign name="adduser" size={20} color="black"></AntDesign>
          </TouchableOpacity>
        </View>
        {loaded && (
          <>
            {contacts.map((contact) => (
              <View key={contact.user_id} style={styles.contactcontainer}>
                <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate("Profile", { user_id: contact.id })
                // }
                >
                  {/* <Image style={styles.image} source={{ uri: contact.photo_url }} /> */}
                </TouchableOpacity>
                <View style={styles.content}>
                  <View style={styles.row}>
                    <Text style={styles.name}>
                      {contact.first_name} {contact.last_name}
                    </Text>
                    <TouchableOpacity
                      style={styles.btnContainer}
                      // onPress={() =>
                      //   navigation.navigate("Chat", { user_id: contact.id })
                      // }
                    >
                      <Ionicons
                        name="chatbubble-ellipses-outline"
                        size={20}
                        color="white"
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
  contactcontainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    marginTop: 10,
  },
  content: {
    flex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
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
  headerText: {
    fontSize: 20,
  },
  headerContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  btnContainer: {
    backgroundColor: "#fb5b5a",
    borderRadius: 50,
    width: 50,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginRight: 10,
  },
  icon: {
    alignItems: "flex-end",
    marginRight: 8,
    marginBottom: 10,
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingLeft: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
});

export default ContactsScreen;
