import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import "./TeacherPayment.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherDuePayments } from "../../../../features/teacherDuePaymentSlice";
import { teacherPayment } from "../../../../features/teacherPaymentSlice";
import { fetchTeacherDetail } from "../../../../features/teacherDetailSlice";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../confirmDialog/ConfirmDialog";
import TeacherNavBtn from "../../teachersComponents/teacherNavBtn/TeacherNavBtn";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const TeacherPayment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { payments } = useSelector((state) => state.teacherDuePayments);
  const data = payments?.monthsDue;
  const totalDue = payments?.totalDue;

  const { teacher } = useSelector((state) => state.teacherDetails);
  const teacherData = teacher?.teacher;

  const [amount, setAmount] = useState(0);
  const [bonusAmount, setBounusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [totalMonths, setTotalMonths] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  // <<<<<<<<<<<<===========    HANDLE TOTAL MONTHS =============>>>>>>>>>>>

  const noOfMonths = Math.floor(
    amount / teacherData?.paymentInfo?.perMonthSalary
  );

  // <<<<<<<<<<<<===========    HANDLE BONUS =============>>>>>>>>>>>
  const handleBonus = (e) => {
    const bonusValue = Number(e.target.value) || 0;
    setBounusAmount(bonusValue);
  };

  // <<<<<<<<<<<<===========    HANDLE PAYMENT AMOUNT =============>>>>>>>>>>>
  const handlePayAmount = (e) => {
    setAmount(Number(e.target.value));
  };

  // <<<<<<<<<<<<===========    HANDLE PAYMENT MODE =============>>>>>>>>>>>
  const handlePaymentMode = (e) => {
    setPaymentMode(e.target.value);
  };

  // <<<<<<<<<<<<===========    HANDLE PAYMENT =============>>>>>>>>>>>
  const handlePayment = () => {
    if (!paymentMode) {
      toast.error("Payment mode is required");
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async () => {
    const formData = {
      amount,
      bonusAmount,
      totalAmount,
      paymentMode,
      dueDate,
    };

    if (!amount || !totalAmount) {
      toast.error("No due for payment");
    } else {
      toast
        .promise(dispatch(teacherPayment({ id, formData })).unwrap(), {
          pending: "Payment processing...",
          success: "Payment successful!",
          error: "Payment failed. Please try later.",
        })
        .then(() => {
          dispatch(fetchTeacherDuePayments(id));
        });
    }

    handleCloseDialog();
  };

  // <<<<<<<<<<<<===========    HANDLE CANCEL =============>>>>>>>>>>>
  const handleCancel = () => {
    setAmount(totalDue || 0);
    setPaymentMode("");
    setOpenDialog(false);
  };

  useEffect(() => {
    setAmount(totalDue || 0);
  }, [totalDue]);

  useEffect(() => {
    if (data && data.length > 0) {
      setDueDate(data[0].month);
    }
  }, [data]);

  useEffect(() => {
    setTotalAmount(amount + bonusAmount);
  }, [amount, bonusAmount]);

  // NO OF MONTHS PAYING
  useEffect(() => {
    setTotalMonths(noOfMonths);
  }, [amount]);

  useEffect(() => {
    dispatch(fetchTeacherDuePayments(id));
    dispatch(fetchTeacherDetail(id));
  }, [dispatch, id]);

  return (
    <div className="dashboard-wrapper">
      {/* Confirm Dialog */}
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
        message={"Are you sure you want to proceed with the payment?"}
        actionMessage={"Confirm Payment"}
      />

      <div className="dashboard-right">
        <h2 className="dashboard-heading">Fee Payment</h2>

        <TeacherNavBtn id={id} />

        <div className="payment-wrapper">
          <div className="payment-container">
            <div className="payment-container-left">
              <div className="left-profile">
                <p className="teacher-info">
                  Employee ID: {teacherData?.teacherId}
                </p>
                <p className="teacher-info">
                  Name: {teacherData?.personalInfo?.fullName}
                </p>
              </div>
             
            </div>

            <div className="payment-container-right">
              <div className="right-profile-wrapper">
                <div className="general-info">
                  <h4 className="profile-heading">Due Payments</h4>
                </div>

                <div className="table-container table-subsection">
                  <table className="teacher-table">
                    <thead>
                      <tr>
                        <th className="first-box">Month</th>
                        <th className="middle-box">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((month, index) => (
                          <tr key={index}>
                            <td className="first-box">{month.month}</td>
                            <td className="third-box">{month.due || 0}</td>
                          </tr>
                        ))}
                      <tr>
                        <td className="first-box">
                          <strong>Total Dues</strong>
                        </td>
                        <td className="third-box">
                          <strong>{totalDue}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="right-profile-wrapper">
                <div className="general-info">
                  <h4 className="profile-heading">Payment Summary</h4>
                </div>
                <div className="table-container table-subsection">
                  <table className="teacher-table">
                    <tbody>
                      <tr>
                        <td className="first-box">Payable Amount</td>
                        <td className="third-box">
                          <input
                            className="amount-value"
                            id="amount"
                            value={amount}
                            onChange={handlePayAmount}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="first-box">Bonus</td>
                        <td className="third-box">
                          <input
                            className="amount-value"
                            id="amount"
                            value={bonusAmount}
                            onChange={handleBonus}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="first-box">Mode of Payment</td>
                        <td className="third-box">
                          <select
                            className="mode"
                            name="mode"
                            value={paymentMode}
                            onChange={handlePaymentMode}
                          >
                            <option className="mode-option" value="">
                              Select
                            </option>
                            <option className="mode-option" value="cash">
                              Cash
                            </option>
                            <option className="mode-option" value="upi">
                              UPI
                            </option>
                            <option className="mode-option" value="bank">
                              Bank
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="first-box">From Month</td>
                        <td className="third-box">{dueDate}</td>
                      </tr>

                      <tr>
                        <td className="first-box">Number of months</td>
                        <td className="third-box">{totalMonths}</td>
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
                        <button className="pay-btn" onClick={handlePayment}>
                          Pay
                        </button>
                        <button className="pay-btn" onClick={handleCancel}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPayment;
