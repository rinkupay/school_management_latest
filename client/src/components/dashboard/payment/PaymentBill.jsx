import React, { useEffect } from "react";
import "./PaymentBill.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleStudentTransaction } from "../../../features/receiptSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "../Dashboard.css";

const PaymentBill = () => {
  const location = useLocation();

  const { bill } = location.state;

  // const {id} = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { receipt, loading } = useSelector((state) => state.paymentReceipt);

  // Get the current date and format it
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB"); // format as DD/MM/YYYY

  // useEffect(()=>{

  //   dispatch(fetchSingleStudentTransaction(id));

  // },[])

  const handlePrint = async () => {
    const printContents = document.getElementById("receipt").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const goBack = () => {
    navigate(`/student/${bill.id}`);
  };
  return (
    <>
      <div className="dashboard-wrapper">
        <div className="dashboard-right">
          <h2 className="dashboard-heading">RECEIPT</h2>

          {receipt && (
            <div className="receipt-wrapper">
              <div className="receipt-action-btn-container">
                <div className="receipt-btn">
                  <button onClick={handlePrint}>Print</button>
                  <button onClick={goBack}>Go Back</button>
                </div>
              </div>

              <div className="receipt-container" id="receipt">
                <div className="receipt-container-1">
                  <div className="receipt-left-container">
                    <p>Transaction Id : {receipt?.transaction?._id}</p>
                    <p>Student Id : {bill.id}</p>
                    <p>Student Name : {bill.studentName}</p>
                    <p>Class : {bill.std}</p>
                    <p>Roll No. : {bill.rollNo}</p>
                  </div>
                  <div className="receipt-right-container">
                    <p>Institution Name : Western English School</p>
                    <p>Date : {formattedDate}</p>
                    <p>Due Date : {bill.dueDate.slice(0, 10)}</p>
                    <p>Month : {bill.noMonths}</p>
                    <p>Mode of Payment: {bill?.paymentMode}</p>
                    {bill?.transactionId !== "" && (
                      <p>Transaction No. : {bill.transactionId}</p>
                    )}
                    <p>Received By : {bill.receivedBy}</p>
                  </div>
                </div>
                <div className="receipt-container-2">
                  <table className="receipt-table">
                    <thead>
                      <tr>
                        <th className="receipt-box">Sr</th>
                        <th className="receipt-box">Fee Category</th>
                        <th className="receipt-box">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="receipt-data">1</td>
                        <td className="receipt-data">Tution Fee</td>
                        <td className="receipt-data">{bill.tutionFee}</td>
                      </tr>
                      <tr>
                        <td className="receipt-data">2</td>
                        <td className="receipt-data">Admission Fee</td>
                        <td className="receipt-data">{bill.admissionFee}</td>
                      </tr>
                      <tr>
                        <td className="receipt-data">3</td>
                        <td className="receipt-data">Hostel Fee</td>
                        <td className="receipt-data">{bill.hostelFee}</td>
                      </tr>
                      <tr>
                        <td className="receipt-data">4</td>
                        <td className="receipt-data">Bus Fee</td>
                        <td className="receipt-data">{bill.busFee}</td>
                      </tr>

                      <tr>
                        <td className="receipt-data">5</td>
                        <td className="receipt-data">Late Fee</td>
                        <td className="receipt-data">{bill.lateFee}</td>
                      </tr>
                      <tr>
                        <td className="receipt-data">6</td>
                        <td className="receipt-data">Exam Fee</td>
                        <td className="receipt-data">{bill.examFee}</td>
                      </tr>
                      <tr className="footer-total">
                        <td className="receipt-data"></td>
                        <td className="receipt-data">Total</td>
                        <td className="receipt-data">{bill.totalAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentBill;
