import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
import {updateStudentProgression} from "../../../../features/studentProgressionSlice"
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';





const ProgressionCorrectionPopup = ({open,handleClose,data,preStd}) => {

  const dispatch = useDispatch();

  const [progressionStatus, setProgressionStatus] = useState("");
  const [marks, setMarks] = useState("");
  const [daysAttended, setDaysAttended] = useState("");
  const [schoolingStatus, setSchoolingStatus] = useState("");
  const [section, setSection] = useState("");
  const [std,setStd] = useState("");
  const [id,setId] = useState("");



  // Disable marks field condition
  const isMarksDisabled = 
  progressionStatus === "Promoted/Passed without Examination" || 
  progressionStatus === "Discontinued before Examination"; 

  const isMarkHide =
    progressionStatus === "Discontinued before Examination" ||
    progressionStatus === "Discontinued after Examination" ;

const isActive = progressionStatus === "Discontinued before Examination" ||
                 progressionStatus === "Discontinued after Examination" ;

                 


     const handleCorrection = () => {

      const formData = {
        id,
        progressionStatus,
        marks,
        daysAttended,
        schoolingStatus,
        std,
        section,
        isActive,
     

      }
        try {
          dispatch(updateStudentProgression(formData));
    
        handleClose();
        } catch (error) {
          toast.error(error.message);
        }
      };


    // SET MARKS TO 0 WHEN CONDITION IS TRUE
    useEffect(() => {
      if (isMarksDisabled) {
        setMarks("");
      }
    }, [progressionStatus, schoolingStatus]);



useEffect(() => {
  if (data) {
    setDaysAttended(data.progressionInfo.daysAttended);
    setSection(data.progressionInfo.section);
    // setStd(data.progressionInfo.std);
    setStd(preStd);
    setMarks(data.progressionInfo.marks);
    setProgressionStatus(data.progressionInfo.progressionStatus);
    setSchoolingStatus(data.progressionInfo.schoolingStatus);
    setId(data._id);
  }
}, [data]);
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Student Progression</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Progression Status</InputLabel>
            <Select
              value={progressionStatus}
              onChange={(e) => setProgressionStatus(e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Promoted/Passed with Examination">
                Promoted/Passed with Examination
              </MenuItem>
              <MenuItem value="Promoted/Passed without Examination">
                Promoted/Passed without Examination
              </MenuItem>
              <MenuItem value="Not Promoted/Not Passed/Repeater">
                Not Promoted/Not Passed/Repeater
              </MenuItem>
              <MenuItem value="Discontinued before Examination">
                Discontinued before Examination
              </MenuItem>
              <MenuItem value="Discontinued after Examination">
                Discontinued after Examination
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Schooling Status (2024-25)</InputLabel>
            <Select
              value={schoolingStatus}
              onChange={(e) => setSchoolingStatus(e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              {!isMarkHide && (
                <MenuItem value="Studying in Same School">
                  Studying in Same School
                </MenuItem>
              )}
              <MenuItem value="Left school with TC">
                Left school with TC
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Marks in Percentage (%) 2023-24"
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            margin="dense"
            disabled={isMarksDisabled}
          />

          <TextField
            fullWidth
            label="No. of Days School Attended (2023-24)"
            type="number"
            value={daysAttended}
            onChange={(e) => setDaysAttended(e.target.value)}
            margin="dense"
          />

            <TextField
              fullWidth
              label="Class to be Promoted"
              type="text"
              value={std}
              margin="dense"
            />


          <FormControl fullWidth margin="dense">
            <InputLabel>Section to be Promoted</InputLabel>
            <Select
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCorrection}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProgressionCorrectionPopup;
