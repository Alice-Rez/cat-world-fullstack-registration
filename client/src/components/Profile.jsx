import React, { Component } from "react";
import { loggContext } from "./context";
import profile from "../assets/images/profile.svg";

export default class Profile extends Component {
  static contextType = loggContext;
  render() {
    return (
      <section className="profile text-center">
        <h2 className="display-4 mb-3">Welcome {this.context.user}</h2>
        <p>
          This is your profile page. Enjoy the nice cat profile illustration!
        </p>
        <img
          src={profile}
          alt="profile page of ginger cat - with profile photo and information"
          className="image-full"
        />
      </section>
    );
  }
}
