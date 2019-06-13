import React, { Component } from 'react';

 class User extends Component {

   componentDidMount() {
     this.props.firebase.auth().onAuthStateChanged( user => {
       this.props.setUser();
     });
   }

   signInWithPopup() {
     const provider = new this.props.firebase.auth.GoogleAuthProvider();
     this.props.firebase.auth().signInWithPopup( provider );
   }

   signOut() {
     this.props.firebase.auth().signOut();
   }

   render() {
     return (
       <div id="sign-in-out">
        <button onClick={() => this.signInWithPopup()}>Sign in here please. Or don't. That's fine too.</button><br />
        <button onClick={() => this.signOut()}>Sign out here. Or don't. You be you.</button>
        <div>
        {this.props.user.displayName === "" ? "Guest" : this.props.user.displayName}
        </div>
      </div>
    );
  }
}

 export default User;
