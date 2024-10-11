import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constants";
function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Please Write Correct Password");
      return;
    }

    const userObj = {
      firstName,
      lastName,
      email,
      password,
    };
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/um/user-request`, userObj);
      console.log(res.data);
      setLoading(false);
      navigate("/signup/verify-otp", { state: email });
      toast.success("Otp Sent to Your Email");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      {loading ? <Loader /> : <></>}
      <div className="form-block">
        <form className="Form" onSubmit={(e) => handleSignup(e)}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="FirstName *"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="lastName"
              value={lastName}
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="LastName"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID *"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password *"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={confirmPassword}
              id="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password *"
              required
            />
          </div>

          <button className="register-btn" type="submit">
            Next
          </button>
          <p className="login-text">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Login</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
