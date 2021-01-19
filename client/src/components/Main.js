import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { loggContext } from "./context";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Navigation from "./Navigation";
import Products from "./Products";
import Profile from "./Profile";
import RegisterFunction from "./RegisterFunction";
import Settings from "./Settings";
import Table from "./Table";

export default function Main() {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [userID, setUserId] = useState();

  return (
    <loggContext.Provider
      value={{
        visibility: isLogged,
        user: loggedUser,
        userID: userID,
      }}
    >
      <Router>
        <Navigation />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/users">
            <Table />
          </Route>
          <Route path="/register">
            {isLogged ? <Redirect to="/profile" /> : <RegisterFunction />}
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/update">
            {isLogged ? <Settings /> : <Redirect to="/log-in" />}
          </Route>
          <Route path="/log-in">
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
          <Route path="/log-out">
            {isLogged ? (
              <Logout setIsLogged={setIsLogged} />
            ) : (
              <Redirect to="/log-in" />
            )}
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </loggContext.Provider>
  );
}
