import React, { useState } from "react";
import { useAuth } from "../../userContext/UserAuthContext";
import "./ProfilePage.css";
import toast from "react-hot-toast";
import { handleDelete, handleLogout } from "../../services/ManageDialog";
function ProfilePage() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const handleClose = () => {
    setIsVisible(false);
  };
  const handleCancel = () => {
    setIsVisible(false);
  };
  // console.log(user);
  function handleDeleteAccount() {
    setIsVisible(true);
    setDialogMessage("Are you sure you want to delete your account?");
  }
  function handleLogoutAccount() {
    setIsVisible(true);
    setDialogMessage("Are you sure you want to logout?");
  }

  async function handleConfirm() {
    if (dialogMessage === "Are you sure you want to delete your account?") {
      await handleDelete();
    } else {
      await handleLogout();
    }
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
              <h5>{dialogMessage}</h5>
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

      <div className="profile-page">
        <div className="left-section">
          <div className="detail-upper-left">
            <h5>{user.firstName + " " + user.lastName}</h5>
            <p>{user.email}</p>
          </div>
          <div className="order-section">Orders</div>
          <div className="delete-logout-button">
            <button
              onClick={handleDeleteAccount}
              className="left-account-button"
            >
              DELETE MY ACCOUNT
            </button>
            <button
              onClick={handleLogoutAccount}
              className="left-account-button"
            >
              LOGOUT
            </button>
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
