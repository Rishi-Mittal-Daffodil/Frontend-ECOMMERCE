import React from "react";
import "./EmptyWishlist.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../userContext/UserAuthContext";

function EmptyWishlist() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  return (
    <div className="wishlist-emp-container">
      <img
        src="https://www.thesouledstore.com/static/img/wishList-empty-icon.fd2a993.png"
        alt="Empty Wishlist Icon"
        className="wishlist-emp-image"
      />
      <h2 className="wishlist-emp-heading">
        Your wishlist is lonely and looking for love
      </h2>
      <p className="wishlist-emp-subtext">
        Add products to your wishlist, review them anytime and easily move to
        cart.
      </p>
      <div className="wishlist-emp-buttons">
        <button
          onClick={() => navigate("/home")}
          className="continue-shopping-button"
        >
          CONTINUE SHOPPING
        </button>
        {!isAuth && (
          <button
            onClick={() => navigate("/login")}
            className="continue-login-button"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default EmptyWishlist;
