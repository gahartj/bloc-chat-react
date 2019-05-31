import React from 'react';
import './App.css';
import RoomList from './components/RoomList';
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          #FearTheDeer
        </p>
        <aside id="sidebar">
          <RoomList firebase={firebase}/>
        </aside>
      </header>
    </div>
  );
}

export default App;
