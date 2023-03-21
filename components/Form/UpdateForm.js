import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import globalStyle from "../global-style";
import { Formik } from "formik";
import { UpdateSchema } from "./Validation/validationschema";
import Logout from "../Account/Logout";
export default function UpdateForm({ handleUpdate, navigation }) {
  return (
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
            onChangeText={handleChange("email")}
            value={values.email}
          />
          {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
          <TextInput
            style={globalStyle.inputBox}
            placeholder="Password"
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
            style={globalStyle.btn}
          >
            <View style={{ padding: 10 }}>
              <Text style={globalStyle.btnText}>Update</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.navigate("View Blocked")}
          >
            <Text>View Blocked</Text>
          </TouchableOpacity>
          <Logout></Logout>
        </View>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
