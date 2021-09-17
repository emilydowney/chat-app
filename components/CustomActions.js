import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from 'prop-types';
import * as ImagePicker from "expo-image-picker";
import * as Location from 'expo-location';

import firebase from 'firebase';

export default class CustomActions extends React.Component {

  // Lets user pick image from library (after permission)
  imagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({
          image: imageUrl
        });
      }
    }
  };

  // Lets user take photo with their camera (after permission)
  takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl });
      }
    }
  }

  // Retrieves and sends user location (after permission)
  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({ enableHighAccuracy: true }).catch((error) => console.log(error));

      if (result) {
        this.props.onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude
          },
        });
      }
    }
  }

  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  // Shows options available for image and location handling
  onActionPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.imagePicker();
          case 1:
            return this.takePhoto();
          case 2:
            return this.getLocation();
          default:
        }
      },
    );
  };

  render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Open Additional Options"
        accessibilityHint="Allows you to select a photo from your album, take a new photo, send your location, or cancel"
        style={[styles.container]}
        onPress={this.onActionPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>
            +
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};