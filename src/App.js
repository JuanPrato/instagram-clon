import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import ImageUpload from './components/imageUpload/ImageUpload'
import { db, auth } from './assets/static/firebase';
import Controls from './components/controls/Controls';

function App() {

  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser){
        //User Log in
        console.log(authUser);
        setUser(authUser);

      } else {
        //User Log out
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => (
        {
          id : doc.id,
          post : doc.data()
        }
      )))
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();
    
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => {
      alert(error.message);
      return false;
    });
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message))
  }

  return (
    <div className="app">

      {/* Header */}
      <Header
        email = {email}
        setEmail = {setEmail}
        password = {password}
        setPassword = {setPassword}
        username = {username}
        setUsername = {setUsername}
        signUp = {signUp}
        signIn = {signIn}
        user = {user}
      />

      {/* Upload Images TODO: Poner esto en una vista separada al desplazar hacia un cosatado */}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} email={user.email}/>
      ) : (
        <h4>Logueate Capo</h4>
      )}

      <Main
        posts = {posts}
        user = {user}
      />

      {/* Controls */}
      <Controls/>
    </div>
  );
}

export default App;
