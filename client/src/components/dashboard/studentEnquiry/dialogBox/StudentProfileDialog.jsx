import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem
} from "@mui/material";
import {useNavigate} from "react-router-dom"
import CloseIcon from "@mui/icons-material/Close";
import {updateSingleStudentEnquiryInfo,resetStudentData} from "../../../../features/singleStudentEnquirySlice"
import {fetchStudentEnquiryInfo} from "../../../../features/studentEnquirySlice"
import {useDispatch} from "react-redux"
import toast from 'react-hot-toast';


const StudentProfileDialog = ({ onClose = () => {}, student, studentId,handleDelete }) => {
  const [editableStudent, setEditableStudent] = useState(student);


  const dispatch = useDispatch();
  const navigate = useNavigate();




// CLasses
  const classes = [
    { className: "Nursary", value: "nursary" },
    { className: "LKG", value: "LKG" },
    { className: "UKG", value: "UKG" },
    { className: "Class 1", value: "1" },
    { className: "Class 2", value: "2" },
    { className: "Class 3", value: "3" },
    { className: "Class 4", value: "4" },
    { className: "Class 5", value: "5" },
    { className: "Class 6", value: "6" },
    { className: "Class 7", value: "7" },
    { className: "Class 8", value: "8" },
    { className: "Class 9", value: "9" },
    { className: "Class 10", value: "10" },
    { className: "Class 11", value: "11" },
    { className: "Class 12", value: "12" }
  ];
  
  // Handle Admission
  const handleAdmission = (data)=> {
    navigate("/register-student", { state: { studentData: data } });
      
    dispatch(resetStudentData());


  }

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableStudent({
      ...editableStudent,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      // Dispatch update action
      await dispatch(updateSingleStudentEnquiryInfo({ studentId, editableStudent })).unwrap();
  
      // Fetch updated student list
      dispatch(fetchStudentEnquiryInfo());

    
  
      // Close the dialog after a successful update
      onClose();
    } catch (error) {
      toast.error("Failed to update student:", error.message);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="student-profile-dialog-title"
    >
      <DialogTitle
        id="student-profile-dialog-title"
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h6" component={"div"}>Student Details</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Student Name"
              name="studentName"
              value={editableStudent.studentName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Father's Name"
              name="fatherName"
              value={editableStudent.fatherName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select // Add this to enable dropdown functionality
                    label="Gender"
                    name="gender"
                    value={editableStudent.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="DOB"
              name="dateOfBirth"
              value={editableStudent.dateOfBirth}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Class"
                    name="className"
                    value={editableStudent.className}
                    onChange={handleInputChange}
                    required
                  >
                    {classes.map((cls, index) => (
                      <MenuItem key={index} value={cls.value}>
                        {cls.className}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={editableStudent.mobile}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={editableStudent.address}
              onChange={handleInputChange}
              
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={()=> handleAdmission(editableStudent)} // Pass the updated student data
          >
            Admission
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleUpdate} // Pass the updated student data
          >
            Update
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={()=>handleDelete()} // Pass the updated student data
          >
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default StudentProfileDialog;
