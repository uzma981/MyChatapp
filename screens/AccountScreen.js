import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import UpdateForm from "../components/Form/UpdateForm";

const AccountScreen = (props) => {
  const [image, setImage] = useState(null);

  const { navigation } = props;

  const upload = async () => {
    const id = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");

    await axios
      .get("http://localhost:3333/api/1.0.0/user/" + id + "/photo", {
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
  //add a useeffect for the image

  // const uploadImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //     base64: false,
  //     exif: true,
  //onPictureSaved: (data) => sendToServer(data),
  //   });

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const handleUpdate = async (values) => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    const headers = {
      "X-Authorization": token,
      "Content-Type": "application/json",
    };
    axios
      .patch(
        `http://localhost:3333/api/1.0.0/user/${id}`,

        {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
        },
        {
          headers,
        }
      )

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          )}
        </View>

        <TouchableOpacity onPress={() => upload()}>
          <View style={styles.add}>
            <Ionicons
              name="add-outline"
              size={48}
              color="gray"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </View>
        </TouchableOpacity>
      </View>
      <UpdateForm
        handleUpdate={handleUpdate}
        navigation={navigation}
      ></UpdateForm>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderColor: "black",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderColor: "black",
  },
  dm: {
    backgroundColor: "gray",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AccountScreen;
