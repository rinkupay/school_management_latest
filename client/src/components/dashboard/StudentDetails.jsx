import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "./StudentDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import StudentProfile from "./studentProfile/StudentProfile";
import { fetchStudentDetail } from "../../features/studentDetailSlice";
import NavButton from "./navbutton/NavButton";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { deleteStudent } from "../../features/studentSlice";

const StudentDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { student,loading } = useSelector((state) => state.studentDetails);
  const data = student?.student;



  // State for managing the delete confirmation dialog visibility
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [studentId, setStudentId] = useState(null);
  
  // Function to handle the delete action by setting the student ID and opening the confirmation dialog
  const handleDelete = (id) => {
    setStudentId(id);
    setOpenDeleteDialog(true);
  };
  
  // Function to confirm deletion and dispatch the delete action, then navigate back to the student list
  const confirmDeleteProduct = async () => {
    await dispatch(deleteStudent(studentId));
    setOpenDeleteDialog(false);
    navigate('/students');
  };
  
  // Function to cancel the delete action and close the confirmation dialog
  const cancelDeleteProduct = () => {
    setOpenDeleteDialog(false);
  };

  // Fetch student details when the component mounts or the ID changes
  useEffect(() => {
    dispatch(fetchStudentDetail(id));
  }, [id]);

  // Function to navigate to the student update page
  const handleUpdate = () => {
    navigate(`/student-update/${id}`);
  };



  // <<<<<<<=========== PRINT THE PAGE ==========>>>>>>>>>>

  const printStudent = async()=>{

    const printContents = document.getElementById("student-profile").innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
  window.location.reload();
  }

  return (
    <div>
      <div className="dashboard-wrapper">
    
        <div className="dashboard-right">
          <h2 className="dashboard-heading">STUDENT DETAILS</h2>

          <NavButton id={id}  handleDelete={handleDelete} data={data} printStudent={printStudent} />


          <div className="student-details-wrapper "  id="student-profile">
            <div className="student-details-container" >
              <StudentProfile data={data} loading={loading}  />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={cancelDeleteProduct}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Student"}</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this student?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteProduct}>Cancel</Button>
          <Button onClick={confirmDeleteProduct} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentDetails;
