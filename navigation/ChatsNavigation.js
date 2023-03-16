import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsScreen from "../screens/ChatsScreen";
import NewChat from "../components/Chats/NewChat";
import SingleChat from "../components/Chats/SingleChat";
import AddUsertoChat from "../components/Chats/AddUsertoChat";
import ChatItem from "../components/Chats/ChatItem";
export default function ChatsNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChatsScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="New Chat"
        component={NewChat}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="Single Chat" component={SingleChat}></Stack.Screen>
      <Stack.Screen
        name="Add User"
        component={AddUsertoChat}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Chat Item"
        component={ChatItem}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
