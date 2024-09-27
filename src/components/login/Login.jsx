import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error , setError] = useState() ; 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        data
      );
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setError("please enter valid credentials")
      console.log("error during login", error);
    }
  };
  return (
    <>
      <div className="form-block">
        <div className="upper-header">
          <h2>Login</h2>
        </div>
        <hr className="horizontal-line" />
        {/* <div  style={{color:'red' , fontSize:'0.5rem'}} >{error}</div> */}
        <form className="Form" onSubmit={(e) => handleLogin(e)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="register-btn" type="Submit">
            Login
          </button>
          <p class="login-text">
            Not registered ?{" "}
            <a onClick={() => navigate("/signup")}>Register here</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
