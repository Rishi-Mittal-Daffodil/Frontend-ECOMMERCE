import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import "./Authpage.css";

function Authpage() {
  const [heading, setHeading] = useState("Login with The TrendiFY");
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  function handleLoginToggle() {
    setHeading("Login with The TrendiFY");
    navigate("/login");
  }
  function handleSignupToggle() {
    navigate("/signup");
    setHeading("Register with The TrendiFY");
  }

  useEffect(() => {
    if (pathname === "/signup") {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [pathname]);

  return (
    <>
      <div className="form-block-out">
        <div className="form-block-in">
          <p className="form-title">{heading}</p>
          <div className="heading">
            <div
              className={flag ? "heading-login" : "click-button-event"}
              onClick={() => handleLoginToggle()}
            >
              LOGIN
            </div>
            <div
              className={flag ? "click-button-event" : "heading-signup"}
              onClick={() => handleSignupToggle()}
            >
              REGISTER
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Authpage;
