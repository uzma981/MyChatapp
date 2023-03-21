import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import globalStyle from "../global-style";
import { Formik } from "formik";
import { baseSchema } from "./Validation/validationschema";

export default function LoginForm({ handleLogin, navigation, displayMessage }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={baseSchema}
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
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            WhatsThat<Text style={{ color: "#fb5b5a" }}> App</Text>
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login</Text>
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
              (errors.password || errors.email) && globalStyle.btnDisabled,
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
              <Text style={globalStyle.signupText}>New User? Sign Up</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={{ color: "red" }}>{displayMessage}</Text>
          </View>
        </View>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({});
