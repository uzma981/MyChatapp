import {
  View, Text, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyle from '../global-style';

export default function SearchUserItem({ user }) {
  const [image, setImage] = useState(null);

  const getProfilePhoto = async (userId) => {
    const token = await AsyncStorage.getItem('token');
    const id = userId;

    await axios
      .get(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
        headers: {
          'X-Authorization': token,
          'Content-Type': 'image/png',
        },
        responseType: 'blob',
      })
      .then((response) => {
        console.log(response);
        const url = URL.createObjectURL(response.data);
        console.log(url);
        setImage(url);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getProfilePhoto(user.user_id);
  }, []);
  const handleAddContact = async (userId) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .post(`http://localhost:3333/api/1.0.0/user/${userId}/contact`, null, {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 10,
      marginVertical: 5,
      height: 70,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 10,
    },
    content: {
      flex: 1,

      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'lightgray',
    },

    name: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 20,
    },
  });
  return (
    <View style={globalStyle.singlecontainer}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View style={globalStyle.singlecontainerContent}>
        <View style={globalStyle.singlecontainerRow}>
          <Text numberOfLines={1} style={styles.name}>
            {user.given_name}
            {' '}
            {user.family_name}
          </Text>
        </View>
        <Text>
          Email:
          {' '}
          {user.email}
        </Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => handleAddContact(user.user_id)}>
          <AntDesign name="adduser" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
