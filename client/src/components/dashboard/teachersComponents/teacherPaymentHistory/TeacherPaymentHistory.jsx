import React, { Fragment, useEffect } from "react";

import "./TeacherPaymentHistory.css";
import "../../Dashboard.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherTransaction } from "../../../../features/teacherTransactionSlice";
import { fetchTeacherDetail } from "../../../../features/teacherDetailSlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import TeacherNavBtn from "../../teachersComponents/teacherNavBtn/TeacherNavBtn";

const TeacherPaymentHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { transactions } = useSelector((state) => state.teacherTransaction);
  const { teacher } = useSelector((state) => state.teacherDetails);
  const data = teacher?.teacher;

  useEffect(() => {
    dispatch(fetchTeacherTransaction(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchTeacherDetail(id));
  }, [dispatch, id]);

  const gotoReceipt = (transactionId) => {
    navigate(`/teacher-transaction/${transactionId}`);
  };

  return (
    <Fragment>
      {data && (
        <Fragment>
          <div className="dashboard-wrapper">
      
            <div className="dashboard-right">
              <h2 className="dashboard-heading">Transaction History</h2>

              <TeacherNavBtn id={id} />

              <div className="payment-history-wrapper">
                <div className="payment-history-container">
                  <div className="payment-history-container-left">
                    <div className="teacher-pay-pro">
                      <p className="teacher-pay-info">Employee ID: {data.teacherId}</p>
                      <p className="teacher-pay-info">
                        Name: {data.personalInfo.fullName}
                      </p>
                    </div>
                  </div>
                  <div className="payment-history-container-right">
                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">Transaction History</h2>
                      </div>

                      <div className="teacher-table-container teacher-table-subsection">
                        <table className="teacher-pay-table">
                          <thead>
                            <tr>
                              <th className="payment-box">Month</th>
                              <th className="payment-box">Amount</th>
                              <th className="payment-box">Paid on</th>
                              <th className="payment-box">Paid By</th>
                              <th className="payment-box">View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.length > 0 ? (
                              transactions.map((transaction, index) => (
                                <tr className="payment-dataGroup" key={index}>
                                  <td className="payment-data">
                                    {transaction?.month}
                                  </td>
                                  <td className="payment-data">
                                    {transaction?.paidAmount}
                                  </td>
                                  <td className="payment-data">
                                    {transaction?.date?.slice(0, 10)}
                                  </td>
                                  <td className="payment-data">
                                    {transaction?.paidBy.adminName}
                                  </td>
                                  <td className="payment-data">
                                    <div className="action-btn-btn">
                                      <MdOutlineRemoveRedEye
                                        className="action-view"
                                        onClick={() =>
                                          gotoReceipt(transaction._id)
                                        }
                                        size={24}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5" className="no-transaction">
                                  No Transaction yet
                                </td>
                              </tr>
                            )}
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default TeacherPaymentHistory;
