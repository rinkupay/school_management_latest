import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { adminDetails} = useSelector((state) => state.user);




  useEffect(() => {
    if (!adminDetails) {
      navigate("/");
    }
  }, [adminDetails]);

  return  children ;
};

export default ProtectedRoute;








