import React, { useEffect } from "react";
import Axios from "axios";

export default function Logout(props) {
  useEffect(() => {
    console.log("axios calling");
    Axios({
      method: "GET",
      url: "/users/logout",
    })
      .then((res) => {
        console.log(res);
        delete localStorage.userName;
        // delete localStorage.isLogged;
        props.setIsLogged(res.data.logged);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div></div>;
}
