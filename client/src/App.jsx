import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
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
import Maintance from "./components/Maintance";
import Profile from "./components/Profile";
import RegisterFunction from "./components/RegisterFunction";
import Settings from "./components/Settings";
import Users from "./components/Users";
import Messenger from "./components/Messenger";

export default function Main() {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [profilePhoto, setProfilePhoto] = useState();

  let history = useHistory();

  useEffect(() => {
    Axios({
      method: "GET",
      url: `users/auth`,
    })
      .then((res) => {
        if (res.data.authorized) {
          console.log(res.data);
          setIsLogged(true);
          setLoggedUser(res.data.uname);
          setProfilePhoto(res.data.profileImage);
        } else {
          setIsLogged(false);
        }
      })
      .catch((err) => {
        console.log(err);
        // history.push("/ooo");
      });
  }, []);

  return (
    <loggContext.Provider
      value={{
        visibility: isLogged,
        user: loggedUser,
        profilePhoto,
        setIsLogged,
        setProfilePhoto,
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
                <Login setLoggedUser={setLoggedUser} />
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
            <Route path="/ooo">
              <Maintance />
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
