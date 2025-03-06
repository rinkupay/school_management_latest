import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  MenuItem,
  Paper,
  Backdrop,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createSingleStudentEnquiryInfo } from "../../../../features/singleStudentEnquirySlice";
import { fetchStudentEnquiryInfo } from "../../../../features/studentEnquirySlice";

const AddStudent = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    gender: "",
    dateOfBirth: "",
    className: "",
    mobile: "",
    address: "",
  });

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
    { className: "Class 12", value: "12" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.fatherName ||
      !formData.dateOfBirth ||
      !formData.className ||
      !formData.gender ||
      !formData.mobile ||
      !formData.address
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    await dispatch(createSingleStudentEnquiryInfo(formData));

    // Reset form data
    setFormData({
      studentName: "",
      fatherName: "",
      gender: "",
      dateOfBirth: "",
      className: "",
      mobile: "",
      address: "",
    });

    // Refresh student enquiry list
    dispatch(fetchStudentEnquiryInfo());

    // Close the modal
    onClose();
  };

  return (
    <Backdrop
      open={true}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: { xs: 320, sm: 450 },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Paper elevation={3}>
          <Box
            sx={{
              padding: { xs: 2, sm: 4 },
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => onClose()} // Close the modal when icon is clicked
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" gutterBottom>
              Add Student Details
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Student Name"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Father Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    select
                    label="Gender"
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    select
                    fullWidth
                    label="Class"
                    name="className"
                    value={formData.className || ""}
                    onChange={handleChange}
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
                    size="small"
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    type="tel"
                    required
                    inputProps={{ maxLength: 10 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      padding: { xs: "8px", sm: "12px" },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Backdrop>
  );
};

export default AddStudent;
