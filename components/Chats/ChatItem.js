import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-web";

export default function ChatItem() {
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
            }}
            style={styles.image}
          />
          <View style={styles.content}>
            <View style={styles.row}>
              <Text numberOfLines={1} style={styles.name}>
                Uzma
              </Text>

              <Text style={styles.subTitle}>8:30</Text>
            </View>

            <Text numberOfLines={2} style={styles.subTitle}>
              Hi Uzma Hi Uzma Hi Uzma Hi Uzma Hi Uzma
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
    borderBottomColor: "lightgray",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});
