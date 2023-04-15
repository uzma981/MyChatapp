import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import globalStyle from '../components/global-style';

export default function DraftsScreen(props) {
  const [drafts, setDrafts] = useState([]);
  const { navigation } = props;
  const [draftMessage, setDraftMessage] = useState('');
  const deleteDraft = async (draft) => {
    try {
      const storedDrafts = await AsyncStorage.getItem('messageDrafts');
      const parsedDrafts = storedDrafts ? JSON.parse(storedDrafts) : [];
      const updatedDrafts = parsedDrafts.filter((d) => d !== draft);
      await AsyncStorage.setItem(
        'messageDrafts',
        JSON.stringify(updatedDrafts),
      );
      setDrafts(updatedDrafts);
    } catch (error) {
      console.log(error);
    }
  };
  const route = useRoute();
  const { chatId } = route.params;
  const sendMessage = async (item) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .post(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message`,
        {
          message: draftMessage,
        },
        {
          headers: {
            'X-Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(response);
        navigation.navigate('Single Chat', { chatId });
        deleteDraft(item);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const getDrafts = async () => {
    try {
      const storedDrafts = await AsyncStorage.getItem('messageDrafts');
      const parsedDrafts = storedDrafts ? JSON.parse(storedDrafts) : [];
      setDrafts(parsedDrafts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDrafts();
  }, []);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'baseline',
      flexDirection: 'row',
      margin: 10,
    },
    main: {
      backgroundColor: 'white',
      flex: 1,
      height: '100%',
    },
    draftItem: {
      backgroundColor: '#F5F5F5',
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    draftText: {
      color: '#A9A9A9',
      flex: 1,
      fontSize: 14,
      padding: 10,
      marginHorizontal: 5,
    },
  });
  const renderDraftItem = ({ item, index }) => (
    <View key={index} style={styles.draftItem}>
      <Ionicons name="document-outline" size={24} color="#A9A9A9" />
      <TextInput
        onChangeText={(text) => {
          setDraftMessage(text);
        }}
        placeholder={item}
        style={styles.draftText}
      />
      {draftMessage.length === 0 ? (
        <TouchableOpacity
          onPress={(event) => {
            event.stopPropagation();
            deleteDraft(item);
          }}
          style={{ position: 'absolute', right: 2 }}
        >
          <Ionicons name="close-circle-outline" size={24} color="#A9A9A9" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => sendMessage(item)}
          style={{ position: 'absolute', right: 0 }}
        >
          <Ionicons name="send" size={20} color="#A9A9A9" />
        </TouchableOpacity>
      )}
    </View>
  );

  const keyExtractor = (item) => item.toString();

  return (
    <View style={styles.main}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}>Drafts</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={drafts}
          keyExtractor={keyExtractor}
          renderItem={renderDraftItem}
        />
      </View>
    </View>
  );
}
