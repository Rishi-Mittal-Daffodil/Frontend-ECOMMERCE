import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constants";

function Otp() {
  const [otp, setOtp] = useState();
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
        `${BASE_URL}/um/user-request/verifyOtp`,
        data
      );
      setLoading(false);
      navigate("/login");
      toast.success("User Registered Successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Please Enter Valid OTP");
      console.log("error during otp verification ", error);
    }
  };
  return (
    <>
      {loading ? <Loader /> : <></>}
      <div className="form-block">
        <div className="upper-header"></div>
        <h5 style={{ marginTop: "20px" }}>Verify your email</h5>
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
        <p className="login-text">
          If verification failed please retry{" "}
          <a onClick={() => navigate("/signup")}>Retry</a>
        </p>
      </div>
    </>
  );
}

export default Otp;
