import React, { Fragment, useEffect } from "react";
import "./Receipt.css";
import"./PaymentReceipt.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleStudentTransaction } from "../../../features/receiptSlice";
import {fetchSchoolDetails} from "../../../features/schoolDetailsSlice/schoolDetailSlice"
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const PaymenttReceipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [schoolData, setSchoolData] = React.useState({});

  const { receipt, loading } = useSelector((state) => state.paymentReceipt);
  const {schoolDetails} = useSelector((state) => state.schoolDetails);



  useEffect(() => {
    dispatch(fetchSingleStudentTransaction(id));
  }, []);

  const handlePrint = async () => {
    const printContents = document.getElementById("receipt").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const goBack = () => {
    navigate(-1);
  };


  useEffect(() => {
dispatch(fetchSchoolDetails());
  },[receipt])

  useEffect(() => {
if(schoolDetails){
  setSchoolData(schoolDetails);
}
  },[schoolDetails])
  return (
    <>
      {receipt && (
        <div className="receipt-wrapper">
          <div className="receipt-action-btn-container">
            <div className="receipt-btn">
              {/* <button className="receipt-act-btn" onClick={handlePrint}>Print</button> */}
              <Box sx={{ '& button': { m: 1 } }}>
              <Button onClick={handlePrint} size="medium">Print</Button>
              <Button onClick={goBack} size="medium" sx={{color:"red"}}>Back</Button>
                </Box>
            
              {/* <button className="receipt-act-btn" onClick={goBack}>Go Back</button> */}
            </div>
          </div>

          <div className="receipt-container" id="receipt">
            <div className="receipt-container-1">
              <div className="receipt-left-container">
                <p>Transaction Id : {receipt?._id}</p>
                <p>Student Id : {receipt?.studentId}</p>
                <p>Student Name : {receipt?.studentName}</p>
                <p>Class : {receipt?.std}</p>
                <p>Roll No. : {receipt?.rollNo}</p>
              </div>
              <div className="receipt-right-container">
                <p>Institution Name : {schoolData.schoolName}</p>
                <p>Date : {receipt?.receivedBy?.date?.slice(0, 10).split('-').reverse().join('-')}</p>
             
                <p>Month : {receipt?.month}</p>
                {receipt.paymentMode ? <Fragment><p>Payment Mode : {receipt?.paymentMode}</p>
                <p>Transaction No. : {receipt?.transactionId}</p></Fragment> : ""}
                <p>
                  Received By : {receipt?.receivedBy?.adminName}
                </p>
              </div>
            </div>
            <div className="receipt-container-2">
              <table className="receipt-table">
                <thead>
                  <tr>
                    <th className="receipt-box">S.No.</th>
                    <th className="receipt-box">Fee Category</th>
                    <th className="receipt-box">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="receipt-data">1</td>
                    <td className="receipt-data">Tution Fee</td>
                    <td className="receipt-data">
                      {receipt?.tutionFee}
                    </td>
                  </tr>
                  <tr>
                    <td className="receipt-data">2</td>
                    <td className="receipt-data">Admission Fee</td>
                    <td className="receipt-data">
                      {receipt?.admissionFee}
                    </td>
                  </tr>
                  <tr>
                    <td className="receipt-data">3</td>
                    <td className="receipt-data">Hostel Fee</td>
                    <td className="receipt-data">
                      {receipt?.hostelFee}
                    </td>
                  </tr>
                  <tr>
                    <td className="receipt-data">4</td>
                    <td className="receipt-data">Bus Fee</td>
                    <td className="receipt-data">
                      {receipt?.busFee}
                    </td>
                  </tr>

                  <tr>
                    <td className="receipt-data">5</td>
                    <td className="receipt-data">Late Fee</td>
                    <td className="receipt-data">
                      {receipt?.lateFee}
                    </td>
                  </tr>
                  <tr>
                    <td className="receipt-data">6</td>
                    <td className="receipt-data">Exam Fee</td>
                    <td className="receipt-data">
                      {receipt?.examFee}
                    </td>
                  </tr>
                  <tr className="footer-total">
                    <td className="receipt-data"></td>
                    <td className="receipt-data">Total</td>
                    <td className="receipt-data">
                      {receipt?.totalAmount}
                    </td>
                  </tr>

                  
                </tbody>
               
              </table>
              <p>Note : This is computer generated receipt.</p>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymenttReceipt;
