import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/um/login", data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError("please enter valid credentials");
      console.log("error during login", error);
    }
  };
  return (
    <>
      {loading ? <Loader /> : <></>}
      <div className="form-block">
        <div style={{ color: "red", fontSize: "0.5rem" }}>{error}</div>
        <form className="Form" onSubmit={(e) => handleLogin(e)}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email ID *"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password *"
            />
          </div>
          <button className="register-btn" type="Submit">
            Login
          </button>
          <p class="login-text">
            Not registered?{" "}
            <a onClick={() => navigate("/signup")}>Register here</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
