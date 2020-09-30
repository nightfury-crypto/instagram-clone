import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import './App.css';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
// import Profile from "./Profile";
import Welcome from "./Welcome";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: 2,
    boxShadow: theme.shadows[7],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [usersp, setUsersp] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);

      } else {
        setUser(null);
      }
    })



    // ------------------------------------------------------------------
    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  useEffect(() => {
    db.collection('usersp').onSnapshot(snapshot => {
      setUsersp(snapshot.docs.map(doc => ({
        id: doc.id,
        usersp: doc.data()
      })));
    })
  }, []);

  // Sign Up
  const signUp = (event) => {
    event.preventDefault();


    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))

    setOpen(false);
    return <Redirect to="/home" />;

  }

  // Sign In
  const SignIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false);
    return <Redirect to="/home" />;
  }


  // logout
  const logout = (event) => {
    event.preventDefault();


    auth.signOut();
    window.location.reload(false);
  }

  // -------------------------------------------------
  return (
    <div className="App">
      <Router>
        <Switch>


          {/* likes */}
          <Route path="/notifications">
            <Header />
          </Route>

          {/*  Image Upload  */}
          <Route path="/upload">
            <Header />
            {user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
                // <Redirect to="/" />
                <h2>login please</h2>
              )}
          </Route>

          {/* profile  */}
          <Route path="/profile">
            <Header />
            {/* {
              usersp.map(({ id, usersp }) => (
                <Profile key={id} user={user} name={usersp.name} bio={usersp.bio} />
              ))
            } */}

            {user ? (
              <Button className="app_logout" onClick={logout}>Logout</Button>
            ) : (
                <Redirect to="/" />
              )}
          </Route>


          {/* home */}
          <Route path="/home">
            <Header className="app_header" />
            {
              posts.map(({ id, post }) => (
                <Post key={id} postId={id} likes={0} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
              ))
            }


          </Route>
          {/* <Router path="/register">
            <Signups/>
          </Router> */}

          {/* welcome */}
          <Route path="/">
            <Welcome />
            <img className="welcome_image" src="data:image/jpeg;base64,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"></img>


            {user ? (
              <Redirect to="/home" />
            ) : (
                <div className="app_loginContainer">
                  <Button onClick={() => setOpen(true)}>SignUp</Button>
                  <Button onClick={() => setOpenSignIn(true)}>SignIn</Button>
                </div>
              )}

            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper}>


                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
                <form className="app_signup">


                  <Input
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                  <Button onClick={signUp}>SignUp</Button>


                </form>
              </div>
            </Modal>

            <Modal
              open={openSignIn}
              onClose={() => setOpenSignIn(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper}>


                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
                <form className="app_signup">
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                  <Button onClick={SignIn}>SignIn</Button>


                </form>
              </div>
            </Modal>
            {/* <ImageUpload /> */}
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
