import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import globalStyle from '../components/global-style';

export default function DraftsScreen(props) {
  const [drafts, setDrafts] = useState([]);
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(new Date());

  const handleChange = (propDate) => {
    setDate(propDate);
  };
  const handleDate = () => {
    setOpen(!open);
  };
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setOpenTime(false);
    setTime(currentTime);
  };
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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      width: '90%',
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
      <TouchableOpacity onPress={handleDate}>
        <Text> Schedule date</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOpenTime(true)}>
        <Text>Select Time</Text>
      </TouchableOpacity>
      {openTime && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Modal animationType="slide" transparent visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              selected={date}
              onDateChange={handleChange}
            />
            <TouchableOpacity onPress={handleDate}>
              <Text> Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text>{date}</Text>
    </View>
  );
}
