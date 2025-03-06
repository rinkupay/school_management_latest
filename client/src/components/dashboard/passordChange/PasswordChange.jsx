import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import "./PasswordChange.css";
import {
  updateUserPassword,
  resetState,
} from "../../../features/userPasswordSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";

const PasswordChange = () => {
  const dispatch = useDispatch();

  const { loading, errorMessage, message } = useSelector(
    (state) => state.userPassword
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [messageSuccess, SetMessageSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    // Basic validation

    if (!oldPassword) {
      toast.error("Old password are required");
      return;
    }
    if (!newPassword) {
      toast.error("New password are required");
      return;
    }
    if (!confirmPassword) {
      toast.error("Confirm password are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const formData = {
        currentPassword: oldPassword,
        newPassword,
      };

      dispatch(updateUserPassword(formData));
    } catch (err) {
      toast.error("An error occurred while updating the password");
    }
  };



    // TOGGLE OLD PASSWORD
    const [showOldPassword,setShowOldPassword] = useState(false);
  const toggleOldPassword = () =>{
    setShowOldPassword(!showOldPassword);

  }
    // TOGGLE NEW  PASSWORD
    const [showNewPassword, setShowNewPassword] = useState(false);
    const toggleNewPassword = () => {
      setShowNewPassword(!showNewPassword);
    };
        // TOGGLE CONFIRM PASSWORD
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const toggleConfirmPassword = () => {
          setShowConfirmPassword(!showConfirmPassword);
        };

  useEffect(() => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        SetMessageSuccess("Passwords match");
        setError("");
      } else {
        SetMessageSuccess("");
        setError("Passwords do not match");
      }
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      SetMessageSuccess(message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(resetState());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(resetState());
    }
  }, [message, errorMessage, dispatch]);

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-right">
        <h2 className="dashboard-heading">Change Password</h2>
        <div className="password-wrapper">
          <div className="password-container">
            <div className="password-menu">
              <label htmlFor="oldPassword">Old Password</label>
              <div className="password-input">
                <input
                  type={`${showOldPassword ? "text" : "password"}`}
                    className="pass-input"
                  id="oldPassword"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <p className="show-password">
                  {showOldPassword ? (
                    <BsEyeSlash size={20} onClick={toggleOldPassword} />
                  ) : (
                    <IoEyeOutline size={20} onClick={toggleOldPassword} />
                  )}
                </p>
              </div>
            </div>
            <div className="password-menu">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input">
                <input
                  className="pass-input"
                  type={`${showNewPassword ? "text" : "password"}`}
                  id="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <p className="show-password">
                  {showNewPassword ? (
                    <BsEyeSlash size={20} onClick={toggleNewPassword} />
                  ) : (
                    <IoEyeOutline size={20} onClick={toggleNewPassword} />
                  )}
                </p>
              </div>
            </div>
            <div className="password-menu">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                    className="pass-input"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p className="show-password">
                  {showConfirmPassword ? (
                    <BsEyeSlash size={20} onClick={toggleConfirmPassword} />
                  ) : (
                    <IoEyeOutline size={20} onClick={toggleConfirmPassword} />
                  )}
                </p>
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}

            {messageSuccess && (
              <p className="success-message">{messageSuccess}</p>
            )}
            <button
              className="update-btn"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
