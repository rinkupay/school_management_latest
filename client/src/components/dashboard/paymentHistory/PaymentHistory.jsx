import React, { useEffect, useState } from "react";

import NavButton from "../navbutton/NavButton";
import { useParams, useNavigate } from "react-router-dom";
import "./PaymentHistory.css";
import "../studentProfile/StudentProfile.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchStudentDetail } from "../../../features/studentDetailSlice";
import { fetchStudentTransaction } from "../../../features/studentTransactionSlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const PaymentHistory = () => {
  const { id } = useParams();
  const status = "paid";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student, loading } = useSelector((state) => state.studentDetails);
  const { transactions } = useSelector((state) => state.studentTransaction);
  const data = student?.student;

  const gotoReceipt = (receiptId) => {
    navigate(`/transaction/${receiptId}`);
  };

  useEffect(() => {
    dispatch(fetchStudentDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchStudentTransaction({ id, status }));
  }, [dispatch]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">Transaction History</h2>

        <NavButton id={id} />

        <div className="payment-history-wrapper">
          <div className="payment-history-container">
            <div className="payment-history-container-left">
              <div className="student-pro">
                <p className="student-info">Student ID: {data?.studentId}</p>
                <p className="student-info">
                  Name: {data?.personalInfo?.fullName}
                </p>
                <p className="student-info">Class: {data?.academicInfo?.std}</p>
              </div>
            </div>
            <div className="payment-history-container-right">
              <div className="right-profile-wrapper">
                <div className="general-info">
                  <h2 className="profile-heading">Transaction History</h2>
                </div>

                <div className="table-container table-subsection">
                  <table className="student-table">
                    <thead>
                      <tr>
                        <th className="payment-box">Month</th>
                        <th className="payment-box">Amount</th>
                        <th className="payment-box">Paid on</th>
                        <th className="payment-box">Received By</th>
                        <th className="payment-box">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions
                        ? transactions.map((transaction, index) => (
                            <tr className="payment-dataGroup" key={index}>
                              <td className="payment-data">
                                {transaction?.month}
                              </td>
                              <td className="payment-data">
                                {transaction?.totalAmount}
                              </td>
                              <td className="payment-data">
                                {transaction?.date
                                  ?.slice(0, 10)
                                  .split("-")
                                  .reverse()
                                  .join("-")}
                              </td>
                              <td className="payment-data">
                                {transaction?.receivedBy?.adminName}
                              </td>
                              <td className="payment-data">
                                <div className="action-btn-btn">
                                  <MdOutlineRemoveRedEye
                                    className="action-view"
                                    onClick={() => gotoReceipt(transaction._id)}
                                    size={22}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                        : "No Transaction Yet"}
                    </tbody>
                  </table>
                  <div className="payment-section"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
