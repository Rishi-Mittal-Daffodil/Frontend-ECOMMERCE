import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <>
      <div className="card1">
        <img className="card-image" src={props.url} alt="product-image" />
        <h3 className="card-title">{props.title}</h3>
        <hr />
        <p className="card-description">{props.desc}</p>
        <span className="card-price">{props.price}</span>
      </div>
    </>
  );
}

export default Card;
