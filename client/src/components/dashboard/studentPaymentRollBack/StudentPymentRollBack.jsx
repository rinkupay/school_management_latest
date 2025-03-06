import React, { useEffect, useState } from "react";
import "./StudentPymentRollBack.css";
import "../Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentSingleTransaction,
  deleteStudentSingleTransaction,
} from "../../../features/studentTransactionRollBack";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

const StudentPymentRollBack = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);




  const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

  const { transaction } = useSelector(
    (state) => state.singleStudentTransaction
  );



  const handleSearchId = (e) => {
    setId(e.target.value);
  };

  const handleSearch = () => {
    dispatch(fetchStudentSingleTransaction({ id }));
  };

 
  const handleConfirmDelete = () => {
    dispatch(deleteStudentSingleTransaction({ id })).then(() => {
      setId("");
      handleClose();
      dispatch(fetchStudentSingleTransaction({ id: "" }));  // Clear out the transaction data (ensure this action is available to reset it)
      
      
    });
  };



  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">ROLE BACK TRANSACTIONS</h2>
        <div className="rollback-ssearchWrapper">
          <div className="rollback-ssearchItem">
            <input
              type="text"
              className="rollback-ssearchName"
              placeholder="Enter Transaction Id"
              onChange={handleSearchId}
            />
            <button className="rollback-ssearchBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        {/* ROLL BACK TABLE */}

        {transaction && (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
            <TableContainer
              component={Paper}
              sx={{ padding: 3, maxWidth: 900, borderRadius: 2, boxShadow: 3 }}
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                Transaction Details
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.2)" }}
                    >
                      <b>Transaction Id:</b> {transaction._id}
                    </TableCell>
                    <TableCell>
                      <b>Status:</b> {transaction.status}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.2)" }}
                    >
                      <b>Student Name:</b> {transaction.studentName}
                    </TableCell>
                    <TableCell>
                      <b>Class:</b> {transaction.std}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.2)" }}
                    >
                      <b>Paid on:</b> {transaction?.date?.slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      <b>Amount</b> {transaction.totalAmount}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.2)" }}
                    >
                      <b>Month:</b> {transaction.month}
                    </TableCell>
                    <TableCell>
                      <b>Due Date:</b> {transaction.dueDate?.slice(0,10)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.2)" }}
                    >
                      <b>Received By:</b> {transaction?.receivedBy?.adminName}
                    </TableCell>
                    <TableCell>
                      <b>Mode:</b> {transaction.paymentMode}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Divider sx={{ marginY: 2 }} />

              <Typography
                variant="h6"
                sx={{ marginTop: 3, fontWeight: "bold", color: "#333" }}
              >
                Fee Summary
              </Typography>
              <Table>
                <TableBody>
                 
                  <TableRow>
                    <TableCell>Admission Fee</TableCell>
                    <TableCell>{transaction.admissionFee}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tuition Fee</TableCell>
                    <TableCell>{transaction.tutionFee}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hostel Fee</TableCell>
                    <TableCell>{transaction.hostelFee}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bus Fee</TableCell>
                    <TableCell>{transaction.busFee}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Exam Fee</TableCell>
                    <TableCell>{transaction.examFee}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Late Fee</TableCell>
                    <TableCell>{transaction.lateFee}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <b>Sub Total</b>
                    </TableCell>
                    <TableCell>{transaction.totalAmount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 2 }}
                onClick={handleOpen}
              >
                Rollback Transaction
              </Button>

              <Typography
                variant="body1"
                sx={{ marginTop: 2, fontWeight: "bold", color: "#d32f2f" }}
              >
                Notes: This will rollback the transaction.
              </Typography>
            </TableContainer>
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to rollback this transaction? This action
              cannot be undone. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error">
             Rollback
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentPymentRollBack;
