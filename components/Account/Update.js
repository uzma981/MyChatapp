import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import globalStyle from "../global-style";
export default function Update() {
  return (
    <View>
      <TextInput style={globalStyle.inputBox} placeholder="First Name" />
      <TextInput style={globalStyle.inputBox} placeholder="Last Name" />
      <TextInput style={globalStyle.inputBox} placeholder="Email" />
      <TextInput style={globalStyle.inputBox} placeholder="Password" />
      <TouchableOpacity title="Update" style={[globalStyle.btn]}>
        <View style={{ padding: 10 }}>
          <Text style={globalStyle.btnText}>Update</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
