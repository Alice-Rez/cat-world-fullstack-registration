import React from "react";
import { Link } from "react-router-dom";
import denied from "../assets/images/access_denied.svg";

export default function Error() {
  return (
    <section className="errorPage container">
      <img
        src={denied}
        alt="cat is sadly looking on computer, because her access was denied"
        className="message-image-lg"
      />
      <p className="alert-danger p-3 text-center">
        Authentication failed. Please <Link to="/login">login</Link> once again.
      </p>
    </section>
  );
}
