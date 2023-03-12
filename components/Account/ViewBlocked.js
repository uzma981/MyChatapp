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

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { useState, useEffect } from "react";

export default function ViewBlocked(props) {
  const [contacts, setContacts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { navigation } = props;

  const viewBlockedContact = async () => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .get(`http://localhost:3333/api/1.0.0/blocked`, {
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
      viewBlockedContact();
    });
    return unsubscribe;
  }, []);

  const removeBlockedContact = async (user_id) => {
    const token = await AsyncStorage.getItem("token");

    await axios
      .delete(`http://localhost:3333/api/1.0.0/user/${user_id}/block`, {
        headers: {
          "X-Authorization": token,
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
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Blocked</Text>
        </View>
        <>
          {contacts.map((contact) => (
            <View key={contact.user_id} style={styles.contactcontainer}>
              <View style={styles.content}>
                <View style={styles.row}>
                  <Text style={styles.name}>
                    {contact.first_name} {contact.last_name}
                  </Text>

                  <TouchableOpacity
                    onPress={() => removeBlockedContact(contact.user_id)}
                    style={styles.btnContainer}
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
      </ScrollView>
    </View>
  );
}
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
