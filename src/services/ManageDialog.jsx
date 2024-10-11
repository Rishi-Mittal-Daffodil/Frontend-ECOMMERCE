import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader/Loader";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";
let handleLogout;
let handleDelete;
let handleProductDelete;
function ManageDialog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/um/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Logout Successfully");
      setLoading(false);
      if (res.status === 200) {
        localStorage.removeItem("user-token");
        navigate("/login");
        setTimeout(() => {
          location.reload(false);
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something Wrong While Logout");
    }
  };
  //handle delete
  handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${BASE_URL}/um/user/delete-account`, {
        withCredentials: true,
      });
      toast.success("Account Deleted Successfully");
      setLoading(false);
      if (res.status === 200) {
        localStorage.removeItem("user-token");
        navigate("/signup");
        setTimeout(() => {
          location.reload(false);
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something Wrong While Deleting Account");
    }
  };

  //handle product delete .
  handleProductDelete = async (productId) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${BASE_URL}/pm/product/${productId}`, {
        withCredentials: true,
      });
      toast.success("Product Deleted Successfully");
      setLoading(false);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something Wrong While Deleting Account");
    }
  };
  return <>{loading ? <Loader /> : <></>}</>;
}
export { handleDelete, handleLogout, handleProductDelete };
export default ManageDialog;

