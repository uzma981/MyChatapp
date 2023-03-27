import React from 'react';
import {
  View, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function SearchBar({ searchText, setSearchText, searchUsers }) {
  const styles = StyleSheet.create({
    name: {
      flex: 1,
      fontWeight: 'bold',
    },
    contactcontainer: {
      flexDirection: 'row',
      marginHorizontal: 10,
      marginVertical: 5,
      height: 70,
      marginTop: 10,
    },
    content: {
      flex: 1,

      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'lightgray',
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
      backgroundColor: '#fb5b5a',
      borderRadius: 50,
      width: 50,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginRight: 10,
    },
    icon: {
      alignItems: 'flex-row',
      marginRight: 8,
      marginBottom: 10,
    },
    searchInput: {
      width: '100%',
      height: '100%',
      paddingLeft: 8,
      fontSize: 16,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 5,
    },
  });
  return (
    <View style={styles.searchcontainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search here.."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={searchUsers}>
        <View style={styles.btnContainer}>
          <Ionicons name="send" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;
