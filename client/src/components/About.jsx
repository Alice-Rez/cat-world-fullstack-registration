import React, { Component } from "react";
import profile from "../assets/images/profile.jpg";
import gingerCat from "../assets/images/gingerCat.svg";
import github from "../assets/images/github.png";
import icons8 from "../assets/images/icons8.svg";

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
              <li>
                Authentication using JWT & staying logged in after refreshing
                page
              </li>
              <li>encrypting (hashing) passwords using bcrypt</li>
            </ul>
          </div>

          <div>
            <strong className="text-left mb-2"> Feature plans:</strong>
            <ul className="text-left">
              <li>
                Adding possibility to write messages between users (than hide
                emails in the user list)
              </li>
              <li>add some forum function?</li>
              <li>
                more settings for user (cats and their names and photos for
                example :D )
              </li>
              <li>ratings for the posts in forum</li>
            </ul>
          </div>
        </section>
        <section>
          <h3>Credits</h3>
          <div className="d-flex flex-wrap justify-content-around">
            <div>
              <figure>
                <img
                  src={profile}
                  alt="picture of women with hat in blue dress with white dots"
                  className="credits-photo"
                />
              </figure>
              <h4>Alice Rez</h4>
              <p>
                Web developer that put this site together as a part of her
                1-year fullstack training
              </p>
              <p>
                <a href="https://github.com/Alice-Rez">
                  <img
                    src={github}
                    alt="octocat - github logo"
                    className="icon"
                  />
                </a>
              </p>
            </div>
            <div>
              <figure>
                <img
                  src={gingerCat}
                  alt="picture of ginger cat"
                  className="credits-photo"
                />
              </figure>
              <h4>Ginger cat</h4>
              <p>Awesome set of illustrations from icons8</p>
              <p>
                <a href="https://icons8.com/illustrations/illustration/ginger-cat-76">
                  <img src={icons8} alt="icons8 logo" className="icon" />
                </a>
              </p>
            </div>
          </div>
        </section>
      </section>
    );
  }
}
