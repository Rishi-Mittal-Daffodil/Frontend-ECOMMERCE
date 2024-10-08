import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import "./Navbar.css"; // External CSS file
import { useAuth } from "../../userContext/UserAuthContext";
import axios from "axios";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
function Navbar() {
  const navigate = useNavigate();
  const { isAuth, role } = useAuth();
  const [loading, setLoading] = useState();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/um/logout", {
        token: localStorage.getItem("user-token"),
      });
      toast.success('Logout Successfully')
      setLoading(false);
      if (res.status === 200) {
        localStorage.removeItem("user-token");
        navigate("/login");
        setTimeout(()=>{
          location.reload(false);
        } , 1500) ; 
      }
    } catch (error) {
      toast.error('Something Wrong While Logout')
    }
  };

  return (
    <>
      {loading ? <Loader /> : <></>} <div className="upperdiv"></div>
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
                <div onClick={() => handleLogout()}>Logout</div>
              </div>
            </div>
          ) : (
            <FaUser
              className="icon"
              onClick={() => navigate("/login")}
            ></FaUser>
          )}

          <div onClick={()=>navigate('/user/wishlist')} className="nav-dropdown-head">
            <FaRegHeart  className="icon" />
            <div className="nav-dropdown">
              <div>Wishlist</div>
            </div>
          </div>

          <div onClick={()=>navigate('/user/cart')} className="nav-dropdown-head">
            <FaShoppingCart  className="icon" />
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
