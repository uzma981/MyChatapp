import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';

import globalStyle from '../components/global-style';

export default function DraftsScreen(props) {
  const [drafts, setDrafts] = useState([]);
  const [date, setDate] = React.useState(undefined);
  const [draftTime, setDraftTime] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const { navigation } = props;
  const [draftMessage, setDraftMessage] = useState('');
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      const selectedTime = new Date();
      selectedTime.setHours(hours);
      selectedTime.setMinutes(minutes);
      setDraftTime(selectedTime);
    },
    [setVisible],
  );
  const getDrafts = async () => {
    try {
      const storedDrafts = await AsyncStorage.getItem('messageDraft');
      const parsedDrafts = storedDrafts ? JSON.parse(storedDrafts) : [];
      console.log(parsedDrafts);
      setDrafts(parsedDrafts);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   getDrafts();
  // }, []);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      await getDrafts();
    });
    return unsubscribe;
  }, []);
  const deleteDraft = async (draftId) => {
    try {
      const storedDrafts = await AsyncStorage.getItem('messageDraft');
      const parsedDrafts = storedDrafts ? JSON.parse(storedDrafts) : [];
      const updatedDrafts = parsedDrafts.filter(
        (draft) => draft.id !== draftId,
      );
      await AsyncStorage.setItem('messageDraft', JSON.stringify(updatedDrafts));
      getDrafts();
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
        deleteDraft(item.id);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const sendScheduledMessage = async (item) => {
    const token = await AsyncStorage.getItem('token');

    await axios
      .post(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message`,
        {
          message: item.messageDraft,
        },
        {
          headers: {
            'X-Authorization': token,
          },
        },
      )
      .then((response) => {
        console.log(response);
        console.log('sent');
        // navigation.navigate('Single Chat', { chatId });
        deleteDraft(item.id);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const scheduleDraft = async (draft) => {
    try {
      const storedDrafts = await AsyncStorage.getItem('messageDraft');
      const parsedDrafts = storedDrafts ? JSON.parse(storedDrafts) : [];
      const updatedDrafts = parsedDrafts.map((d) => {
        if (d.id === draft.id) {
          return {
            ...d,
            timeScheduled: draftTime,
          };
        }
        return d;
      });
      await AsyncStorage.setItem('messageDraft', JSON.stringify(updatedDrafts));
      console.log(draftTime);

      const now = new Date();
      const draftDate = new Date(draftTime);
      const timeUntilDraft = draftDate.getTime() - now.getTime();
      if (timeUntilDraft > 0) {
      // Schedule the message
        setTimeout(() => {
          sendScheduledMessage(draft);
        }, timeUntilDraft);
        console.log(`Scheduled message to be sent in ${timeUntilDraft}ms`);
      } else {
        console.log('Draft time has already passed');
      }
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
        placeholder={item.messageDraft}
        style={styles.draftText}
      />

      {draftMessage.length === 0 ? (
        <View style={{ flexDirection: 'row', right: 2 }}>
          <TouchableOpacity
            onPress={(event) => {
              event.stopPropagation();
              deleteDraft(item.id);
            }}
            style={{ position: 'absolute' }}
          >
            <Ionicons name="close-circle-outline" size={24} color="#A9A9A9" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
              scheduleDraft(item);
            }}
            uppercase={false}
            mode="outlined"
            style={{ marginLeft: 25 }}
          >
            <MaterialIcons name="access-time" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => sendMessage(item)}
          style={{ position: 'absolute', right: 0 }}
        >
          <Ionicons name="send" size={24} color="#A9A9A9" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.main}>
      <View style={globalStyle.headerContainer}>
        <Text style={globalStyle.headerText}>Drafts</Text>
      </View>
      <View style={styles.container}>
        <View>
          <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={14}
            minutes={10}
          />
          <DatePickerModal
            locale="en"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
          />
        </View>
        {/* <FlatList
          data={drafts}
          keyExtractor={keyExtractor}
          renderItem={renderDraftItem}
        /> */}
        <FlatList
          data={drafts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDraftItem}
        />
      </View>

      <View
        style={{
          padding: 5,
          backgroundColor: '#A9A9A9',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        {/* <View style={{ flexDirection: 'row' }}>
          <Text>
            {drafthours}
            {' '}
            :
          </Text>
          <Text>
            {' '}
            {draftminutes}
          </Text>
        </View> */}
      </View>
    </View>
  );
}
