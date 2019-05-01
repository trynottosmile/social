import React, { useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { name, email, password, password2 } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();

    console.log("success");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign In</h1>
          <p className="lead text-center">Sign into DevConnector account</p>
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email Address"
                value={email}
                onChange={e => onChange(e)}
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                minLength="6"
                required
              />
            </div>

            <input
              type="submit"
              className="btn btn-info btn-block mt-4"
              value="Login"
            />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
