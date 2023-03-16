import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import globalStyle from "../global-style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

const AddContact = (props) => {
  const [searchUser, setSearchUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [image, setImage] = useState(null);

  const searchUsers = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:3333/api/1.0.0/search?q=${searchText}`,
        {
          headers: {
            "X-Authorization": token,
          },
        }
      );
      setSearchUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
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

  const SearchBar = () => {
    return (
      <View style={styles.searchcontainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here.."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          autoFocus={true}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={searchUsers}>
          <View style={styles.btnContainer}>
            <Ionicons name="send" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const { navigation } = props;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={globalStyle.headerContainer}>
          <Text style={globalStyle.headerText}>Add Contact</Text>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
            <Ionicons name="arrow-back" size={20} color="black"></Ionicons>
          </TouchableOpacity>
        </View>

        <SearchBar />

        {
          <>
            {searchUser ? (
              searchUser.map((user) => (
                <View key={user.user_id}>
                  <View>
                    <TouchableOpacity>
                      <View style={styles.contactcontainer}>
                        <Image
                          source={{
                            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
                          }}
                          style={styles.image}
                        />
                        {/* {getUserProfilePhoto(user.user_id)} */}
                        {image && (
                          <Image
                            source={{ uri: image }}
                            style={styles.image}
                            resizeMode="cover"
                          ></Image>
                        )}
                        <View style={styles.content}>
                          <View style={styles.row}>
                            <Text numberOfLines={1} style={styles.name}>
                              {user.given_name} {user.family_name}
                            </Text>
                          </View>
                          <Text>Email: {user.email}</Text>
                        </View>
                        <View style={styles.icon}>
                          <TouchableOpacity
                            onPress={() => handleAddContact(user.user_id)}
                          >
                            <AntDesign name="adduser" size={24} color="black" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.icon}></View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text>No results found.</Text>
            )}
          </>
        }
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
    alignItems: "flex-row",
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
export default AddContact;
