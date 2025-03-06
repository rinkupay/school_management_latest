import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ChangePassword.css"
import {useNavigate, useParams} from "react-router-dom"
import toast from 'react-hot-toast';

import {userPasswordChange,resetState} from "../../features/resetPasswordSlice"
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";


const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useParams();
 
  const {status,loading,errorMessage} = useSelector((state)=>state.resetPassword);



  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [messageSuccess, SetMessageSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    // Basic validation

 
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
       
        password:newPassword,
        confirmPassword
      };

      dispatch(userPasswordChange({formData,token}))
    } catch (err) {
      toast.error("An error occurred while updating the password");
    }
  };


  // TOGGLE PASSWORD
const [showPassword,setShowPassword] = useState(false);
const togglePassword = () =>{
  setShowPassword(!showPassword);

}


  const goToLogin = ()=>{
    navigate('/');
  }

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


  useEffect(()=>{
    if(status === 'fulfilled'){
      toast.success("Password Changed successfully")
    }
    if(errorMessage){
      toast.error(errorMessage);
    }

  },[status,dispatch,errorMessage])

useEffect(()=>{
  if(status === 'fulfilled'){
    SetMessageSuccess('Password changed successfully');
  }

},[status,dispatch])

  return (
    <div className="change-password-wrapper1">
      <div className="change-password-container1">
        <h2 className="change-password-heading">PASSWORD RESET</h2>
        <div className="change-password-wrapper2">
          <div className="change-password-container2">
          
            
            <div className="change-password-menu">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input">
              <input
                 type={`${showPassword ? "text" : "password" }`}
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
               <p className="show-password">
                {showPassword ? <BsEyeSlash size={20} onClick={togglePassword} /> : <IoEyeOutline size={20} onClick={togglePassword} />}
              </p>
              </div>
             
            </div>
            <div className="change-password-menu">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
              <input
                 type={`${showPassword ? "text" : "password" }`}
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showPassword ? <BsEyeSlash size={20} onClick={togglePassword} /> : <IoEyeOutline size={20} onClick={togglePassword} />}
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}

            {messageSuccess && (
              <p className="success-message">{messageSuccess}</p>
            )}
           {status !== 'fulfilled' &&  <button
              className="update-btn"
              onClick={handleUpdate}
           
            >
              {'Submit'}
            </button>}
            <div className="goToLogin">
           {status === 'fulfilled' &&  <p className="alternate-login" onClick={goToLogin}>Login</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
