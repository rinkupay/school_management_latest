import React, { useEffect, useState } from "react";
import NavButton from "../navbutton/NavButton";
import { useParams, useNavigate } from "react-router-dom";
import "./Payment.css";
import "../studentProfile/StudentProfile.css";
import "../Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { FcApproval } from "react-icons/fc";
import { fetchStudentDetail } from "../../../features/studentDetailSlice";
import { fetchSingleStudentDueTransaction,collectStudentFees,generateFeesMemo } from "../../../features/singleStudentDueTransactionSlice";
import toast from 'react-hot-toast';
import ConfirmDialog from "../../confirmDialog/ConfirmDialog";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";


const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fees } = useSelector((state) => state.dueFees);
  const { student } = useSelector((state) => state.studentDetails);
  const data = student?.student;
  


  const [paymentMode, setPaymentMode] = useState("");
  const [transIdOpen, setTransIdOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [selectedFees, setSelectedFees] = useState([]);
  const [months, setMonths] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  

  const handleCheckboxChange = (fee, isChecked) => {
    setSelectedFees((prev) =>
      isChecked ? [...prev, fee._id] : prev.filter((feeId) => feeId !== fee._id)
    );
  
    setTotalAmount((prevAmount) =>
      isChecked ? prevAmount + fee.totalAmount : prevAmount - fee.totalAmount
    );
  
    setMonths((prev) =>
      isChecked ? [...prev, fee.month] : prev.filter((month) => month !== fee.month)
    );
  };

  // HANDLE GENERATE FEE MEMO
  const handleGenerateFeeMemo = () => {
    dispatch(generateFeesMemo({id})).then(() => {
      dispatch(fetchSingleStudentDueTransaction(id));
      window.location.reload();
    })
  }
  

  useEffect(() => {
    dispatch(fetchStudentDetail(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSingleStudentDueTransaction(id));
  }, [dispatch]);

  const handleCancel = () => {
    navigate(`/student/${id}`);
  };

  // if (!transaction) {
  //   return <div>No transaction data found.</div>;
  // }

  const handlePayment = () => {
    handleOpenDialog();
  };

  // <<<<<<<<<<<=========== HANDLE PAYMENT MODE =================>>>>>>>>>>>>
  const handlePaymentMode = (e) => {
    setPaymentMode(e.target.value);
  };
  useEffect(() => {
    if (paymentMode === "upi" || paymentMode === "bank") {
      setTransIdOpen(true);
    } else {
      setTransIdOpen(false);
    }
  }, [paymentMode]);

  // HANDLE TRANSACTION ID

  const handleTransactionId = (e) => {
    setTransactionId(e.target.value);
  };

    //<<<<<<<<<<<<================ CONFIRM DIALOG FOR ACTIVATION ======================>>>>>>>>>>>>>>>>>>>>>>>
const [openActiveBox, setOpenActiveBox] = useState(false);
 
const handleActiveBox = () =>{
  setOpenActiveBox(true);
}

  //<<<<<<<<<<<<================ CONFIRM DIALOG ======================>>>>>>>>>>>>>>>>>>>>>>>

  const [openDialog, setOpenDialog] = useState(false);
  

  const handleOpenDialog = () => {
    if (paymentMode === "") {
      toast.error("Payment mode is required");
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async () => {

    

    if (months.length === 0) {
      toast.error("No due for payment");
    } else {
      toast.promise(
        dispatch(collectStudentFees({ id, months ,paymentMode,transactionId }))
          .unwrap()
          .then(() => {
            dispatch(fetchSingleStudentDueTransaction(id)) // Fetch updated due transactions
            setPaymentMode("")
            setMonths([]);
            setTotalAmount(0);
           
            setTransactionId("")
            
          }),
        {
          pending: "Payment processing...",
          success: "Payment successful!",
          error: "Payment failed. Please try later.",
        }
      );
     
    }

    handleCloseDialog();
  };

  return (
    <div className="dashboard-wrapper">
      {/* Confirm Dialog */}
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
        message={"Are you sure to pay?"}
        actionMessage={"Payment"}
      />

      <div className="dashboard-right">
        <h2 className="dashboard-heading">Fee Payment</h2>

        <NavButton id={id} />

        <div className="payment-wrapper">
          <div className="payment-container">
            <div className="payment-container-left">
              <div className="left-profile">
                <p className="student-info">Student Id: {data?.studentId}</p>
                <p className="student-info">
                  Name: {data?.personalInfo?.fullName}
                </p>
                <p className="student-info">Class: {data?.academicInfo?.std}</p>
              </div>

              {/* Confirmation box for activation */}
              <ConfirmDialog
                open={openActiveBox}
                onClose={handleCloseDialog}
                onConfirm={handleGenerateFeeMemo}
                message={"Do you want to activate ?"}
                actionMessage={"Activate"}
              />

              {fees && fees.length === 0 ? (
                // <div className="dueFee-fetch-btn">
                //   <button
                //     className="deFee-action-btn"
                //     onClick={handleActiveBox}
                //   >
                //     Activate
                //   </button>
                // </div>

                <Stack direction="row" spacing={2}>
                  <Button
                    onClick={handleActiveBox}
                    variant="contained"
                    sx={{
                      backgroundColor: "tomato",
                      ":hover": { backgroundColor: "tomato" },
                    }}
                    endIcon={<IoShieldCheckmarkOutline />}
                  >
                    Activate
                  </Button>
                </Stack>
              ) : (
                // <div className="dueFee-fetch-btn">
                //   <button
                //     className="deFee-action-btn active"

                //   >
                //     Active
                //   </button>
                // </div>

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      ":hover": { backgroundColor: "green" },
                    }}
                    endIcon={<IoMdCheckmarkCircleOutline size={24} />}
                  >
                   
                  </Button>
                </Stack>
              )}
            </div>

            {data && data.isActive === true ? (
              <div className="payment-container-right">
                <div className="right-profile-wrapper">
                  <div className="general-info">
                    <h4 className="profile-heading">Due Payments</h4>
                  </div>

                  <div className="table-container table-subsection">
                    <table className="student-table">
                      <thead>
                        <tr>
                          <th className="first-box">Month</th>
                          <th className="middle-box">Amount</th>
                          <th className="middle-box">Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fees?.map((fee, index) => (
                          <tr key={index}>
                            <td className="first-box">{fee.month}</td>
                            <td className="third-box">{fee.totalAmount}</td>
                            <td className="third-box">
                              {fee.status === "paid" ? (
                                <FcApproval size={24} />
                              ) : (
                                <input
                                  type="checkbox"
                                  className="fee-checkbox"
                                  checked={selectedFees.includes(fee._id)}
                                  onChange={(e) =>
                                    handleCheckboxChange(fee, e.target.checked)
                                  }
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="right-profile-wrapper">
                  <div className="general-info">
                    <h4 className="profile-heading">Payment Summary</h4>
                  </div>
                  <div className="table-container table-subsection">
                    <table className="student-table">
                      <tbody>
                        <tr>
                          <td className="first-box">Mode of Payment</td>
                          <td className="third-box">
                            <select
                              className="mode"
                              name="mode"
                              onChange={handlePaymentMode}
                              id=""
                              value={paymentMode}
                            >
                              <option
                                className="mode-option"
                                defaultValue={""}
                                value=""
                              >
                                Select
                              </option>
                              <option className="mode-option" value="cash">
                                Cash{" "}
                              </option>
                              <option className="mode-option" value="upi">
                                UPI{" "}
                              </option>
                              <option className="mode-option" value="bank">
                                Bank{" "}
                              </option>
                            </select>
                          </td>
                        </tr>

                        {transIdOpen && (
                          <tr>
                            <td className="first-box">Transaction Id</td>
                            <td className="third-box">
                              <input
                                className="transaction-id"
                                onChange={handleTransactionId}
                                value={transactionId}
                                type="text"
                              />
                            </td>
                          </tr>
                        )}

                        <tr>
                          <td className="first-box">Paying Months</td>
                          <td className="third-box">
                            {months.join(", ") || "None"}
                          </td>
                        </tr>
                        <tr>
                          <td className="first-box">Total Months</td>
                          <td className="third-box">{months.length}</td>
                        </tr>

                        <tr>
                          <td className="first-box">Total Amount</td>
                          <td className="third-box">{totalAmount}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="payment-section">
                      <div className="payment-element">
                        <div className="button-col">
                          {/* <button className="pay-btn" onClick={handlePayment}>
                            Pay
                          </button> */}
                          <Button onClick={handlePayment} variant="contained" size="medium" endIcon={<RiMoneyRupeeCircleLine />}>
                            Collect
                          </Button>
                          {/* <button className="pay-btn" onClick={handleCancel}>
                            Cancel
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h3>No dues</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
