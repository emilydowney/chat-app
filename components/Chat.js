import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let name = this.props.route.params.name;
    let selectedColor = this.props.route.params.selectedColor;

    this.props.navigation.setOptions({
      title: name,
    });

    return (
      <View style={styles.container}>
        <View style={styles.bgcolor(selectedColor)}>
          <Text>Chat here!</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1
  },
  bgcolor: (selectedColor) => ({
    selectedColor: selectedColor,
  })
});

