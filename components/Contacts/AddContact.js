import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import globalStyle from '../global-style';
import SearchBar from './SearchBar';
import SearchUserItem from '../Shared/SearchUserItem';
import ShowToast from '../Shared/Toast';

function AddContact(props) {
  const [searchUser, setSearchUser] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const searchUsers = async (button) => {
    setLimit(5);
    if (searchText === '') {
      ShowToast('error', 'Please type in the search bar');
    } else {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.get(
          `http://localhost:3333/api/1.0.0/search?q=${searchText}&limit=${limit}&offset=${
            // eslint-disable-next-line no-nested-ternary
            button === 'left' ? offset - limit : button === 'right' ? offset + limit : 0
          }`,
          {
            headers: {
              'X-Authorization': token,
            },
          },
        );
        if (button === 'left') {
          setOffset(offset - limit);
        } else if (button === 'right') {
          setOffset(offset + limit);
        } else {
          setOffset(0);
        }
        setSearchUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    icon: {
      alignItems: 'flex-row',
      marginRight: 8,
      marginBottom: 10,
    },
    pagination: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },

    arrowIcon: {
      fontSize: 28,
      marginLeft: 10,
      marginRight: 10,
      color: 'black',
    },
  });

  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}>Add Contact</Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        searchUsers={searchUsers}
      />

      <FlatList
        data={searchUser}
        renderItem={({ item }) => <SearchUserItem user={item} />}
        keyExtractor={(item) => item.user_id}
      />
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => searchUsers('left')}>
          <Ionicons name="chevron-back" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => searchUsers('right')}>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddContact;
