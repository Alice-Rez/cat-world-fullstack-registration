import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { loggContext } from "./components/context";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Error from "./components/Error";
import Profile from "./components/Profile";
import RegisterFunction from "./components/RegisterFunction";
import Settings from "./components/Settings";
import Users from "./components/Users";
import Messenger from "./components/Messenger";

export default function Main() {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [userID, setUserId] = useState();
  const [profilePhoto, setProfilePhoto] = useState();

  return (
    <loggContext.Provider
      value={{
        visibility: isLogged,
        user: loggedUser,
        userID: userID,
        profilePhoto: profilePhoto,
        setIsLogged: setIsLogged,
      }}
    >
      <Router>
        <div className="wrapper">
          <Navigation />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/users">
              {isLogged ? <Users /> : <Redirect to="/login" />}
            </Route>
            <Route path="/register">
              {isLogged ? <Redirect to="/profile" /> : <RegisterFunction />}
            </Route>
            <Route path="/profile">
              {isLogged ? <Profile /> : <Redirect to="/login" />}
            </Route>
            <Route path="/settings">
              {isLogged ? <Settings /> : <Redirect to="/login" />}
            </Route>
            <Route path="/messenger">
              {isLogged ? <Messenger /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {isLogged ? (
                <Redirect to="/profile" />
              ) : (
                <Login
                  setLoggedUser={setLoggedUser}
                  setUserId={setUserId}
                  setProfilePhoto={setProfilePhoto}
                />
              )}
            </Route>
            <Route path="/logout">
              {isLogged ? (
                <Logout setIsLogged={setIsLogged} />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/error">
              <Error />
            </Route>
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </loggContext.Provider>
  );
}
