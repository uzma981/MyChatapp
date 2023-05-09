import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyle from '../global-style';
import ShowToast from '../Shared/Toast';

export default function Settings(props) {
  const { navigation } = props;
  const { chatId } = props.route.params;

  const [name, setName] = useState('');
  const [contacts, setContacts] = useState([]);
  const [userinChat, setuserinChat] = useState([]);
  const viewDetails = async (chatIdApi) => {
    const token = await AsyncStorage.getItem('token');
    await axios
      .get(`http://localhost:3333/api/1.0.0/chat/${chatIdApi}`, {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        console.log(response);
        const { members } = response.data;
        setuserinChat(members);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleUpdateChat = async (chatIdApi) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'X-Authorization': token,
      'Content-Type': 'application/json',
    };
    axios
      .patch(
        `http://localhost:3333/api/1.0.0/chat/${chatIdApi}`,
        {
          name,
        },
        {
          headers,
        },
      )

      .then((response) => {
        console.log(response);
        ShowToast('success', 'Chat name updated');
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleAddUserToChat = async (chatIdApi, userId) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .post(
        `http://localhost:3333/api/1.0.0/chat/${chatIdApi}/user/${userId}`,
        null,
        {
          headers: {
            'X-Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(response);
        ShowToast('success', 'Added user to chat');
        viewDetails(chatId);
      })
      .catch((error) => {
        console.log(error);
        ShowToast('error', 'Already user in chat');
      });
  };
  const handleRemoveUserFromChat = async (chatIdApi, userId) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .delete(
        `http://localhost:3333/api/1.0.0/chat/${chatIdApi}/user/${userId}`,

        {
          headers: {
            'X-Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(response);
        const updatedUsersinchat = userinChat.filter(
          (user) => user.user_id !== userId,
        );
        ShowToast('success', 'Removed user from chat');

        setuserinChat(updatedUsersinchat);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleGetContact = async () => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .get('http://localhost:3333/api/1.0.0/contacts', {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        console.log(response);
        setContacts(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetContact();
      viewDetails(chatId);
    });
    return unsubscribe;
  }, []);

  const styles = StyleSheet.create({
    name: {
      flex: 1,
      fontWeight: 'bold',
    },
  });
  return (
    <View style={globalStyle.appcontainer}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}>Chats</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          backgroundColor: '#EFEBEB',
          padding: 10,
          margin: 5,
          borderRadius: 30,
          marginRight: 10,
        }}
      >
        <TextInput
          style={{
            width: '100%',
            textAlign: 'center',
          }}
          placeholder="Update Conversation name:"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
          }}
          accessible
          accessibilityLabel="Update name of chat "
          onPress={() => handleUpdateChat(chatId)}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={userinChat}
        keyExtractor={(member) => member.user_id}
        renderItem={({ item: member }) => (
          <View style={globalStyle.singlecontainer}>
            <View style={globalStyle.singlecontainerContent}>
              <View style={globalStyle.singlecontainerRow}>
                <Text style={styles.name}>
                  {member.first_name}
                  {' '}
                  {member.last_name}
                </Text>
              </View>
              <Text>{member.email}</Text>
            </View>
            <View style={globalStyle.icon}>
              <TouchableOpacity
                accessible
                accessibilityLabel="Remove user from chat"
                onPress={() => handleRemoveUserFromChat(chatId, member.user_id)}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#fdaca5',
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 14 }}>Add User to Chat</Text>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.user_id}
        renderItem={({ item: contact }) => (
          <View style={globalStyle.singlecontainer}>
            <View style={globalStyle.singlecontainerContent}>
              <View style={globalStyle.singlecontainerRow}>
                <Text style={styles.name}>
                  {contact.first_name}
                  {' '}
                  {contact.last_name}
                </Text>
              </View>
              <Text>{contact.email}</Text>
            </View>
            <View style={styles.icon}>
              <TouchableOpacity
                accessible
                accessibilityLabel="Add user from chat"
                onPress={() => handleAddUserToChat(chatId, contact.user_id)}
              >
                <AntDesign name="adduser" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
