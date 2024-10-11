import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import "./Navbar.css"; // External CSS file
import { useAuth } from "../../userContext/UserAuthContext";
import { handleLogout } from "../../services/ManageDialog";
function Navbar() {
  const navigate = useNavigate();
  const { isAuth, role } = useAuth();
  useEffect(() => {
    setTimeout(() => {
      console.log("hello");
    }, 1000);
  }, [isAuth]);
  async function handleLogoutFunctionality() {
    await handleLogout();
  }
  return (
    <>
      <div className="upperdiv"></div>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo" onClick={() => navigate("/")}>
            TrenDIFY
          </div>
          <div className="nav-dropdown-head">
            Categories
            <div className="nav-dropdown">
              <div>Mens</div>
              <div>Womens</div>
              <div>Kids</div>
              <div>More</div>
            </div>
          </div>
          {isAuth ? (
            role === "admin" ? (
              <div className="nav-dropdown-head">
                Product
                <div className="nav-dropdown">
                  <div onClick={() => navigate("/products/new")}>
                    Create Product
                  </div>
                  <div>Edit Product</div>
                  <div>Get Product</div>
                </div>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="navbar-right">
          <div className="nav-dropdown-head">
            <FaSearch className="icon" />
            <div className="nav-dropdown">
              <div>Search</div>
            </div>
          </div>

          {isAuth ? (
            <div className="nav-dropdown-head">
              <FaUser className="icon"></FaUser>
              <div className="nav-dropdown">
                <div onClick={() => navigate("/user/profile")}>Profile</div>
                <div onClick={() => handleLogoutFunctionality()}>Logout</div>
              </div>
            </div>
          ) : (
            <FaUser
              className="icon"
              onClick={() => navigate("/login")}
            ></FaUser>
          )}

          <div
            onClick={() => navigate("/user/wishlist")}
            className="nav-dropdown-head"
          >
            <FaRegHeart className="icon" />
            <div className="nav-dropdown">
              <div>Wishlist</div>
            </div>
          </div>

          <div
            onClick={() => navigate("/user/cart")}
            className="nav-dropdown-head"
          >
            <FaShoppingCart className="icon" />
            <div className="nav-dropdown">
              <div>Cart</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
