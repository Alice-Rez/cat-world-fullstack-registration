import React from "react";
import logo from "../assets/images/logo-AR.svg";

export default function Footer() {
  return (
    <footer>
      <p>
        Ilustrations comes from{" "}
        <a href="https://icons8.com">https://icons8.com</a>
      </p>
      <p>
        &#169;2020 <img className="logo" src={logo} alt="Alice Rez logo" />{" "}
        Alice Rez & Isabel Costa & Willoid
      </p>
    </footer>
  );
}
