import Login from "./navigation/Login";
import SignUp from "./navigation/SignUp";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./navigation/Home";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//shift - alt - F format doc
