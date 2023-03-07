import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Camera,
  CameraType,
  onCameraReady,
  CameraPictureOptions,
} from "expo-camera";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      let permission = await Camera.requestCameraPermissionsAsync();

      requestPermission(permission);
    };

    getPermission();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
    console.log("Camera: ", type);
  }
  async function takePhoto() {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        onPictureSaved: (data) => sendToServer(data),
      };
      const data = await camera.takePictureAsync(options);

      console.log(data.uri);
    }
  }

  async function sendToServer(data) {
    console.log("HERE", data.uri);

    const id = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");
    let res = await fetch(data.uri);
    let blob = await res.blob();

    await axios.post(
      "http://localhost:3333/api/1.0.0/user/" + id + "/photo",
      blob,
      {
        headers: {
          "X-Authorization": token,
          "Content-Type": "image/png",
        },
      }
    );
  }

  if (!permission || !permission.granted) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    alignSelf: "flex-end",
    padding: 5,
    margin: 5,
    backgroundColor: "steelblue",
  },
  buttonContainer: {
    alignSelf: "flex-end",
    padding: 5,
    margin: 5,
    backgroundColor: "steelblue",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ddd",
  },
});
