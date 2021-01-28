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
import Messanger from "./components/Messanger";
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import Profile from "./components/Profile";
import RegisterFunction from "./components/RegisterFunction";
import Settings from "./components/Settings";
import Table from "./components/Table";

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
              {isLogged ? <Table /> : <Redirect to="/login" />}
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
            <Route path="/messanger">
              {isLogged ? <Messanger /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {isLogged ? (
                <Redirect to="/profile" />
              ) : (
                <Login
                  setIsLogged={setIsLogged}
                  setLoggedUser={setLoggedUser}
                  setUserId={setUserId}
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
            <Route path="/products">
              <Products />
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
