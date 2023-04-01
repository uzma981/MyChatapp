import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import globalStyle from '../components/global-style';
import ContactItem from '../components/Shared/ContactItem';

function ContactsScreen(props) {
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
        // setUserIdPhoto(response.data);
        setContacts(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      handleGetContact();
    });
    return unsubscribe;
  }, []);

  const { navigation } = props;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={globalStyle.headerContainer}>
          <Text style={globalStyle.headerText}>Contacts</Text>
        </View>
        <View style={globalStyle.icon}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Contact')}
            accessibilityLabel="Add contact"
          >
            <AntDesign name="adduser" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <ContactItem
              user={item}
              contacts={contacts}
              setContacts={setContacts}
              handleGetContact={handleGetContact}
            />
          )}
          keyExtractor={(item) => item.user_id}
        />
      </ScrollView>
    </View>
  );
}

export default ContactsScreen;
