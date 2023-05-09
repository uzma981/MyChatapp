import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import UpdateForm from '../components/Form/UpdateForm';

function AccountScreen(props) {
  const [image, setImage] = useState(null);
  const [firstName, setfirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [email, setEmail] = useState(null);
  const { navigation } = props;

  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    await axios
      .get(`http://localhost:3333/api/1.0.0/user/${id}`, {
        headers: {
          'X-Authorization': token,
        },
      })
      .then((response) => {
        setfirstName(response.data.first_name);
        setlastName(response.data.last_name);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const getProfilePhoto = async () => {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');

    await axios
      .get(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
        headers: {
          'X-Authorization': token,
          'Content-Type': 'image/png',
        },
        responseType: 'blob',
      })
      .then((response) => {
        console.log(response);
        const url = URL.createObjectURL(response.data);
        console.log(url);
        setImage(url);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getProfilePhoto();
    getUserInfo();
  }, []);
  async function sendToServer(data) {
    console.log('HERE', data.uri);

    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(data.uri);
    const blob = await res.blob();

    await axios.post(`http://localhost:3333/api/1.0.0/user/${id}/photo`, blob, {
      headers: {
        'X-Authorization': token,
        'Content-Type': 'image/png',
      },
    });
  }
  const uploadProfilePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
      exif: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      sendToServer(result);
    }
  };

  const handleUpdate = async (values) => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    const headers = {
      'X-Authorization': token,
      'Content-Type': 'application/json',
    };
    const dataToUpdate = {};
    if (values.firstName) {
      dataToUpdate.first_name = values.firstName;
    }

    if (values.lastName) {
      dataToUpdate.last_name = values.lastName;
    }

    if (values.email) {
      dataToUpdate.email = values.email;
    }

    axios
      .patch(
        `http://localhost:3333/api/1.0.0/user/${id}`,
        dataToUpdate,
        {
          headers,
        },
      )

      .then((response) => {
        console.log(response);
        getUserInfo();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    profileImage: {
      marginTop: 15,
      width: 150,
      height: 150,
      borderRadius: 150 / 2,
      overflow: 'hidden',
      borderColor: 'black',
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
      borderColor: 'black',
    },
    dm: {
      backgroundColor: 'gray',
      position: 'absolute',
      top: 20,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    add: {
      backgroundColor: '#41444B',
      marginTop: 15,
      position: 'absolute',
      bottom: 0,
      right: 30,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center' }}>
        <View style={styles.profileImage}>
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>

        <TouchableOpacity
          accessible
          accessibilityLabel="Upload profile photo"
          onPress={() => uploadProfilePhoto()}
        >
          <View style={styles.add}>
            <Ionicons
              name="add-outline"
              size={48}
              color="gray"
              style={{ marginTop: 6, marginLeft: 2 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ padding: 15 }}>
          <Text style={{ margin: 5 }}>{firstName}</Text>
          <Text style={{ margin: 5 }}>{lastName}</Text>
          <Text style={{ margin: 5 }}>{email}</Text>
        </View>
      </View>
      <UpdateForm handleUpdate={handleUpdate} navigation={navigation} />
    </View>
  );
}

export default AccountScreen;
