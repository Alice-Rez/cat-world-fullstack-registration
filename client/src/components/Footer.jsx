import React from "react";
import logo from "../assets/images/logo-AR.svg";

export default function Footer() {
  return (
    <footer className="mt-5">
      <p>
        Ilustrations comes from{" "}
        <a href="https://icons8.com">https://icons8.com</a>
      </p>
      <p>
        &#169;2021 <img className="logo" src={logo} alt="Alice Rez logo" />{" "}
        Alice Rez
      </p>
    </footer>
  );
}
