import React, { Component } from "react";

export default class RegisterUser extends Component {
  state = {
    users: [],
    currUser: {},
  };
  getValue = (e) => {
    this.setState({
      currUser: { ...this.state.currUser, [e.target.name]: e.target.value },
    });
  };
  registerUserNow = (e) => {
    e.preventDefault();
    this.setState({ users: [...this.state.users, this.state.currUser] });
  };
  displayTable = () => {
    // (<table className="mt-5">
    //      <thead>
    //     <tr>
    //       <th>Name</th>
    //       <th>E-mail</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {this.state.users.map((user)=>{
    //        (<tr>
    //        <td>{user.name}</td>
    //         <td>{user.email}</td>
    //     </tr>)
    //     })}
    //   </tbody>
    // </table>)
  };
  render() {
    return (
      <div className="container">
        <h2>Registration</h2>
        <form onSubmit={this.registerUserNow}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              onChange={this.getValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={this.getValue}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={this.getValue}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <table className="mt-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) =>{return (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            )} )}
          </tbody>
        </table>
      </div>
    );
  }
}
