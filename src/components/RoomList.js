import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      rooms: [],
      newRoom: ""
    };
  }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
         const room = snapshot.val();
         room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat( room ) })
       });
     }

  createRoom() {
      this.roomsRef.push({
      name: this.state.newRoom
    });
  }

  render() {
    return (
        <form>
          <div className="room-data">
            {Object.values(this.state.rooms).map((room, i) =>
              <div key={i}>{room.name}</div>
            )}
          </div>
          <br />
          <label>
            New Chat Room: <br />
            <input
              type="text"
              name="create"
              value={this.state.newRoom}
              onChange={e => this.setState({ newRoom: e.target.value })}
              placeholder="type here dude"
              /><br />
          </label>
            <input
              type="submit"
              name="submit"
              onClick={e => this.createRoom(e)}
              /><br />
        </form>
    );
  }
}

export default RoomList;
