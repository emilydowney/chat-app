import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { color } from 'react-native-reanimated';

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    /* Imports name and background color from Start.js */
    let name = this.props.route.params.name;
    let selectedColor = this.props.route.params.selectedColor;

    this.props.navigation.setOptions({
      title: name,
    });

    return (
      <View style={[styles.container, { backgroundColor: selectedColor }]}>
        <Text style={{ color: '#fff' }}>Chat here!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});

