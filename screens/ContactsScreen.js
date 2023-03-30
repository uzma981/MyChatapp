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

  // const handleRemoveContact = async (userId) => {
  //   const token = await AsyncStorage.getItem('token');

  //   await axios
  //     .delete(`http://localhost:3333/api/1.0.0/user/${userId}/contact`, {
  //       headers: {
  //         'X-Authorization': token,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       // Filter out the removed contact from the contacts array
  //       const updatedContacts = contacts.filter(
  //         (contact) => contact.user_id !== userId,
  //       );
  //       setContacts(updatedContacts);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };
  // const blockContact = async (userId) => {
  //   const token = await AsyncStorage.getItem('token');
  //   await axios
  //     .post(`http://localhost:3333/api/1.0.0/user/${userId}/block`, null, {
  //       headers: {
  //         'X-Authorization': token,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       const updatedContacts = contacts.filter(
  //         (contact) => contact.user_id !== userId,
  //       );
  //       setContacts(updatedContacts);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };
  const { navigation } = props;
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
          renderItem={({ item }) => <ContactItem user={item} />}
          keyExtractor={(item) => item.user_id}
        />
      </ScrollView>
      {/* <FlatList
        data={searchUser}
        renderItem={({ item }) => <SearchUserItem user={item} />}
        keyExtractor={(item) => item.user_id}
      /> */}
    </View>
  );
}

export default ContactsScreen;
