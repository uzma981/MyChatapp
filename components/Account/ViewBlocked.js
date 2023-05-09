import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ShowToast from '../Shared/Toast';
import globalStyle from '../global-style';

export default function ViewBlocked(props) {
  const [contacts, setContacts] = useState([]);
  const viewBlockedContact = async () => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .get('http://localhost:3333/api/1.0.0/blocked', {
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
    const unsubscribe = props.navigation.addListener('focus', () => {
      viewBlockedContact();
    });
    return unsubscribe;
  }, []);

  const removeBlockedContact = async (userId) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .delete(`http://localhost:3333/api/1.0.0/user/${userId}/block`, {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        console.log(response);
        const updatedContacts = contacts.filter(
          (contact) => contact.user_id !== userId,
        );
        ShowToast('success', 'Contact unblocked');
        setContacts(updatedContacts);
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
    icon: {
      alignItems: 'flex-end',
      marginRight: 8,
      marginBottom: 10,
    },
    searchInput: {
      width: '100%',
      height: '100%',
      paddingLeft: 8,
      fontSize: 16,
    },
  });
  return (
    <View style={globalStyle.appcontainer}>
      <ScrollView>
        <View style={globalStyle.headerContainer}>
          <Text style={globalStyle.headerText}>Blocked</Text>
        </View>
        <>
          {contacts.map((contact) => (
            <View key={contact.user_id} style={globalStyle.singlecontainer}>
              <View style={globalStyle.singlecontainerContent}>
                <View style={globalStyle.singlecontainerRow}>
                  <Text style={styles.name}>
                    {contact.first_name}
                    {' '}
                    {contact.last_name}
                  </Text>

                  <TouchableOpacity
                    onPress={() => removeBlockedContact(contact.user_id)}
                    style={styles.btnContainer}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <Text>{contact.email}</Text>
              </View>
            </View>
          ))}
        </>
      </ScrollView>
    </View>
  );
}
