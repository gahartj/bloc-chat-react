import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = this.props.firebase.database().ref('Messages');

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    console.log()
       this.messagesRef.on('child_added', snapshot => {
         const message = snapshot.val();
         message.key = snapshot.key;
         this.setState({ messages: this.state.messages.concat( message ) })
       });
     }

  getMessages(messages) {
    let activeMessages = messages.filter((message) =>
      message.roomId === this.props.activeRoom.key
    );
      console.log(activeMessages);
      console.log(messages);
      return activeMessages;
  }

  render() {
    return (
      <div>
        <div>
          <h2>{this.props.activeRoom.name}</h2>
        </div>
        <div className="message-data">
          {this.props.activeRoom.length === 0 ? "" : Object.values(this.getMessages(this.state.messages)).map((message, i) =>
            <div key={i}>{message.username}<br />{message.content}<br />{message.sentAt}<br /><br /></div>
          )}
        </div>
      </div>
    );
  }
}

export default MessageList;
