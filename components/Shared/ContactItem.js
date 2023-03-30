import {
  View, Text, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyle from '../global-style';

export default function ContactItem({ user }) {
  const [image, setImage] = useState(null);
  const [contacts, setContacts] = useState([]);
  const handleGetContact = async () => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .get('http://localhost:3333/api/1.0.0/contacts', {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setContacts(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
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
    handleGetContact();
  }, []);
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     handleGetContact();
  //     getProfilePhoto(user.user_id);
  //   });
  //   return unsubscribe;
  // }, []);
  const handleRemoveContact = async (userId) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .delete(`http://localhost:3333/api/1.0.0/user/${userId}/contact`, {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        console.log(response);
        // Filter out the removed contact from the contacts array
        const updatedContacts = contacts.filter(
          (contact) => contact.user_id !== userId,
        );
        setContacts(updatedContacts);
        handleGetContact();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const blockContact = async (userId) => {
    const token = await AsyncStorage.getItem('token');
    await axios
      .post(`http://localhost:3333/api/1.0.0/user/${userId}/block`, null, {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        console.log(response);
        const updatedContacts = contacts.filter(
          (contact) => contact.user_id !== userId,
        );
        setContacts(updatedContacts);
        handleGetContact();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const styles = StyleSheet.create({
    name: {
      flex: 1,
      fontWeight: 'bold',
    },

    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    searchcontainer: {
      width: '100%',
      height: 50,
      backgroundColor: '#EFEBEB',
      borderRadius: 20,
      marginLeft: 5,
      flexDirection: 'row',
    },

    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 10,
    },
    btnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginRight: 10,
    },

    searchInput: {
      width: '100%',
      height: '100%',
      paddingLeft: 8,
      fontSize: 16,
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
            {user.first_name}
            {' '}
            {user.last_name}
          </Text>
        </View>
        <Text>
          Email:
          {' '}
          {user.email}
        </Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => blockContact(user.user_id)}>
          <Entypo name="block" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => handleRemoveContact(user.user_id)}
        >
          <Ionicons name="remove-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  );
}
