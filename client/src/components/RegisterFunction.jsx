import Axios from "axios";
import React, { useState } from "react";
import { FaMagento, FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function RegisterFunction() {
  const history = useHistory();

  const [data, setData] = useState({});
  const [msg, setMsg] = useState({});
  const [warning, setWarning] = useState(false);
  const [warningContent, setWarningContent] = useState("");

  const getValue = (e) => {
    setWarning(false);
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
        } else {
          history.push("/log-in");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="container" onSubmit={submit} encType="multipart/form-data">
      <h2 className="display-4 text-info py-3 text-left">Registration</h2>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="fullName"
          id="name"
          className="form-control"
          onInput={getValue}
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
          required
          className="form-control"
          onInput={getValue}
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
          required
          className="form-control"
          onInput={getValue}
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
          required
          className="form-control"
          onInput={getValue}
        />
        {msg.password ? (
          <small className="text-danger mt-1">
            Your password is too short, you need at least 10 characters
          </small>
        ) : null}
      </div>
      <div className="text-right">
        <button type="submit" className="btn btn-success btn-lg">
          Register
        </button>
      </div>
      {warning ? (
        <div className="alert-danger m-3 p-3">
          User with this {warningContent} already exists, please log-in
        </div>
      ) : null}
    </form>
  );
}
