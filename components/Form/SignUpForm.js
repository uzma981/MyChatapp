import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import globalStyle from "../global-style";

import { Formik } from "formik";
import { SignUpSchema } from "./Validation/validationschema";
export default function SignUpForm({ handleSignup, navigation }) {
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
      onSubmit={handleSignup}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign Up</Text>
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
                globalStyle.btnDisabled,
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
              <Text style={globalStyle.signupText}>Have an account? Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({});
