import React from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native'; import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

// Importing firestore 
const firebase = require('firebase');
require('firebase/firestore');

// Main Chat component
export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    //Firebase config info
    const firebaseConfig = {
      apiKey: "AIzaSyDJjSfWhV2hQ8am9wRebzaj1xkmMaOQhXc",
      authDomain: "chat-app-1289d.firebaseapp.com",
      projectId: "chat-app-1289d",
      storageBucket: "chat-app-1289d.appspot.com",
      messagingSenderId: "228901711004",
      appId: "1:228901711004:web:cebd35859797973be41159",
      measurementId: "G-2J6RPN7DN5"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");

    // Initial state
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
      },
      loggedInText: '',
      isConnected: false
    }
  }

  // Retrieves messages from AsyncStorage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    // Adds entered name to Chat header //
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({
      title: name,
    });

    //If online fetches from Firebase, else fetches from AsyncStorage
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');

        // Anonymous user authentication //
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }

          // Changes user state to active user
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
            },
            loggedInText: 'Hello there',
          });

          // Shows messages for current user
          this.referenceMessagesUser = firebase.firestore().collection("messages").where('uid', '==', this.state.uid);

          // Checks for changes and sorts messages
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);

        });
      } else if (!connection.isConnected) {
        console.log('offline');
        this.setState({ isConnected: false });
        this.getMessages();
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  //Checks for changes to Collection
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Goes through each document 
    querySnapshot.forEach((doc) => {
      // gets the QueryDocumentSnapshot's data 
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name
        }
      });
    });
    this.setState({
      messages,
    });
  };

  // Adds Messages to Firestore DB
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user
    });
  }

  // Saves messages to AsyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Function to append new messages to messages state //
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessages();
        this.saveMessages();
      })
  }

  // Removes messages from AsyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
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

  //Removes input bar when offline
  renderInputToolBar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  render() {
    /* Imports name and background color from Start.js */
    let selectedColor = this.props.route.params.selectedColor;


    return (
      <View style={{ flex: 1, backgroundColor: selectedColor }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolBar.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
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

