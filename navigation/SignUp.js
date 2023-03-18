import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";

import globalStyle from "../components/global-style";
import axios from "axios";
import { SignUpSchema } from "../components/Form/Validation/validationschema";
import SignUpForm from "../components/Form/SignUpForm";
export default function SignUp(props) {
  const { navigation } = props;
  const handleSignup = (values) => {
    axios
      .post("http://localhost:3333/api/1.0.0/user", {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
      })

      .then(function (response) {
        console.log(response);
        navigation.navigate("Login");
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return <SignUpForm handleSignup={handleSignup} navigation={navigation} />;
}

const styles = StyleSheet.create({
  btnDisabled: {
    backgroundColor: "gray",
    opacity: 0.5,
    height: 40,
    width: "80%",
    marginBottom: 5,
    marginTop: 20,
    borderRadius: 40,
  },
});
