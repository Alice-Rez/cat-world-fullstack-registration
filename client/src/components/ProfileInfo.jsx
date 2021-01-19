import React, { useContext } from "react";
import { loggContext } from "./context";

export default function ProfileInfo() {
  const user = localStorage.getItem("userName");
  return (
    <div className="alert-success">
      Welcome {user}, here are your profile information
    </div>
  );
}
