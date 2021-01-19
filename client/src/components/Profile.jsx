import React, { Component } from "react";
import { loggContext } from "./context";
import ProfileInfo from "./ProfileInfo";

export default class Profile extends Component {
  static contextType = loggContext;
  render() {
    return (
      <React.Fragment>
        {this.context.visibility ? (
          <ProfileInfo />
        ) : (
          <div>The content is visible just for signed-in people</div>
        )}
      </React.Fragment>
    );
  }
}
