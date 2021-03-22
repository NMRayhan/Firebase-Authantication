import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);


function App() {
  const [User, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const HandleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user
        const isUserAuthenticated = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(isUserAuthenticated);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }
  const HandleSignOut = () => {
    firebase.auth().signOut().then((res) => {
      const isUserAuthenticated = {
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(isUserAuthenticated)
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className="App">
      {
        User.isSignIn === false && <div>
          <h1>Please Sign in Your Account</h1>
        </div>
      }
      {
        User.isSignIn ? <button onClick={HandleSignOut}>Sign Out</button> : <button onClick={HandleSignIn}>Sign In</button>
      }
      {
        User.isSignIn && <div>
          <h2>Welcome, {User.name}</h2>
          <h3>Your Email : {User.email}</h3>
          <img src={User.photo} alt={User.name} />
        </div>
      }
    </div>
  );
}

export default App;
