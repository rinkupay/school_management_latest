import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../features/userSlice";
import toast from 'react-hot-toast';
import Loader from "../loader/Loader";
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, error, loading } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Handle changes to input fields
  const handleChange = ({ target: { name, value } }) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Navigate to password reset page
  const handleForgotPassword = () => {
    navigate(`/password-reset`);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      toast.error("Please enter email and password");
    } else {
      const adminData = {
        email: user.email,
        password: user.password,
      };

      toast.promise(dispatch(loginAdmin(adminData)).unwrap(), {
        pending: "Logging in...",
        success: "Login successful!",
        error: "Login failed. Please check your credentials.",
      });
    }
  };

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (!loading && isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn,navigate]);

  return (
    <>
      {loading && <Loader />}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <div className="login-form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Password:</label>
            <div className="login-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
              <p className="show-password" onClick={togglePassword}>
                {showPassword ? (
                  <BsEyeSlash size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </p>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="register-redirect">
            <p
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot your password?
            </p>
            <p className="register-btn">
              Don't have an account..?
              <span onClick={() => navigate("/register")}>Register</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
