import React, { Component } from 'react';
import Moment from 'moment';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = this.props.firebase.database().ref('Messages');

    this.state = {
      messages: [],
      newMessage: []
    };
  }

  componentDidMount() {
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
      return activeMessages;
  }

  createMessage(e) {
      e.preventDefault();
      this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.user.displayName
      });
      this.setState({ newMessage: "" });
  }

  formatTimeStamp(time) {
      const m = Moment(time);
      return m.format("M/D/YY, h:mm:ss a");
  }

  render() {
    return (
      <div>
        <div>
          <h2>{this.props.activeRoom.name}</h2>
        </div>
        <div className="message-data">
          {this.props.activeRoom.length === 0 ? "" : Object.values(this.getMessages(this.state.messages)).map((message, i) =>
            <div key={i}>
              {message.username}<br />
              {message.content}<br />
              {this.formatTimeStamp(message.sentAt)}<br /><br />
            </div>
          )}
        </div>
        {this.props.activeRoom.length === 0 ? "" :
        <form>
          <label>
            New Message: <br />
            <input
              type="text"
              name="create-message"
              value={this.state.newMessage}
              onChange={e => this.setState({ newMessage: e.target.value })}
              placeholder="write something cool"
              /><br />
          </label>
            <input
              type="submit"
              name="send"
              value="Send"
              onClick={e => this.createMessage(e)}
              /><br />
        </form>
      }
      </div>
    );
  }
}

export default MessageList;
