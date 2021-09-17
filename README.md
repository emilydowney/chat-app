# Chat App
A React Native Chat application, built using Expo and designed to function on iOS and Android devices. The app is intended to let users chat/instant message in real-time, as well as send images and user location. The app stores chat messages to the Google Firestore Database when online, and loads previous messages from AsyncStorage when offline. 

# Setup
* Clone this repo 
```git clone https://github.com/emilydowney/chat-app```
* Inside the project's main directory, install the needed dependencies.
```npm install```
* Install the Expo app
* Setup your own database using Google Firestore. For help with this process, see the documentation page: https://firebase.google.com/docs/firestore (In addition, be sure to change database information within the source code.)
* Run Expo in the terminal
```expo start```

# Links
The UI for this chat app was constructed using Gifted Chat:
https://github.com/FaridSafi/react-native-gifted-chat


# Features
* From the start page, users can enter their name which will be displayed at the top of the chat UI.
* Users can select from one of the available colors to set as their background.
* Clicking the "Start Chatting" button allows users to enter the chat room.
* Users can send and view messages in real-time while online.
* When offline, users can still read old messages. The input bar will disappear until the connection is re-established.
* After allowing permission, users can send and view images.
* Users can send their location if permission is given.



# Technologies Used
* JavaScript
* React Native
* Expo 
* Google Firestore Database