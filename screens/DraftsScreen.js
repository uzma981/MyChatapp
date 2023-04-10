import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import globalStyle from '../components/global-style';

export default function DraftsScreen({ navigation }) {
  const [drafts, setDrafts] = useState([]);

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
    const unsubscribe = navigation.addListener('focus', () => {
      getDrafts();
    });
    return unsubscribe;
  }, []);

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
  const renderDraftItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.draftItem}
      onPress={() => {
        // setMessage(item);
      }}
      onLongPress={() => {
        // on long press = edit
      }}
    >
      <Ionicons name="document-outline" size={20} color="#A9A9A9" />
      <Text style={styles.draftText}>{item}</Text>
      <TouchableOpacity
        onPress={(event) => {
          event.stopPropagation();
          deleteDraft(item);
        }}
        style={{ position: 'absolute', right: 0 }}
      >
        <Ionicons name="close-circle-outline" size={20} color="#A9A9A9" />
      </TouchableOpacity>
    </TouchableOpacity>
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
