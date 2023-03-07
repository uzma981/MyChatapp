import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import globalStyle from "./global-style";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginSchema = Yup.object().shape({
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
});

const Login = (props) => {
  const [DisplayMessage, setDisplayMessage] = useState("");

  const handleLogin = async (values) => {
    const token = await AsyncStorage.getItem("token");

    const headers = {
      "X-Authorization": token,
      "Content-Type": "application/json",
    };
    await axios
      .post(
        "http://localhost:3333/api/1.0.0/login",
        {
          email: values.email,
          password: values.password,
        },
        { headers }
      )

      .then(async (response) => {
        //console.log(response.data.id);
        if (response.status == 200) {
          try {
            await AsyncStorage.setItem("id", response.data.id);
            await AsyncStorage.setItem("token", response.data.token);
            navigation.navigate("Home");
          } catch {
            ("something went wrong");
          }
        } else if (response.status == 400) {
          console.log("400 error, invalid email or password");
          setDisplayMessage("Invalid email or password");
        } else {
          console.log("500 error, server error");
          setDisplayMessage(
            "Something is wrong from our side, please try again later!"
          );
        }
      });
  };
  const { navigation } = props;
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
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

          <TouchableOpacity
            title="Login"
            onPress={handleSubmit}
            style={[
              globalStyle.btn,
              (errors.password || errors.email) && styles.btnDisabled,
            ]}
            disabled={errors.password || errors.email}
          >
            <View style={{ padding: 10 }}>
              <Text style={globalStyle.btnText}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            title="SignUpText"
            onPress={() => navigation.navigate("SignUp")}
            style={{ marginBottom: 10 }}
          >
            <View style={{ padding: 10 }}>
              <Text style={styles.signupText}>New User? Sign Up</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={{ color: "red" }}>{DisplayMessage}</Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  signupText: {
    textAlign: "center",
    color: "black",
  },
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
export default Login;
