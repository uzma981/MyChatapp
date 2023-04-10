import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsScreen from '../screens/ChatsScreen';
import NewChat from '../components/Chats/NewChat';
import SingleChat from '../components/Chats/SingleChat';

import Settings from '../components/Chats/Settings';
import ChatItem from '../components/Chats/ChatItem';
import DraftsScreen from '../screens/DraftsScreen';
// import DraftsScreen from "../screens/DraftsScreen";
export default function ChatsNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name = "Drafts"
      component={DraftsScreen}></Stack.Screen> */}
      <Stack.Screen
        name="New Chat"
        component={NewChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Single Chat"
        component={SingleChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat Item"
        component={ChatItem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DraftsScreen"
        component={DraftsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
