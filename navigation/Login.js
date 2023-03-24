import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginForm from "../components/Form/LoginForm";
const Login = (props) => {
  const checkLoggedIn = async () => {
    const id = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");

    if (id && token) {
      props.navigation.navigate("Home");
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const [displayMessage, setDisplayMessage] = useState("");

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
        if (response.status == 200) {
          await AsyncStorage.setItem("id", response.data.id);
          await AsyncStorage.setItem("token", response.data.token);
          navigation.navigate("Home");
        }
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          setDisplayMessage("Incorrect email or password, please try again");
        } else {
          setDisplayMessage(
            "Something is wrong from our side, please try again later!"
          );
        }
      });
  };
  const { navigation } = props;
  return (
    <LoginForm
      handleLogin={handleLogin}
      navigation={navigation}
      displayMessage={displayMessage}
    />
  );
};

export default Login;
