import React from "react";
import { useAuth } from "../../userContext/UserAuthContext";
import './ProfilePage.css'

function ProfilePage() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <div className="profile-page">
        <div className="left-section">
          <div className="detail-upper-left">
            <h5>{user.firstName + " " + user.lastName}</h5>
            <p>{user.email}</p>
          </div>
          <div className="order-section">Orders</div>
          <div className="delete-logout-button" >
            <button className="left-account-button">DELETE MY ACCOUNT</button>
            <button className="left-account-button">LOGOUT</button>
          </div>
        </div>
        <div className="right-section">
          <h4 className="right-heading-upper">Edit Profile</h4>
          <div className="right-detail-user">
            <label htmlFor="email">Email id</label>
            <input type="text" readOnly value={user.email} />
          </div>
          <div className="general-info-right">
            <div className="user-info-edit-right">
              <label htmlFor="name">First Name*</label>
              <input type="text" name="name" value={user.firstName} />
              <label htmlFor="name">Last Name*</label>
              <input type="text" name="name" value={user.lastName} />
            </div>
            <div className="address-change-left">address</div>
          </div>
          <button className="save-button">SAVE</button>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

// createdAt: "2024-10-05T10:46:58.938Z";
// email: "rishimittal676@gmail.com";
// firstName: "Rishi";
// isActive: true;
// lastName: "Mittal";
// role: "admin";
// updatedAt: "2024-10-09T05:33:18.947Z";
// __v: 0;
// _id: "6701192259b80ee5d2d48344";
