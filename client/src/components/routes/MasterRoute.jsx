import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const MasterRoute = ({ children }) => {
  const navigate = useNavigate();
  const {adminDetails,isLoggedIn } = useSelector((state) => state.user);

  const data = adminDetails?.user || {};
  
  
  useEffect(() => {
    if (!adminDetails || !isLoggedIn) {
      navigate("/");
    } else if (data?.role !== "super" ) {
      navigate(`/profile/${data._id}`);
      toast.error("Access denied")
    }
  }, [adminDetails, data, navigate]);

  return children;
};

export default MasterRoute;



