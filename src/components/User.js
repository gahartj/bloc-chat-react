import React, { Component } from 'react';

 class User extends Component {

   componentDidMount() {
     this.props.firebase.auth().onAuthStateChanged( user => {
       this.props.setUser(user);
     });
   }

   signInWithPopup() {
     const provider = new this.props.firebase.auth.GoogleAuthProvider();
     this.props.firebase.auth().signInWithPopup( provider );
   }

   signOut(user) {
     console.log(user)
     this.props.firebase.auth().signOut();
   }

   render() {
     const { user } = this.props;
     let displayName = "Guest";
     if (user !== null) {
       displayName = user.displayName === "" ? displayName : user.displayName;
     }
     return (
       <div id="sign-in-out">
        <button onClick={() => this.signInWithPopup()}>Sign in here please. Or don't. That's fine too.</button><br />
        <button onClick={() => this.signOut()}>Sign out here. Or don't. You be you.</button>
        <div>{displayName}</div>
      </div>
    );
  }
}

 export default User;
