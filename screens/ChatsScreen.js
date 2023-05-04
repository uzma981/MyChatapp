/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import {
  Text, View, TouchableOpacity, FlatList,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ChatItem from '../components/Chats/ChatItem';
import globalStyle from '../components/global-style';

function ChatsScreen(props) {
  const { navigation } = props;
  const [chats, setChats] = useState([]);

  const handleGetChat = async () => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .get('http://localhost:3333/api/1.0.0/chat', {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setChats(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        console.log('No chats');
      });
  };

  useEffect(() => {
    handleGetChat();
    const interval = setInterval(() => {
      console.log('running');
      handleGetChat();
    }, 5000);
    return () => clearInterval(interval); // Clean up the interval
  }, []);
  return (
    <View style={globalStyle.appcontainer}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}>Chats</Text>
      </View>
      <View style={globalStyle.icon}>
        <TouchableOpacity onPress={() => navigation.navigate('New Chat')}>
          <Entypo name="new-message" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.chat_id}
        renderItem={({ item }) => (
          <View>
            <ChatItem chat={item} navigation={navigation} />
          </View>
        )}
      />
    </View>
  );
}

export default ChatsScreen;
