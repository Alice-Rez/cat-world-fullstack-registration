import React, { useState, useEffect } from "react";
import Axios from "axios";
import lovers from "../assets/images/lovers.svg";

export default function Table() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "/users/all",
    })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="container py-5 users">
      <header className="d-flex align-items-center justify-content-start flex-wrap">
        <img
          src={lovers}
          alt="cat sending hearts in direction of the headline"
          className="message-image"
        />
        <h2 className="display-4 py-5 text-left">Cat Lovers</h2>
      </header>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">E-mail</th>
            <th scope="col">User Name</th>
            <th scope="col"> Photo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.username || item.uname}</td>
                <td>
                  <img
                    src={item.profileImage}
                    alt=""
                    className="profile-photo rounded-circle"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
