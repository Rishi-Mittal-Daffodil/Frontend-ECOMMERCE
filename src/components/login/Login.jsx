import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import "./Login.css";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      withCredentials: true // Send cookies with the request
    };
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/um/login" , data );
      // console.log(res);
      localStorage.setItem('user-token' , res.data.data.refreshToken) ;
      // document.cookie = `refreshToken=${res.data.data.refreshToken}; path=/; max-age=3600`;
      setLoading(false);
      navigate("/" );
      toast.success("login successfully");
      setTimeout(()=>{
        location.reload();
      }, 2000)
    } catch (error) {
      setLoading(false);
      toast.error('please enter valid credentials');
      console.log("error during login", error);
    }
  };
  return (
    <>
      {loading ? <Loader /> : <></>}
      <div className="form-block">
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
          <p className="login-text">
            Not registered?{" "}
            <a onClick={() => navigate("/signup")}>Register here</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;



/*
basically i am using refresh token first i store refresh-token in local storage after that i check that particular user token is 
valid for certain operation or not if yes than  i just allow user to use that route with their featutres also also i obtain the user role by this token   . 
*/