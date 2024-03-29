/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import ShowToast from '../Shared/Toast';
import globalStyle from '../global-style';

export default function NewChat(props) {
  const { navigation } = props;
  const [name, setname] = useState('');

  const addChat = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'X-Authorization': token,
      'Content-Type': 'application/json',
    };
    axios
      .post(
        'http://localhost:3333/api/1.0.0/chat',

        {
          name,
        },
        {
          headers,
        },
      )

      .then((response) => {
        if (response.status === 201) {
          navigation.navigate('Chat');
          ShowToast('success', 'New chat created');
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%',
    },
    headerText: {
      fontSize: 20,
    },

    icon: {
      alignItems: 'flex-start',
      marginRight: 16,
      marginBottom: 10,
      marginLeft: 8,
    },
    convoContainer: {
      alignItems: 'center',
      margin: 10,
    },
    textContainer: {
      height: 40,
      width: '80%',
      textAlign: 'center',
      textAlignVertical: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <View style={globalStyle.headerContainer}>
        <Text style={styles.headerText}>Add New Chat</Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity
          accessible
          accessibilityLabel="Go back"
          accessibilityHint="Navigates to the main chats screen"
          onPress={() => navigation.navigate('Chat')}
        >
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.convoContainer}>
        <TextInput
          accessibilityLabel="input name to start new convo"
          style={styles.textContainer}
          placeholder="Start a new conversation..."
          onChangeText={(text) => {
            setname(text);
          }}
          value={name}
        />
        <TouchableOpacity
          accessible
          accessibilityLabel="Create new chat"
          accessibilityHint="Navigates to the main chats screen after creating new chat"
          title="Create"
          onPress={() => {
            addChat();
          }}
          style={globalStyle.btn}
        >
          <View style={{ padding: 10 }}>
            <Text style={globalStyle.btnText}>Create</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
