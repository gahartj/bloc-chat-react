import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
         console.log(snapshot);
       });
     }

  render() {
    return (
      <section className="room-data">
        {this.state.rooms.map(() =>
        return this.state.rooms;
      )}
      </section>
    );
  }
}

export default RoomList;
