import Axios from "axios";
import React, { useState } from "react";

export default function Login(props) {
  const [loginData, setData] = useState({});
  const [warning, setWarning] = useState(false);

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
          props.setIsLogged(true);
          props.setLoggedUser(res.data.uname);
          // localStorage.setItem("isLogged", true);
          localStorage.setItem("userName", res.data.uname);
          props.setUserId(res.data.email);
        } else {
          setWarning(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h2 className="display-4 py-3 text-left">Login</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="mail"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onInput={getData}
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
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-submit btn-lg">
            Login
          </button>
        </div>
      </form>
      {warning ? (
        <div className="alert-danger m-3 p-3">
          {" "}
          Combination of the e-mail and password is not correct
        </div>
      ) : null}
    </div>
  );
}
