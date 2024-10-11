import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constants";
function ProductAddForm() {
  const [loading, setLoading] = useState(false);
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
    isFeatured: false,
    status: "active",
    tags: [""],
    ratings: 0,
    weight: 0,
  });
  const navigate = useNavigate();
  const [images, setImages] = useState(null);
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
  const handleTagsChange = (index, e) => {
    const newTags = [...product.tags];
    newTags[index] = e.target.value;
    setProduct({ ...product, tags: newTags });
    if (index === product.tags.length - 1 && newTags[index]) {
      const newTags = [...product.tags, ""];
      setProduct({ ...product, tags: newTags });
    }
  };

  // category fetching  ....
  const [firstLevelCategory, setFirstLevelCategory] = useState();
  const [secondLevelCategory, setSecondLevelCategory] = useState();
  const [thirdLevelcategory, setThirdLevelCategory] = useState();
  const [firstLevel, setFirstLevel] = useState([]);
  const [secondLevel, setSecondLevel] = useState([]);
  const [thirdLevel, setThirdLevel] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const token = localStorage.getItem("user-token");
  useEffect(() => {
    try {
      const getCategoryData = async () => {
        const res = await axios.get(`${BASE_URL}/pm/category/get-category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategoryData(res.data);
        console.log(categoryData);
        console.log(images);
      };
      getCategoryData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleFirstCategoryChange = (e) => {
    setFirstLevel([
      ...new Set(categoryData.map((item) => item.firstLevelCategory)),
    ]);
    setFirstLevelCategory(e.target.value);
    console.log(firstLevelCategory);
    setSecondLevel([
      ...new Set(
        categoryData.map((item) => {
          if (item.firstLevelCategory === firstLevelCategory) {
            return item.secondLevelCategory;
          }
        })
      ),
    ]);
  };
  const handleSecondCategoryChange = (e) => {
    setSecondLevelCategory(e.target.value);
    console.log(secondLevelCategory);
    setThirdLevel([
      ...new Set(
        categoryData.map((item) => {
          if (item.secondLevelCategory === secondLevelCategory) {
            return item.thirdLevelCategory;
          }
        })
      ),
    ]);
  };
  const handleThirdCategoryChange = (e) => {
    setThirdLevelCategory(e.target.value);
    console.log(thirdLevelcategory);
    const obj = categoryData.find(
      (item) =>
        item.firstLevelCategory === firstLevelCategory &&
        item.secondLevelCategory === secondLevelCategory &&
        item.thirdLevelCategory === thirdLevelcategory
    );
    setProduct({ ...product, category: obj._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    try {
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("brand", product.brand);
      formData.append("sku", product.sku);
      formData.append("price", product.price);
      formData.append("discountPrice", product.discountPrice);

      // Handle attributes array
      product.attributes.forEach((attribute, index) => {
        if (attribute.name && attribute.value) {
          formData.append(`attributes[${index}][name]`, attribute.name);
          formData.append(`attributes[${index}][value]`, attribute.value);
        }
      });

      // Handle stock
      formData.append("stock", product.stock);

      // Handle images array (assuming images are files)
      console.log("🚀 ~ handleSubmit ~ images:", images);
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });

      // Handle boolean and other fields
      formData.append("isFeatured", product.isFeatured);
      formData.append("status", product.status);

      // Handle tags array
      product.tags.forEach((tag, index) => {
        if (tag) {
          formData.append(`tags[${index}]`, tag);
        }
      });

      // Handle ratings and weight
      formData.append("ratings", product.ratings);
      formData.append("weight", product.weight);

      const res = await axios.post(`${BASE_URL}/pm/product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setLoading(false);
      navigate("/");
      toast.success("Product Created SuccessFully");
    } catch (error) {
      setLoading(false);
      toast.success("Something Went Wrong");
      console.log(error);
    }
    console.log(product);
  };

  return (
    <>
      {loading ? <Loader /> : <></>}
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

        <label style={styles.label}>First Level Category</label>
        <select
          style={styles.select}
          name="category"
          value={firstLevelCategory}
          onClick={(e) => handleFirstCategoryChange(e)}
          onChange={(e) => handleFirstCategoryChange(e)}
          required
        >
          {firstLevel.map((item, ind) => {
            return (
              <option key={ind} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <label style={styles.label}>Second Level Category</label>
        <select
          style={styles.select}
          name="category"
          value={secondLevelCategory}
          onClick={(e) => handleSecondCategoryChange(e)}
          onChange={(e) => handleSecondCategoryChange(e)}
          required
        >
          {secondLevel.map((item, ind) => {
            return (
              <option key={ind} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <label style={styles.label}>Third Level Category</label>
        <select
          style={styles.select}
          name="category"
          value={thirdLevelcategory}
          onClick={(e) => handleThirdCategoryChange(e)}
          onChange={(e) => handleThirdCategoryChange(e)}
          required
        >
          {thirdLevel.map((item, ind) => {
            return (
              <option key={ind} value={item}>
                {item}
              </option>
            );
          })}
        </select>

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
            />
            <input
              style={styles.input}
              type="text"
              name="value"
              placeholder="Attribute Value"
              value={pair.value}
              onChange={(e) => handleAttributeChange(index, e)}
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
        <div style={styles.imageContainer}>
          <input
            style={styles.input}
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              console.log("🚀 ~ ProductAddForm ~ e:", e.target.files);

              setImages(e.target.files);
            }}
            className="image-input"
          />
        </div>

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
        {product.tags.map((val, index) => (
          <div key={index} style={styles.attributeContainer}>
            <input
              style={styles.input}
              type="text"
              name="tags"
              value={val}
              placeholder="Tags"
              onChange={(e) => handleTagsChange(index, e)}
            />
          </div>
        ))}
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
    </>
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
