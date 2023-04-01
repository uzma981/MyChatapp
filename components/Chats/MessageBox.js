/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  View, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function MessageBox({ message, setMessage, sendMessage }) {
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
  });
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.textInput}
          autoFocus
        />
        <TouchableOpacity onPress={sendMessage}>
          <View style={styles.btnContainer}>
            <Ionicons name="send" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MessageBox;
