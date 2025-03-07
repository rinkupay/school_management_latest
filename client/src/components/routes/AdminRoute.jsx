import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, adminDetails } = useSelector((state) => state.user);


  const data = adminDetails?.user || {};

  useEffect(() => {
    if (!adminDetails || !isLoggedIn) {
      navigate("/");
    } else if (data?.role !== "admin" && data?.role !== "super") {
      navigate(`/profile/${data?._id}`);
      toast.error("Access denied");
    }
  }, [isLoggedIn, data, navigate]);

  return children;
};

export default AdminRoute;



