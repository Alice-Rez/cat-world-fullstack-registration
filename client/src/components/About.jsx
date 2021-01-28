import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <section className="about text-center">
        <h2 className="display-4 py-5 ">About us</h2>
        <p>
          This page was created as a exercise for creating fullstack MERN user
          interface.{" "}
        </p>
        <section className="lists d-flex flex-wrap justify-content-between">
          <div>
            <strong className="text-left mb-2">Implemented are:</strong>
            <ul className="text-left">
              <li>
                Sign up with displaying error messages when something goes
                wrong.
              </li>
              <li>
                Login with displaying error messages when data are not corrected
              </li>
              <li>
                Profile page with customized welcome (greeting with user name)
              </li>
              <li>
                Parts of the page (user list, profile, settings, messages)
                visible just when logged-in
              </li>
              <li>Sign-in and Login links visible just when not logged in</li>
              <li>
                Possibility to change password (necessity to insert also current
                password) or add profile image ({" "}
                <em>
                  function just locally, not in deployed version on heroku
                </em>{" "}
                )
              </li>
              <li>
                Basic validation of the form data on backend (email & username
                unique, email have to be in form of email although input is just
                type text, fullname can contain just letters & spaces, username
                just letters & numbers, password has to have at least 10
                characters )
              </li>
              <li>
                data are also trimmed and escaped at backend before putting them
                to database.{" "}
              </li>
              <li>Database schema using Mongoose</li>
            </ul>
          </div>

          <div>
            <strong className="text-left mb-2"> feature plans</strong>
            <ul className="text-left">
              <li>
                Adding possibility to write messages between users (than hide
                emails in the user list)
              </li>
              <li>encrypting (hashing) passwords</li>
              <li>Authentication using JWT</li>
            </ul>
          </div>
        </section>
        <section>
          <h3>Credits</h3>
          <div></div>
        </section>
      </section>
    );
  }
}
