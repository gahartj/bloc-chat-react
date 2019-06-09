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

    // getMessages() {
    //   var ref = this.state.messages; ref.orderByChild("roomId").equalTo(this.props.activeRoom.key).on("child_added", function(snapshot) {
    //   console.log(snapshot.key("It's working!"));
    //   })
    // }

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

  // <div className="message-data" >
  //   {Object.values(this.state.messages).map((message, i) =>
  //     <div key={i}>{message.username}{message.content}{message.sentAt}</div>
  //   )}
  // </div>

  render() {
    return (
      <div>
        <div>
          {this.props.activeRoom.name}
        </div>
        <div className="message-data">
          {this.props.getMessages()}
        </div>
      </div>
    );
  }
}

export default MessageList;
