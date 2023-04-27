import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

function MessageBox({ message, setMessage, sendMessage }) {
  const timeSchedule = null;

  const saveDraft = async () => {
    try {
      const storedDrafts = await AsyncStorage.getItem('messageDraft');
      const now = new Date();
      const parsedDrafts = storedDrafts ? JSON.parse(storedDrafts) : [];
      const newDraft = {
        id: Math.floor(Math.random() * 1000000),
        messageDraft: message,
        createdAt: now,
        timeScheduled: timeSchedule,
      };
      const updatedDrafts = [...parsedDrafts, newDraft];

      await AsyncStorage.setItem(
        'messageDraft',
        JSON.stringify(updatedDrafts),
      );
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeText = (text) => {
    setMessage(text);
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'baseline',
      flexDirection: 'row',
      margin: 10,
    },
    mainContainer: {
      flexDirection: 'row',
      backgroundColor: '#EFEBEB',
      padding: 5,
      margin: 5,
      borderRadius: 30,
      marginRight: 10,
      flex: 1,
    },
    textInput: {
      width: '80%',
    },
    btnContainer: {
      backgroundColor: '#fb5b5a',
      borderRadius: 50,
      width: 50,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    draftItem: {
      backgroundColor: '#F5F5F5',
      padding: 5,
      marginVertical: 5,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    draftText: {
      color: '#A9A9A9',
      flex: 1,
      marginHorizontal: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput
          value={message}
          onChangeText={onChangeText}
          style={styles.textInput}
          autoFocus
        />
        <TouchableOpacity onPress={sendMessage}>
          <View style={styles.btnContainer}>
            <Ionicons name="send" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveDraft}>
          <View style={styles.btnContainer}>
            <FontAwesome name="save" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MessageBox;
