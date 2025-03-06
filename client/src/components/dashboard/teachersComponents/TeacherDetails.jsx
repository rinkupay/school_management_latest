import React, { useEffect, useState } from "react";
import "../Dashboard.css"

import TeacherNavBtn from './teacherNavBtn/TeacherNavBtn';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TeacherProfile from "./teacherProfile/TeacherProfile";
import { fetchTeacherDetail } from "../../../features/teacherDetailSlice";
import {deleteTeacher} from "../../../features/teacherRegistrationSlice"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";










const TeacherDetails = () => {




  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const {teacher,loading} = useSelector((state)=>state.teacherDetails);

 

  const data = teacher?.teacher;







  // State for managing the delete confirmation dialog visibility
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [teacherId, setTeacherId] = useState(null);

  // Function to handle the delete action by setting the student ID and opening the confirmation dialog
  const handleDelete = (id) => {
    setTeacherId(id);
    setOpenDeleteDialog(true);
  };
  
  // Function to confirm deletion and dispatch the delete action, then navigate back to the student list
  const confirmDeleteTeacher = async () => {
    await dispatch(deleteTeacher({teacherId}));
    setOpenDeleteDialog(false);
    navigate('/teachers');
  };
  
  // Function to cancel the delete action and close the confirmation dialog
  const cancelDeleteTeacher = () => {
    setOpenDeleteDialog(false);
  };

  // Fetch student details when the component mounts or the ID changes
  useEffect(() => {
    dispatch(fetchTeacherDetail(id));
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
    <div className="dashboard-wrapper">

    <div className="dashboard-right">
      <h2 className="dashboard-heading">EMPLOYEE DETAILS</h2>
      <TeacherNavBtn id={id}  handleDelete={handleDelete}  printStudent={printStudent} />
      <div className="student-details-wrapper "  id="student-profile">
            <div className="student-details-container" >
              <TeacherProfile data={data} loading={loading}  />
            </div>
          </div>




 {/* Delete Confirmation Dialog */}
 <Dialog
        open={openDeleteDialog}
        onClose={cancelDeleteTeacher}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Teacher"}</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this teacher?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteTeacher}>Cancel</Button>
          <Button onClick={confirmDeleteTeacher} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>


    </div>
  
  )
}

export default TeacherDetails
