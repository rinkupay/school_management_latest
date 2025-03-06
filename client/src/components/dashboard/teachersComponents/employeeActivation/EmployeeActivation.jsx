import React, { useEffect, useState } from "react";
import "../../Dashboard.css";
import { DataGrid } from "@mui/x-data-grid";
import { fetchTeachers } from "../../../../features/allTeacherSlice";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from "../../../confirmDialog/ConfirmDialog";
import { deleteTeacher, updateTeacherStatus as updateTeacherStatusAction } from "../../../../features/teacherRegistrationSlice";

const EmployeeActivation = () => {
  const dispatch = useDispatch();
  const { teachers } = useSelector((state) => state.teachers);

  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState({}); // State to store the updated status for each teacher
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false); // State for Update Confirmation Dialog
  const [teacherToUpdate, setTeacherToUpdate] = useState(null); // Store the teacher to update
  const [teacherToDelete, setTeacherToDelete] = useState(null); // Store the teacher to delete

  // Handles the status change in the dropdown
  const handleStatusChange = (id, value) => {
    const newStatus = value === "Active" ? true : false;
    setEmployeeStatus((prevStatus) => ({
      ...prevStatus,
      [id]: newStatus, // Update the status of the specific teacher by ID
    }));
  };

  // Updates the teacher's status when the "Update" button is clicked
  const handleUpdate = (id) => {
    setTeacherToUpdate(id);
    setOpenUpdateDialog(true); // Open the confirmation dialog for update
  };

  // Handle the update confirmation
  const handleConfirmUpdate = () => {
    const newStatus = employeeStatus[teacherToUpdate];
    if (newStatus !== undefined) {
      dispatch(updateTeacherStatusAction({ id: teacherToUpdate, status: newStatus })) // Dispatch the update action
        .then(() => {
          dispatch(fetchTeachers()); // Fetch updated teachers
        });
       
    } else {
      console.log(`No status change for teacher ID: ${teacherToUpdate}`);
    }
   
    setOpenUpdateDialog(false); // Close the update confirmation dialog
   
  };

  // Handle the delete action
  const handleDelete = () => {
    if (teacherToDelete) {
      dispatch(deleteTeacher({ teacherId: teacherToDelete })) // Dispatch the delete action
        .then(() => {
         dispatch(fetchTeachers()); // Fetch updated teachers after deletion
        });
      setOpenDeleteDialog(false); // Close the delete confirmation dialog
  
    }
  };

  const handleDeletePopUpOpen = (id) => {
    setTeacherToDelete(id);
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
    setOpenUpdateDialog(false); // Close both dialogs when clicking outside
  };

  const columns = [
    { field: "sno", headerName: "S.No.", minWidth: 80, flex: 0.8 },
    { field: "employeeName", headerName: "Name", minWidth: 180, flex: 0.2 },
    { field: "employeeRole", headerName: "Role", minWidth: 100, flex: 0.2 },
    { field: "employeeJoin", headerName: "Joining", minWidth: 100, flex: 0.2 },
    {
      field: "employeeStatus",
      headerName: "Current Status",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <div>
          {params.row.employeeStatus === "Active" ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      field: "statusChange",
      headerName: "Change Status",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={employeeStatus[params.id] !== undefined ? (employeeStatus[params.id] ? "Active" : "Inactive") : (params.row.employeeStatus === "Active" ? "Active" : "Inactive")} // Default based on initial status
            label="Status"
            onChange={(e) => handleStatusChange(params.id, e.target.value)} // Update state on change
          >
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"Inactive"}>Inactive</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      field: "employeeAction",
      headerName: "Action",
      minWidth: 150,
      flex: 0.2,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={2} sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
          <Button
            variant="outlined"
            onClick={() => handleUpdate(params.id)} // Open update confirmation dialog
          >
            Update
          </Button>
        </Stack>
      ),
    },
    {
      field: "employeeDel",
      headerName: "Delete",
      minWidth: 150,
      flex: 0.2,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={2} sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => handleDeletePopUpOpen(params.id)}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const rows = teachers.map((teacher, index) => ({
    sno: index + 1,
    id: teacher._id,
    employeeName: teacher.personalInfo.fullName,
    employeeRole: teacher.employeeRole,
    employeeJoin: teacher.paymentInfo.joinDate
      ?.slice(0, 10)
      .split("-")
      .reverse()
      .join("-"),
    employeeStatus: teacher.isActive ? "Active" : "Inactive", // Show current status
  }));

  useEffect(() => {
    dispatch(fetchTeachers({ gender, role }));
 
  }, [dispatch, gender, role,openDeleteDialog,openUpdateDialog]);

  return (
    <div className="dashboard-wrapper">
      {/* DELETE CONFIRMATION POPUP */}
      <ConfirmDialog
        message={"Are you sure you want to delete?"}
        open={openDeleteDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        actionMessage={"Delete"}
      />

      {/* UPDATE CONFIRMATION POPUP */}
      <ConfirmDialog
        message={"Are you sure you want to update the status?"}
        open={openUpdateDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmUpdate} // Confirm the status update
        actionMessage={"Update"}
      />

      <div className="dashboard-right">
        <h2 className="dashboard-heading">EMPLOYEE ACTIVATION</h2>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </div>
    </div>
  );
};

export default EmployeeActivation;
