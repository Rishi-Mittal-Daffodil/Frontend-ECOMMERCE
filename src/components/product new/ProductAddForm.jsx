import React, { useState } from "react";

function ProductAddForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    sku: "",
    price: 0,
    discountPrice: 0,
    attributes: [{ name: "", value: "" }],
    stock: 0,
    images: [{}],
    isFeatured: false,
    status: "active",
    tags: [],
    ratings: 0,
    weight: 0,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAttributeChange = (index, e) => {
    const { name, value } = e.target;
    const newAttributes = [...product.attributes];
    newAttributes[index][name] = value;
    setProduct({ ...product, attributes: newAttributes });
    if (
      index === product.attributes.length - 1 &&
      newAttributes[index].name &&
      newAttributes[index].value
    ) {
      const newAttributes = [...product.attributes, { name: "", value: "" }];
      setProduct({ ...product, attributes: newAttributes });
    }
  };

  const handleImageChange = (index, e) => {
    const newImages = [...product.images];
    newImages[index] = e.target.files[0];
    setProduct({ ...product, images: newImages });
    if (index === product.images.length - 1) {
      setProduct({ ...product, images: [...product.images, {}] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(product);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.header}>Create New Product</h2>

      <label style={styles.label}>Name</label>
      <input
        style={styles.input}
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <label style={styles.label}>Description</label>
      <textarea
        style={styles.textarea}
        name="description"
        value={product.description}
        onChange={handleChange}
        required
      />

      <label style={styles.label}>Category</label>
      <input
        style={styles.input}
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        required
      />

      <label style={styles.label}>Brand</label>
      <input
        style={styles.input}
        type="text"
        name="brand"
        value={product.brand}
        onChange={handleChange}
      />

      <label style={styles.label}>SKU</label>
      <input
        style={styles.input}
        type="text"
        name="sku"
        value={product.sku}
        onChange={handleChange}
        required
      />

      <label style={styles.label}>Price</label>
      <input
        style={styles.input}
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <label style={styles.label}>Discount Price</label>
      <input
        style={styles.input}
        type="number"
        name="discountPrice"
        value={product.discountPrice}
        onChange={handleChange}
      />

      <label style={styles.label}>Attributes</label>
      {product.attributes.map((pair, index) => (
        <div key={index} style={styles.attributeContainer}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Attribute Name"
            value={pair.name}
            onChange={(e) => handleAttributeChange(index, e)}
            required
          />
          <input
            style={styles.input}
            type="text"
            name="value"
            placeholder="Attribute Value"
            value={pair.value}
            onChange={(e) => handleAttributeChange(index, e)}
            required
          />
        </div>
      ))}

      <label style={styles.label}>Stock</label>
      <input
        style={styles.input}
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        required
        min="0"
      />
      <label style={styles.label}>Images</label>
      {product.images.map((image, index) => (
        <div key={index} style={styles.imageContainer}>
          <input
            style={styles.input}
            type="file"
            accept="image/*"
            onChange={(event) => handleImageChange(index, event)}
            className="image-input"
          />
        </div>
      ))}

      <label style={styles.label}>Is Featured</label>
      <input
        type="checkbox"
        name="isFeatured"
        checked={product.isFeatured}
        onChange={() =>
          setProduct({ ...product, isFeatured: !product.isFeatured })
        }
      />

      <label style={styles.label}>Status</label>
      <select
        style={styles.select}
        name="status"
        value={product.status}
        onChange={handleChange}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>

      <label style={styles.label}>Tags</label>
      <input
        style={styles.input}
        type="text"
        name="tags"
        value={product.tags}
        onChange={handleChange}
      />

      <label style={styles.label}>Weight (kg)</label>
      <input
        style={styles.input}
        type="number"
        name="weight"
        value={product.weight}
        onChange={handleChange}
        required
      />

      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "#f4f4f9",
    padding: "20px",
    borderRadius: "10px",
    width: "50rem",
    margin: "0 auto",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    marginBottom: "30px",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: "14px",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  textarea: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    minHeight: "80px",
  },
  select: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  submitButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#298e83",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  attributeContainer: {
    display: "flex",
    gap: "10px",
  },
  imageContainer: {
    display: "flex",
    gap: "10px",
  },
};

export default ProductAddForm;

//i have mutiple image to insert in form suppose if i want to store multiple image i insert first image to insert second image new input feild should be appear
//same i have another field but in this we have only key and  value if i store one key value another one should be available for me after added that create react component with great css .
