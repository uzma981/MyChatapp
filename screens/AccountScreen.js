import React, { useState } from "react";
import {
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import globalStyle from "../components/global-style";
import Logout from "../components/Account/Logout";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";

const UpdateSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "First name must be at least 3 characters"),

  lastName: Yup.string().min(3, "Last name must be at least 3 characters"),

  email: Yup.string().email("Invalid email"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

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
    <SafeAreaView style={styles.container}>
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
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={UpdateSchema}
        onSubmit={handleUpdate}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <TextInput
              style={globalStyle.inputBox}
              placeholder="First Name"
              onChangeText={handleChange("firstName")}
              value={values.firstName}
            />
            {errors.firstName && (
              <Text style={{ color: "red" }}>{errors.firstName}</Text>
            )}
            <TextInput
              style={globalStyle.inputBox}
              placeholder="Last Name"
              onChangeText={handleChange("lastName")}
              value={values.lastName}
            />
            {errors.lastName && (
              <Text style={{ color: "red" }}>{errors.lastName}</Text>
            )}
            <TextInput
              style={globalStyle.inputBox}
              placeholder="Email"
              // keyboardType="email-address"
              onChangeText={handleChange("email")}
              value={values.email}
            />
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              style={globalStyle.inputBox}
              placeholder="Password"
              // keyboardType="visible-password"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry={true}
            />
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
            <TouchableOpacity
              title="Update"
              onPress={handleSubmit}
              style={[globalStyle.btn]}
            >
              <View style={{ padding: 10 }}>
                <Text style={globalStyle.btnText}>Update</Text>
              </View>
            </TouchableOpacity>
            <Logout></Logout>
            <TouchableOpacity
              onPress={() => navigation.navigate("View Blocked")}
            >
              <Text>View Blocked</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
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
