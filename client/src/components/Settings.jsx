import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { loggContext } from "./context";
import { FaUserCircle } from "react-icons/fa";

export default function Settings() {
  const { userID } = useContext(loggContext);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const [data, setData] = useState({ userID });
  const [success, setSuccess] = useState(false);
  const [photoSuccess, setPhotoSuccess] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `users/info/${userID}`,
    })
      .then((res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          setImage({ ...image, preview: res.data[0].profileImage });
        } else {
          console.log("you are not logged!");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const getValue = (e) => {
    setSuccess(false);
    setWarning(false);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getPhoto = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setSuccess(false);
    console.log("request send", data);
    Axios({
      method: "PUT",
      url: "/users/updatePWD",
      data: data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.nModified > 0) {
          setSuccess(true);
          // e.target.reset();
        } else {
          setWarning(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const submitPhoto = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", image.raw);
    formData.append("userID", userID);

    Axios({
      method: "PUT",
      url: "/users/updatePhoto",
      data: formData,
    })
      .then((res) => {
        console.log(res);
        setPhotoSuccess(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h2 className="text-info py-3 text-left">Change Password</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Current Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onInput={getValue}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            id="exampleInputPassword1"
            onInput={getValue}
          />
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-success btn-lg">
            Save
          </button>
        </div>
      </form>
      {success ? (
        <div className="alert-success m-3 p-3">Your password was changed</div>
      ) : null}
      {warning ? (
        <div className="alert-danger m-3 p-3">
          Your password could not be changed, please make sure you are using
          correct current password
        </div>
      ) : null}
      <h2 className="text-info py-3 text-left">Change profile photo</h2>
      <form encType="multipart/form-data" onSubmit={submitPhoto}>
        <div className="image-input">
          <label
            htmlFor="upload-button"
            className="mb-3 d-flex align-items-center"
          >
            {image.preview ? (
              <img
                src={image.preview}
                alt="profile-pic"
                className="rounded-circle ml-3 profile-photo"
              />
            ) : (
              <span>
                <FaUserCircle className="display-2" />
              </span>
            )}
            <div className="ml-3">
              <h6>Upload photo</h6>
              <small>image shall be in square format</small>
            </div>
          </label>

          <input
            type="file"
            name="userImg"
            className="d-none"
            id="upload-button"
            onChange={getPhoto}
          />
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-success btn-lg">
            Save
          </button>
        </div>
      </form>
      {photoSuccess ? (
        <div className="alert-success m-3 p-3">
          Your profile photo was changed
        </div>
      ) : null}
    </div>
  );
}
