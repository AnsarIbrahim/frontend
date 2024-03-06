import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import CSRFToken from "../components/CSRFToken";
import { register } from "../actions/auth";

const Register = ({ register, isAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repassword: "",
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const { username, password, repassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === repassword) {
      register(username, password, repassword);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    navigate("/dashboard");
  } else if (accountCreated) {
    navigate("/login");
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Register</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <CSRFToken />
          <div className="mb-3 form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              placeholder="Enter username*"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              placeholder="Enter password*"
              required
              minLength="6"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repassword" className="form-label">
              Re-enter Password
            </label>
            <input
              type="password"
              className="form-control"
              id="repassword"
              name="repassword"
              value={repassword}
              onChange={(e) => onChange(e)}
              placeholder="Re-enter password*"
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <p className="mt-3">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
