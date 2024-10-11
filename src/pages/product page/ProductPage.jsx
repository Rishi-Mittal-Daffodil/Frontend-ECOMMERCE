import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import { BASE_URL } from "../../utils/constants";
import { useAuth } from "../../userContext/UserAuthContext";
import { handleProductDelete } from "../../services/ManageDialog";
import { addToWishlist } from "../wishlist page/Wishlist";

function ProductPage() {
  const { role, isAuth } = useAuth();
  const { productId } = useParams();
  const [product, setProduct] = useState({ images: [] });
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const url = window.location.href;
  useEffect(() => {
    try {
      const fetchProductDetails = async () => {
        const productData = await axios.get(
          `${BASE_URL}/pm/product/${productId}`
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

  const handleAddToWishlist = async () => {
    await addToWishlist(productId);
  };

  const [isVisible, setIsVisible] = useState(false);
  const handleClose = () => {
    setIsVisible(false);
  };
  const handleCancel = () => {
    setIsVisible(false);
  };
  function handleDeleteProduct() {
    setIsVisible(true);
  }
  async function handleConfirm() {
    await handleProductDelete(productId);
    setIsVisible(false);
  }

  return (
    <>
      <div>
        {isVisible && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <button className="close-button" onClick={handleClose}>
                &times;
              </button>
              <h5>Are you sure you want to delete this product?</h5>
              <div className="dialog-buttons">
                <button className="yes-button" onClick={handleConfirm}>
                  YES
                </button>
                <button className="no-button" onClick={handleCancel}>
                  NO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
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
          <p className="product-tag">
            {product.tags ? product.tags[0] : "Oversized T-Shirts"}
          </p>
          <hr />
          <p className="product-price">₹ {product.price}</p>

          <div className="size-chart">
            <h6>Please select a size.</h6>
            {sizes.map((size, index) => (
              <button
                key={index}
                className={`size-button ${
                  selectedSize === size ? "active" : ""
                }`}
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
            <button className="add-to-wishlist" onClick={handleAddToWishlist}>
              Add to Wishlist
            </button>
          </div>

          <div className="share-row">
            <h6>Share</h6>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
            >
              <i className="fab fa-facebook-f social-icon"></i>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${url}&text=Check%20out%20this%20product!`}
              target="_blank"
            >
              <i className="fab fa-twitter social-icon"></i>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
              target="_blank"
            >
              <i className="fab fa-linkedin-in social-icon"></i>
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=Check%20out%20this%20product:%20${url}`}
              target="_blank"
            >
              <i class="fab fa-whatsapp social-icon"></i>
            </a>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          <hr />
          {isAuth && role === "admin" && (
            <div className="admin-management">
              <hr />
              <h3 style={{ margin: "15px" }}>Product Management</h3>
              <button
                onClick={() => handleDeleteProduct()}
                className="product-manage-btn"
              >
                Delete Product
              </button>
              <button className="product-manage-btn">Edit Product</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default ProductPage;
