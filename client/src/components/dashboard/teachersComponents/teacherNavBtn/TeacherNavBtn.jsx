import React from "react";
import "./TeacherNavBtn.css";
import { NavLink, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MdPrint } from "react-icons/md";


const TeacherNavBtn = ({ id, handleDelete, printStudent }) => {
  const location = useLocation();

  // Function to check if current route is the Login or Register route
  const selectedRoute = () =>
    location.pathname === `/teacher-pay-history/${id}` ||
    location.pathname === `/teacher-payment/${id}` ||
    location.pathname === `/teacher-update/${id}`


  return (
    <div>
      <div className="navbtn-caintainer">
        {/* Navigation buttons to various student-related pages */}
        <div className="nav-btn-group">
          <NavLink className="nav-btn" to={`/teacher/${id}`}>
             Profile
          </NavLink>
          <NavLink className="nav-btn" to={`/teacher-payment/${id}`}>
            Payment
          </NavLink>
          <NavLink className="nav-btn" to={`/teacher-pay-history/${id}`}>
            Payment History
          </NavLink>
          <NavLink className="nav-btn" to={`/teacher-update/${id}`}>
            Update
          </NavLink>
        </div>

        {/* Action button group for performing actions like delete */}
        <div className="action-btn-group">
          {!selectedRoute() && (
            <NavLink className="action-btn-btn">
              <Tooltip title="Print">
                {/* Icon button for deleting the student */}
                <IconButton onClick={printStudent}>
                  <MdPrint />
                </IconButton>
              </Tooltip>
            </NavLink>
          )}

          {!selectedRoute() && (
            <NavLink className="action-btn-btn">
              <Tooltip title="Delete">
                {/* Icon button for deleting the student */}
                <IconButton onClick={() => handleDelete(id)}>
                  <DeleteIcon sx={{ color: "#258DC8" }} />
                </IconButton>
              </Tooltip>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherNavBtn;
