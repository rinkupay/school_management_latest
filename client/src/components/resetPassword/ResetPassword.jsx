import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserPassword,
  resetState,
} from "../../features/resetPasswordSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const {loading,message,errorMessage,status} = useSelector((state)=>state.resetPassword);
  const [email, setEamil] = useState("");

  const handleEmail = (e) => {
    setEamil(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected typo here

    if (!email) {
      toast.error("Enter Valid Email");
    }
    // Regex for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const formData = {
        email,
      };

      dispatch(resetUserPassword(formData));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(()=>{
    if(status === 'fulfilled'){
      setEamil('')
    }

    if(errorMessage){
      toast.error(errorMessage);
    }

  },[status,dispatch,errorMessage]);

  return (
    <div>
      <div className="forgot-password-wrapper">
        {" "}
        {/* Corrected class name */}
        <div className="forgot-password-container">
          {" "}
          {/* Corrected class name */}
          <form className="forgot-form" onSubmit={handleSubmit}>
            <h4>Reset Password</h4>
            <div className="forgot-password-sub-container">
              {" "}
              {/* Corrected class name */}
              <label htmlFor="email">Enter Your Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                id="email"
                value={email}
                onChange={handleEmail}
              />{" "}
              {/* Added 'id' for accessibility */}
              <button type="submit" disabled = {loading}>{loading ? 'Wait...' : 'Submit'}</button>
              <p>{message}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
