/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import MessageBox from './MessageBox';
import globalStyle from '../global-style';

export default function ChatScreen(props) {
  const [chats, setChats] = useState({});
  const [userId, setUserId] = useState(null);
  const [showDeletePopup, setShowPopup] = useState(false);
  const [itemChange, setItemChange] = useState(null);
  const [message, setMessage] = useState('');

  const { chatId } = props.route.params; // get chatId from route params

  const viewSingleChat = async (chatIdApi) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .get(`http://localhost:3333/api/1.0.0/chat/${chatIdApi}`, {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        console.log(response.data.messages);
        setChats(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const updateMessage = async (chatIdApi, messageId) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .patch(
        `http://localhost:3333/api/1.0.0/chat/${chatIdApi}/message/${messageId}`,
        {
          message,
        },
        {
          headers: {
            'X-Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setMessage(''); // clear the message box
        viewSingleChat(chatId); // refresh the chat messages
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const deleteMessage = async (chatIdApi, messageId) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .delete(
        `http://localhost:3333/api/1.0.0/chat/${chatIdApi}/message/${messageId}`,
        {
          headers: {
            'X-Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(response);

        viewSingleChat(chatId); // refresh the chat messages
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const sendMessage = async () => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .post(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message`,
        {
          message,
        },
        {
          headers: {
            'X-Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setMessage(''); // clear the message box
        viewSingleChat(chatId); // refresh the chat messages
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleLongPress = (item) => {
    setShowPopup(true);
    setItemChange(item);
  };

  const handleDeleteMessage = () => {
    deleteMessage(chatId, itemChange.message_id);
    setShowPopup(false);
  };

  const handleUpdateMessage = () => {
    updateMessage(chatId, itemChange.message_id);
    setShowPopup(false);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      await viewSingleChat(chatId);
      const id = await AsyncStorage.getItem('id');
      setUserId(id);
    });
    return unsubscribe;
  }, []);
  const styles = StyleSheet.create({
    main: {
      backgroundColor: 'white',
      flex: 1,
      height: '100%',
    },
    messageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#cecece',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 5,
      maxWidth: '70%',
    },

    messageContainerSent: {
      alignSelf: 'flex-end',
      backgroundColor: '#fdaca5',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 5,
      maxWidth: '70%',
    },

    messageText: {
      fontSize: 16,
      lineHeight: 22,
    },
    searchInput: {
      width: '100%',
      height: '100%',
      paddingLeft: 8,
      fontSize: 16,
    },
    popupContainer: {
      backgroundColor: '#EFEBEB',
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      zIndex: 1,
    },

    popupButton: {
      backgroundColor: '#fb5b5a',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      margin: 5,
    },
  });

  const renderItem = ({ item }) => {
    // eslint-disable-next-line eqeqeq
    const sentByUser = item.author.user_id == userId;

    return (
      <TouchableOpacity onLongPress={() => handleLongPress(item)}>
        <View
          style={[
            styles.messageContainer,
            sentByUser && styles.messageContainerSent,
          ]}
        >
          <Text style={styles.messageText}>
            {item.author.first_name}
            :
            {' '}
            {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => item.message_id.toString();

  const { navigation } = props;

  return (
    <View style={globalStyle.appcontainer}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}>
          {' '}
          {chats.name}
        </Text>
      </View>
      <View style={globalStyle.icon}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings', { chatId })}
        >
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={chats.messages}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        inverted
      />
      {showDeletePopup && (
        <View style={[styles.popupContainer]}>
          <TouchableOpacity
            style={styles.popupButton}
            onPress={handleDeleteMessage}
          >
            <Text style={styles.popupButton}>Delete Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.popupButton}
            onPress={handleUpdateMessage}
          >
            <Text style={styles.popupButton}>Update Message</Text>
          </TouchableOpacity>
        </View>
      )}

      <MessageBox message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </View>
  );
}
