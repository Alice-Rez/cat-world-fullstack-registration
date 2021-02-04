import Axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import userExist from "../assets/images/user_exists.svg";
import register from "../assets/images/registration.svg";

export default function RegisterFunction() {
  const history = useHistory();

  const [data, setData] = useState({});
  const [msg, setMsg] = useState({});
  const [warning, setWarning] = useState(false);
  const [warningContent, setWarningContent] = useState("");
  const [warningValidation, setWarningValidation] = useState(false);

  const getValue = (e) => {
    setWarning(false);
    setWarningValidation(false);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    setMsg({});

    Axios({
      method: "POST",
      url: "/users/register",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.msg) {
          let msgChanged = res.data.msg.reduce((acc, item) => {
            acc[item.param] = true;
            return acc;
          }, {});
          setMsg(msgChanged);
        } else if (res.data.code === 11000) {
          setWarningContent(Object.keys(res.data.keyValue)[0]);
          setWarning(true);
        } else if (
          res.data._message === "users validation failed" ||
          res.data.errorSource === "BCRYPT"
        ) {
          setWarningValidation(true);
        } else {
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/ooo");
      });
  };

  return (
    <section className="registration container">
      <form onSubmit={submit} encType="multipart/form-data">
        <header className="d-flex align-items-center flex-wrap-reverse">
          <h2 className="display-4 py-3 text-left">Registration</h2>
          <figure className="my-3">
            <img
              src={register}
              alt="mobile with the bubble with cat inside of it as a metaphore for signing in"
              className="message-image"
            />
          </figure>
        </header>
        <p className="disclaimer">
          This is just a mock-up, please{" "}
          <strong>do not use real data for registration</strong> (no
          confirmation e-mail is sent for registration)
        </p>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="name"
            className="form-control"
            onInput={getValue}
            required
          />
          {msg.fullName ? (
            <small className="text-danger mt-1">
              Your full name shall contain just letters
            </small>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="mail">E-mail</label>
          <input
            type="text"
            name="email"
            id="mail"
            className="form-control"
            onInput={getValue}
            required
          />
          {msg.email ? (
            <small className="text-danger mt-1">
              E-mail do not correspond to typical rules for email
            </small>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="date">User name</label>
          <input
            type="text"
            name="uname"
            id="date"
            className="form-control"
            onInput={getValue}
            required
          />
          {msg.uname ? (
            <small className="text-danger mt-1">
              Please use just letters and numbers in your username
            </small>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            name="password"
            id="pwd"
            className="form-control"
            onInput={getValue}
            required
          />
          {msg.password ? (
            <small className="text-danger mt-1">
              Your password is too short, you need at least 10 characters
            </small>
          ) : null}
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-submit btn-lg">
            Register
          </button>
        </div>
        <p className="mt-3">
          If you are already registered, please <Link to="/login">login</Link>.
        </p>
        {warning ? (
          <div className="my-5 d-flex flex-wrap-reverse align-items-center message">
            <img
              src={userExist}
              alt="cat is sadly looking on mobile phone that display message, that user actually exists"
              className="message-image"
            />
            <p className="alert-danger p-3">
              User with this {warningContent} already exists, please log-in
            </p>
          </div>
        ) : null}
        {warningValidation ? (
          <p className="alert-danger p-3">Please fill all fields!</p>
        ) : null}
      </form>
    </section>
  );
}
