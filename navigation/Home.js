import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import CameraScreen from '../screens/CameraScreen';

import ContactsNavigation from './ContactsNavigation';
import ChatsNavigation from './ChatsNavigation';
import AccountNavigation from './AccountNavigation';

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chats') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Contacts') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Account"
        options={{ headerShown: false }}
        component={AccountNavigation}
      />
      <Tab.Screen
        name="Chats"
        options={{ headerShown: false }}
        component={ChatsNavigation}
      />
      <Tab.Screen
        name="Camera"
        options={{ headerShown: false }}
        component={CameraScreen}
      />
      <Tab.Screen
        name="Contacts"
        options={{ headerShown: false }}
        component={ContactsNavigation}
      />
    </Tab.Navigator>
  );
}
