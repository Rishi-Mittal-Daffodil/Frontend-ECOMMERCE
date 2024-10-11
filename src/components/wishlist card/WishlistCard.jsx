import React from "react";
import "./WishlistCard.css";
import { FaTimes } from "react-icons/fa"; // Using react-icons for the cross icon

const WishlistCard = (props) => {
  function handleAddToCart() {}
  return (
    <div className="wishlist-card">
      <FaTimes className="remove-icon" onClick={(e) => props.handleRemove(e)} />
      <img src={props.image} alt={props.name} className="wishlist-image" />
      <div className="wishlist-details">
        <h6 className="wishlist-name">{props.name}</h6>
        <hr className="horizontal-row" />
        <p className="wishlist-tag">{props.tag}</p>
        <p className="wishlist-price">₹{props.price}</p>
      </div>
      <div className="add-to-cart-div" onClick={() => handleAddToCart()}>
        Add to Cart
      </div>
    </div>
  );
};

export default WishlistCard;
