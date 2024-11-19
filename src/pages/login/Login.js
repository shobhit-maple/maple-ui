import React, {useEffect, useState} from "react"
import "./Login.css"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"
import ApiClient from "../../components/ApiClient/ApiClient";

const Login = () => {

  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("nitw.shobhit@gmail.com");
  const [password, setPassword] = useState("change");

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/home");
    }
  }, [navigate]);

  function sendLoginRequest() {
    const reqBody = {
      email_address: emailAddress,
      password: password,
    };

    ApiClient.post("auth/login", reqBody)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("jwt", JSON.stringify(response.data))
        navigate("/home");
        toast.success('You have successfully logged in!', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else if (response.status === 400) {
        toast.warn('Please check the details and try again!', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    });
  }

  return (
      <div className="login-form-container">
        <div className="login-form">
          <div className="login-form-content">
            <h3 className="login-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                  type="email"
                  value={emailAddress}
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                  type="password"
                  value={password}
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-primary login-btn"
                    onClick={() => sendLoginRequest()}>
              Sign in
            </button>
          </div>
        </div>
      </div>
  );
};

export default Login;