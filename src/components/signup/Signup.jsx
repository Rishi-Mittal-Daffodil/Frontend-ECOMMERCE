import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css'
import youtube from '../asset/ecommerce-logo.png'

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [fullname, setFullname] = useState();
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error , setError] = useState() ; 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("username", name);
    formdata.append("fullname", fullname);
    formdata.append("email", email);
    formdata.append("password", password);
    if (avatar) formdata.append("avatar", avatar, avatar.name);
    if (coverImage) formdata.append("coverImage", coverImage, coverImage.name);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        formdata
      );
      console.log(res.data);
      navigate("/verify-otp", { state: email });
    } catch (error) {
      setError('something went wrong while')
      console.error("Error during signup:", error);
    }
  };
  return (
    <>
      <div className="form-block">
        <div className="upper-header">
          <img id="logo" src={youtube} alt="logo" />
          <h2>Register</h2>
        </div>
        <hr className="horizontal-line" />
        <div  style={{color:'red' , fontSize:'0.5rem'}} >{error}</div>
        <form className="Form" onSubmit={(e) => handleSignup(e)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullname">Full name</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              onChange={(e) => setFullname(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="image">Avatar</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(e) => {
                setAvatar(e.target.files[0]);
                console.log(e.target.files);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Cover image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              id="coverImage"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>

          <button className="register-btn" type="submit">Register</button>
          <p class="login-text">Already have an account? <a onClick={()=>navigate('/login')}>Login</a></p>
        </form>
      </div>
    </>
  );

  // #3c3c3c
}

export default Signup;
