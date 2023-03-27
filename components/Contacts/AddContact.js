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

import { Ionicons } from '@expo/vector-icons';
import globalStyle from '../global-style';
import SearchBar from './SearchBar';
import SearchUserItem from '../Shared/SearchUserItem';

function AddContact(props) {
  const [searchUser, setSearchUser] = useState(null);
  const [searchText, setSearchText] = useState('');

  const searchUsers = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await axios.get(
        `http://localhost:3333/api/1.0.0/search?q=${searchText}`,
        {
          headers: {
            'X-Authorization': token,
          },
        },
      );
      setSearchUser(response.data);
    } catch (error) {
      console.log(error);
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
    </View>
  );
}

export default AddContact;
