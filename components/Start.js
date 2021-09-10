import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';


export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      selectedColor: ''
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../img/background.png')} resizeMode="cover"
        style={styles.imageBack}
      >

        <View style={styles.start}>
          <Text style={styles.title}>Chat App</Text>
          <View style={styles.box}>
            <View style={styles.input}>
              <Image
                style={styles.img}
                source={require("../img/icon.png")}
              />
              <TextInput
                style={styles.inputText}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.text}
                placeholder='Your Name'
              />
            </View>

            <Text style={styles.colorPick}>Choose Background Color:</Text>
            <Text style={styles.colorContainer}>
              <TouchableOpacity
                style={[styles.dark, styles.colors]}
                onPress={() => this.setState({ selectedColor: "#090C08" })}
              >
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.purple, styles.colors]}
                onPress={() => this.setState({ selectedColor: "#474056" })}
              >
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.gray, styles.colors]}
                onPress={() => this.setState({ selectedColor: "#8A95A5" })}
              >
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.green, styles.colors]}
                onPress={() => this.setState({ selectedColor: "#B9C6AE" })}
              >
              </TouchableOpacity>
            </Text>

            <TouchableOpacity
              style={styles.wrap}
              onPress={() => {
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  selectedColor: this.state.selectedColor
                })
              }}>
              <Text style={styles.button}>Start Chatting</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ImageBackground >
    );
  }
}

const styles = StyleSheet.create({
  imageBack: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  img: {
    position: 'absolute',
    top: 10,
    left: 10
  },
  start: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff'
  },
  box: {
    flex: 0.44,
    marginTop: 80,
    backgroundColor: '#fff',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  input: {
    borderColor: '#757083',
    borderWidth: 2,
    width: '88%',
    height: '20%',
    padding: 10,
    paddingLeft: 40,
    backgroundColor: '#fff',
  },
  inputText: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
  },
  wrap: {
    width: '88%%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#757083',
  },
  button: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  colorPick: {
    fontSize: 16,
    fontWeight: '300',
    color: "#757083",
    alignSelf: 'flex-start',
    marginLeft: 20
  },
  colors: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  colorContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 20
  },
  dark: {
    backgroundColor: '#090C08',
  },
  purple: {
    backgroundColor: '#474056'
  },
  gray: {
    backgroundColor: '#8A95A5'
  },
  green: {
    backgroundColor: '#B9C6AE'
  }
});
