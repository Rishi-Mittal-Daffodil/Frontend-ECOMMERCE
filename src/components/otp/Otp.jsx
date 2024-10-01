import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";

function Otp() {
  const [otp, setOtp] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state || {};
  console.log(otp, email);

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      email: email,
      otp: otp,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/um/user-request/verifyOtp",
        data
      );
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError("please enter valid otp");
      console.log("error during otp verification ", error);
    }
  };
  return (
    <>
      {loading ? <Loader /> : <></>}
      <div className="form-block">
        <div className="upper-header"></div>
        <h5 style={{ marginTop: "20px" }}>Verify your email</h5>
        <div style={{ color: "blue", fontSize: "0.5rem" }}>{error}</div>
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
        <button
          className="register-btn"
          style={{ width: "15rem" }}
          type="submit"
          onClick={(e) => handleOtpVerification(e)}
        >
          Verify
        </button>
        <p class="login-text">
          If verification failed please retry{" "}
          <a onClick={() => navigate("/signup")}>Retry</a>
        </p>
      </div>
    </>
  );
}

export default Otp;
