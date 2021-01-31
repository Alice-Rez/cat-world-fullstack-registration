import React from "react";
import nomsg from "../assets/images/no_message.svg";

export default function Messenger() {
  return (
    <section className="profile text-center">
      <h2 className="display-4 mb-3">Messenger</h2>
      <img
        src={nomsg}
        alt="profile page of ginger cat - with profile photo and information"
        className="image-full"
      />
      <p className="alert-danger p-3">You have no message</p>
    </section>
  );
}
