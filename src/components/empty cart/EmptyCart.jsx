import React from "react";
import "./EmptyCart.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../userContext/UserAuthContext";
function EmptyCart() {
  const navigate = useNavigate();
  const { isAuth} = useAuth();
  return (
    <div className="cart-container">
      <img
        src="https://tss-static-images.gumlet.io/emptyCart.png"
        alt="Empty cart Icon"
        className="cart-image"
      />
      <h3 className="cart-heading">Your shopping cart is empty.</h3>
      <p className="cart-subtext">
        Please add something soon, carts have feelings too.
      </p>
      <div className="cart-buttons">
        <button
          onClick={() => navigate("/home")}
          className="continue-shopping-button"
        >
          CONTINUE SHOPPING
        </button>
        {!isAuth && <button
          onClick={() => navigate("/login")}
          className="continue-login-button"
        >
          Login
        </button>}
      </div>
    </div>
  );
}

export default EmptyCart;
