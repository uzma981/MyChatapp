import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import UpdateForm from '../components/Form/UpdateForm';

function AccountScreen(props) {
  const [image, setImage] = useState(null);

  const { navigation } = props;

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
    axios
      .patch(
        `http://localhost:3333/api/1.0.0/user/${id}`,

        {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
        },
        {
          headers,
        },
      )

      .then((response) => {
        console.log(response);
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
      position: 'absolute',
      bottom: 0,
      right: 0,
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

        <TouchableOpacity onPress={() => uploadProfilePhoto()}>
          <View style={styles.add}>
            <Ionicons
              name="add-outline"
              size={48}
              color="gray"
              style={{ marginTop: 6, marginLeft: 2 }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <UpdateForm
        handleUpdate={handleUpdate}
        navigation={navigation}
      />

    </View>
  );
}

export default AccountScreen;
