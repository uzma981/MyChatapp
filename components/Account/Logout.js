import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout() {
  const handleLogout = async () => {
    const sessionToken = await AsyncStorage.getItem('token');
    axios
      .post('http://localhost:3333/api/1.0.0/logout', null, {
        headers: { 'X-Authorization': sessionToken },
      })
      .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('id');
          await AsyncStorage.removeItem('messageDraft');
          // eslint-disable-next-line no-undef
          navigation.navigate('Login');
        } else if (response.status === 401) {
          console.log('401 error, unauthorised');
        } else if (response.status === 500) {
          console.log('500 error, server error');
        }
      });
  };
  return (
    <TouchableOpacity onPress={handleLogout}>
      <View
        style={{
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: '#cecece',
          padding: 10,
        }}
      >
        <Text>Logout</Text>
      </View>
    </TouchableOpacity>
  );
}
