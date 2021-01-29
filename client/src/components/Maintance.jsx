import React from "react";
import OOO from "../assets/images/OOO.svg";

export default function Error() {
  return (
    <section className="errorPage container">
      <img
        src={OOO}
        alt="cat has plug in her hand - it is not in socket!"
        className="message-image-lg"
      />
      <div className="alert-danger p-3 text-center">
        <p className="mb-0">
          We are terribly sorry, but our service is currently out of order.
        </p>
        <p>Please try it again later</p>
      </div>
    </section>
  );
}
