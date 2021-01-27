import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { loggContext } from "./context";

export default function Navigation() {
  const context = useContext(loggContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light my-3">
      <Link to="/home" className="navbar-brand">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span>&#9776;</span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/products" className="nav-link">
              About us
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/users" className="nav-link">
              Cat-Lovers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          {context.visibility ? (
            <li className="nav-item">
              <Link to="/update" className="nav-link">
                Settings
              </Link>
            </li>
          ) : null}
        </ul>
        <div>
          {context.visibility ? null : (
            <Link to="/register" className="nav-link">
              Sign up
            </Link>
          )}
        </div>
        <div>
          {context.visibility ? (
            <Link to="/log-out" className="nav-link">
              Log out
            </Link>
          ) : (
            <Link to="/log-in" className="nav-link">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
