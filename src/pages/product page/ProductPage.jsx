import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

function ProductPage(){
  const { productId } = useParams();
  const [product, setProduct] = useState({images : []});
  const sizes = ["XXS" , "XS" , "S" , "M" , "L" , "XL" , "XXL" , "XXXL"]
  const url = window.location.href ;
  useEffect(() => {
    try {
      const fetchProductDetails = async () => {
        const productData = await axios.get(
          `http://localhost:8080/pm/product/${productId}`
        );
        console.log(productData.data.data[0]);
        setProduct(productData.data.data[0]);
      };
      fetchProductDetails();
    } catch (error) {
      console.log("something went while fetching product details ");
    }
  }, []);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const addToCart = () => {
    alert(
      `Added ${quantity} of ${product.name} (Size: ${selectedSize}) to the cart.`
    );
  };

  const addToWishlist = () => {
    alert(`${product.name} added to wishlist.`);
  };

  return (
    <div className="product-view">
      {/* Left Side: Product Images */}
      <div className="product-images">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`${product.name} ${index}`}
            className="product-thumbnail"
          />
        ))}
      </div>

      {/* Right Side: Product Details */}
      <div className="product-details">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-tag" >{product.tags?product.tags[0]:"Oversized T-Shirts"}</p>
        <hr />
        <p className="product-price">₹ {product.price}</p>

        <div className="size-chart">
          <h6>Please select a size.</h6>
          {sizes.map((size, index) => (
            <button
              key={index}
              className={`size-button ${selectedSize === size ? "active" : ""}`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="quantity-selection">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>

        <div className="action-buttons">
          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
          <button className="add-to-wishlist" onClick={addToWishlist}>
            Add to Wishlist
          </button>
        </div>

        <div className="share-row">
          <h6>Share</h6>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank"><i className="fab fa-facebook-f social-icon"></i></a>
          <a href={`https://twitter.com/intent/tweet?url=${url}&text=Check%20out%20this%20product!`} target="_blank"><i className="fab fa-twitter social-icon"></i></a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank"><i className="fab fa-linkedin-in social-icon"></i></a>
          <a href={`https://api.whatsapp.com/send?text=Check%20out%20this%20product:%20${url}`} target="_blank"><i class="fab fa-whatsapp social-icon"></i></a>          
        </div>

        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;


// hello chatgpt , i want to create a not found error component page in react js . if some route not found that error page should be displayed ,
// in upper part and in center this image should be displayed 'https://tss-static-images.gumlet.io/notfound.png'  and than a 'whoops!'  message 
//  and then in next row "We can't seem to find the page you are looking for" this sould be displayed , give the component page with proper designing . 