import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = this.props.firebase.database().ref('Messages');

    this.state = {
      messages: [],
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

  // getMessages(messages) {
  //   let activeMessages = messages.map((message) => {
  //     if (message.roomId === this.props.activeRoom.key) {
  //       return message;
  //     }
  //   });
  //   if (activeMessages === null) {
  //     return [];
  //   } else {
  //     return activeMessages;
  //   }
  // }

  // <div>
  //   {Object.values(this.state.messages).map((message, i) =>
  //     <div key={i}>
  //       <div>{message.username}</div>
  //       <div>{message.content}</div>
  //       <div>{message.sentAt}</div>
  //     </div>
  //   )}
  // </div>


  render() {
    return (
      <div>
        <div>
          {this.props.activeRoom.name}
        </div>
        <div className="message-data" >
          {Object.values(this.props.activeRoom).map((message, i) =>
            <div key={i} onSelect={() => this.props.currentMessages(message)}>{message.username}{message.content}{message.sentAt}</div>
          )}
        </div>
      </div>
    );
  }
}

export default MessageList;
