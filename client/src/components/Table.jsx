import React, { useState, useEffect } from "react";
import Axios from "axios";

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
    <main className="container d-flex justify-content-center py-5">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">E-mail</th>
            <th scope="col">User Name</th>
            <th scope="col">Full name</th>
            <th scope="col"> Photo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.username || item.uname}</td>
                <td>{item.fullname || item.fullName}</td>
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
    </main>
  );
}
