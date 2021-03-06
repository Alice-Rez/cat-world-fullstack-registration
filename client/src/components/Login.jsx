import Axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { loggContext } from "./context";
import login from "../assets/images/login.svg";
import denied from "../assets/images/access_denied.svg";

export default function Login(props) {
  const { setIsLogged, setProfilePhoto } = useContext(loggContext);

  const [loginData, setData] = useState({});
  const [warning, setWarning] = useState(false);

  let history = useHistory();

  const getData = (e) => {
    setWarning(false);
    setData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("request send", loginData);

    Axios({
      method: "POST",
      url: "/users/login",
      data: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.logged) {
          setIsLogged(true);
          props.setLoggedUser(res.data.uname);
          setProfilePhoto(res.data.profileImage);
          setData({});
        } else {
          setWarning(true);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/ooo");
      });
  };

  return (
    <section className="container login">
      <form onSubmit={submit}>
        <header className="d-flex align-items-center flex-wrap-reverse">
          <h2 className="display-4 py-3 text-left">Login</h2>
          <figure className="my-3 container">
            <img
              src={login}
              alt="cat pawn is clicking on the login button"
              className="message-image"
            />
          </figure>
        </header>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="mail"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onInput={getData}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onInput={getData}
            required
          />
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-submit btn-lg">
            Login
          </button>
        </div>
        <p className="mt-3">
          If you have no account already, please{" "}
          <Link to="/register">sign up</Link>. Testing login data:
          jane.doe@gmail.com, password 12345678910
        </p>
        {warning ? (
          <div className="my-5 d-flex flex-wrap-reverse align-items-center message">
            <img
              src={denied}
              alt="cat is sadly looking on computer, because her access was denied"
              className="message-image"
            />
            <p className="alert-danger p-3">
              Access denied! Combination of the e-mail and password is not
              correct
            </p>
          </div>
        ) : null}
      </form>
    </section>
  );
}
