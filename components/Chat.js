import React, { Component } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, Text } from 'react-native';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({
      title: name,
    });

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: this.props.route.params.name + ' entered the chat.',
          createdAt: new Date(),
          system: true,
        },
      ]
    })
  }

  // Function to append new messages to messages state //
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.message, messages),
    }))
  }

  //Function to alter chat bubble color//
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    /* Imports name and background color from Start.js */
    let selectedColor = this.props.route.params.selectedColor;


    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          style={{ backgroundColor: selectedColor }}
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
        }
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

