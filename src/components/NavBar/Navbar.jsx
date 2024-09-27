import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import "./Navbar.css"; // External CSS file
function  Navbar(){
  // const navigate = useNavigate() ; 

  
  return (
    <>
      <div className="upperdiv"></div>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">TrenDIFY</div>
          <a href="/" className="home-link">
            Home
          </a>
        </div>
        <div className="navbar-right">
          <FaSearch className="icon" />
          <FaUser href="/login" className="icon" > </FaUser> 
          <FaRegHeart  className="icon" />
          <FaShoppingCart className="icon" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
