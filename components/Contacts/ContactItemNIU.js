import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-web';

export default function ContactItem() {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 10,
      marginVertical: 5,
      height: 70,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 10,
    },
    content: {
      flex: 1,

      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'lightgray',
    },

    name: {
      flex: 1,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexDirection: 'row',
      textAlign: 'left',
      fontSize: 25,
      marginTop: 10,
    },
  });

  return (
    <View>
      <TouchableOpacity>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg',
            }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.name}>
              Uzma Ahmed
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
