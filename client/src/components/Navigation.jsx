import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { loggContext } from "./context";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

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
            <Link to="/about" className="nav-link">
              About us
            </Link>
          </li>
          <li className="nav-item active">
            {context.visibility ? (
              <Link to="/users" className="nav-link">
                Cat-Lovers
              </Link>
            ) : null}
          </li>
          <li className="nav-item active">
            {context.visibility ? (
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            ) : null}
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            {context.visibility ? (
              <Link to="/profile" className="mb-0 nav-link">
                {context.profilePhoto ? (
                  <img
                    src={context.profilePhoto}
                    alt="profile-pic"
                    className="rounded-circle ml-3 profile-photo-navbar"
                  />
                ) : (
                  <span>
                    <FaUserCircle className="profile-photo-navbar" />
                  </span>
                )}
                <span className="ml-3">{context.user}</span>
              </Link>
            ) : (
              <Link to="/register" className="nav-link text-primary">
                Sign up
              </Link>
            )}
          </li>
          {context.visibility ? (
            <li className="nav-item nav-item active dropdown">
              <button
                className="nav-link dropdown-toggle btn"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <BsThreeDotsVertical />
              </button>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/messenger" className="nav-link">
                  Messenger
                </Link>
                <Link to="/settings" className="nav-link">
                  Settings
                </Link>
                <Link to="/delete" className="nav-link">
                  Delete account
                </Link>
                <div className="dropdown-divider"></div>
                <Link to="/logout" className="nav-link ">
                  Log out
                </Link>
              </div>
            </li>
          ) : (
            <li className="nav-item active">
              <Link to="/login" className="nav-link text-primary">
                Log in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
