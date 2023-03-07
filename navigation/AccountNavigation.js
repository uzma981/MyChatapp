import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import ViewBlocked from "../components/Account/ViewBlocked";
export default function AccountNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accounts"
        component={AccountScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="View Blocked"
        component={ViewBlocked}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
