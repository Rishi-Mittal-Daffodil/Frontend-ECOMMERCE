import React from "react";
import "./ProductManage.css";
import { Outlet } from "react-router-dom";

function ProductManage() {
  return (
    <>
      <div>
        <h2 className="manage-head">Manage Products</h2>
        <Outlet />
      </div>
    </>
  );
}

export default ProductManage;
