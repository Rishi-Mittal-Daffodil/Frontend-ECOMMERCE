import React, { useState } from "react";
import {useNavigate , useLocation } from "react-router-dom";
import axios from "axios";

function Otp() {
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState();
  const [error , setError] = useState() ; 
  const navigate = useNavigate() ; 
  console.log(otp , email);

  const handleOtpVerification= async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      otp : otp,
    };

    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/login/verify-otp", data);
      navigate("/home");
    } catch (error) {
      setError('please enter valid otp')
      console.log("error during otp verification ", error);
    }
  };
  return (
    <>
      <div className="form-block">
        <div className="upper-header" >
        </div>
          <h2 >Verify your email</h2>
        
        <div style={{color:'red' , fontSize:'0.5rem'}} >{error}</div>
        <div className="form-group">
          <label htmlFor="OTP">OTP</label>
          <input
            type="text"
            name="otp"
            id="otp"
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button className="register-btn" style={{width: '15rem'}}  type="submit" onClick={(e)=>handleOtpVerification(e)}>
          Verify
        </button>
        <p class="login-text">If verification failed please retry  <a onClick={()=>navigate('/login')}>Retry</a></p>
      </div>
    </>
  );
}

export default Otp;
