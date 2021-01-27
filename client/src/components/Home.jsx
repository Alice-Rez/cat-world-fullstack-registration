import React from "react";
import { Link } from "react-router-dom";
import cat from "../assets/images/home_desktop.svg";

export default function Home() {
  return (
    <header className="d-flex align-items-center mt-3">
      <div className="d-flex flex-column justify-content-center text-center">
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
        <div className="text-center">
          <Link to="/register" className="btn btn-lg mt-5 btn-cta">
            Get started
          </Link>
        </div>
      </div>
      <img
        src={cat}
        alt="sitting happy cat looking on opened laptop with heart in her pawn"
      />
    </header>
  );
}
