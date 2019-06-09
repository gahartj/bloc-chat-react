import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import * as firebase from 'firebase';

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAX3wffT4ds3bu59gk8ApQR4bxN-nMcpOQ",
    authDomain: "bloc-chat-react-646ca.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-646ca.firebaseio.com",
    projectId: "bloc-chat-react-646ca",
    storageBucket: "bloc-chat-react-646ca.appspot.com",
    messagingSenderId: "8502926731",
    appId: "1:8502926731:web:a23c8f1f005aade5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      activeRoom: []
      // currentMessages: []
    };
  }

  selectedRoom(room) {
    console.log(room);
    this.setState({ activeRoom: room });
  }

  getMessages() {
    var ref = this.state.messages; ref.orderByChild("roomId").equalTo(this.props.activeRoom.key).on("child_added", function(snapshot) {
    console.log(snapshot.key("It's working!"));
    })
  }

  // currentMessages(message) {
  //   console.log(message);
  //   this.setState({ currentMessages: message});
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <aside id="sidebar">
            <RoomList firebase={firebase} selectedRoom={(room) => this.selectedRoom(room)} />
          </aside>
          <div id="message-list" getMessages={() => this.getMessages()}>
           <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
