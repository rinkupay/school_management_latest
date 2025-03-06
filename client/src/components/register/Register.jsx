import React, { useEffect, useState } from 'react';
import './Register.css';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import {registerUser} from "../../features/userRegisterSlice"
import {useDispatch, useSelector} from "react-redux"
import { loadAdmin } from '../../features/userSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {status} = useSelector((state)=>state.registerUser);

  const verifyPassCode = "WES123";

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [passCode, setPassCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



  const handleSubmit = async(e) => {
    e.preventDefault();

    // Basic validation
    if (!userName || !email || !mobile || !password || !passCode) {
      toast.error("All fields are required");
      return;
    }

    // Passcode validation
    if (passCode !== verifyPassCode) {
      toast.error("Please enter a valid passcode");
      
      return;
    }

    // Simulate a form submission
    const registrationData = {
      userName,
      email,
      mobile,
      password,
      passCode,
    };



    await dispatch(registerUser(registrationData));

    // Navigate to login page after successful registration
    navigate('/');
  };

  useEffect(()=>{
    if(status === "fulfilled"){
      dispatch(loadAdmin());
    }

  },[status,dispatch])

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className='register-heading'>Register Admin</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="register-form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            required 
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input 
            type="number" 
            id="mobile" 
            name="mobile" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
            required 
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="passcode">Passcode:</label>
          <input 
            type="password" 
            id="passcode" 
            name="passcode" 
            value={passCode} 
            onChange={(e) => setPassCode(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        <div className="login-redirect">
          <p> Already have an account? <span onClick={() => navigate('/')}>Login</span></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
