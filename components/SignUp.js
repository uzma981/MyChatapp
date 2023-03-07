import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import globalStyle from "./global-style";
import axios from "axios";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .required("Please enter first name"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .required("Please enter last name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter an email address"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Please enter a password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function SignUp(props) {
  const { navigation } = props;
  const handleLogin = (values) => {
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

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={globalStyle.welcomecontainer}>
          <TextInput
            style={globalStyle.inputBox}
            placeholder="First Name"
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            value={values.firstName}
          />
          {errors.firstName && touched.firstName && (
            <Text style={{ color: "red" }}>{errors.firstName}</Text>
          )}
          <TextInput
            style={globalStyle.inputBox}
            placeholder="Last Name"
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={values.lastName}
          />
          {errors.lastName && touched.lastName && (
            <Text style={{ color: "red" }}>{errors.lastName}</Text>
          )}
          <TextInput
            style={globalStyle.inputBox}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />

          {errors.email && touched.email && (
            <Text style={{ color: "red" }}>{errors.email}</Text>
          )}
          <TextInput
            style={globalStyle.inputBox}
            placeholder="Password"
            keyboardType="visible-password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry={true}
          />
          {errors.password && touched.password && (
            <Text style={{ color: "red" }}>{errors.password}</Text>
          )}
          <TextInput
            style={globalStyle.inputBox}
            placeholder="Confirm Password"
            keyboardType="visible-password"
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            secureTextEntry={true}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
          )}
          <TouchableOpacity
            title="Sign Up"
            onPress={handleSubmit}
            style={[
              globalStyle.btn,
              (errors.password || errors.confirmPassword || errors.email) &&
                styles.btnDisabled,
            ]}
            disabled={errors.email && errors.password && errors.confirmPassword}
          >
            <View style={{ padding: 10 }}>
              <Text style={globalStyle.btnText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            title="LoginText"
            onPress={() => navigation.navigate("Login")}
            style={{ marginBottom: 10 }}
          >
            <View style={{ padding: 10 }}>
              <Text style={styles.signupText}>Have an account? Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
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
