import React from "react";
import { Link } from "react-router-dom";
import cat from "../assets/images/home_desktop.svg";

export default function Home() {
  return (
    <header className="d-flex align-items-center mt-3 flex-wrap-reverse">
      <div className="d-flex flex-column justify-content-center text-center ">
        <h1 className="display-1 mx-auto mb-5">Cat world</h1>
        <p className="lead">
          {" "}
          Join our cat-loving community and explore new cat illustration on each
          page!
        </p>
        <p className="lead">
          {" "}
          Find others cat-lovers and have a chat with them :)
        </p>
        <div className="text-center my-5">
          <Link to="/register" className="btn btn-lg btn-cta">
            Get started
          </Link>
        </div>
      </div>
      <figure className="d-flex align-items-center justify-content-center">
        <img
          src={cat}
          alt="sitting happy cat looking on opened laptop with heart in her pawn"
        />
      </figure>
    </header>
  );
}
