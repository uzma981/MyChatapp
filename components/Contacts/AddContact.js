import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import globalStyle from "../global-style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddContactSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "First name must be at least 3 characters"),

  lastName: Yup.string().min(3, "Last name must be at least 3 characters"),
  email: Yup.string().email("Invalid email"),
});
const AddContact = () => {
  const handleaddContact = async (values) => {
    const token = await AsyncStorage.getItem("token");

    const id = await AsyncStorage.getItem("id");

    const headers = {
      "X-Authorization": token,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `http://localhost:3333/api/1.0.0/user/${id}/contact`,

        {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
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
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
      }}
      validationSchema={AddContactSchema}
      onSubmit={handleaddContact}
    >
      {({
        handleChange,

        handleSubmit,
        values,
      }) => (
        <View style={globalStyle.welcomecontainer}>
          <TextInput
            style={globalStyle.inputBox}
            placeholder="First Name"
            onChangeText={handleChange("firstName")}
            // onBlur={handleBlur("firstName")}
            value={values.firstName}
          />
          <TextInput
            style={globalStyle.inputBox}
            placeholder="Last Name"
            onChangeText={handleChange("lastName")}
            // onBlur={handleBlur("firstName")}
            value={values.lastName}
          />
          <TextInput
            style={globalStyle.inputBox}
            placeholder="Email"
            onChangeText={handleChange("email")}
            // onBlur={handleBlur("firstName")}
            value={values.email}
          />
          <TouchableOpacity
            title="Add Contact"
            onPress={handleSubmit}
            style={globalStyle.btn}
          >
            <View style={{ padding: 10 }}>
              <Text style={globalStyle.btnText}>Add Contact</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default AddContact;
