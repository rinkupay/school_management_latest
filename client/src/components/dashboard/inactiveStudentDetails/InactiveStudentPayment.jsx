import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import "./InactiveStudentPayment.css";
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateDue } from "../../../features/singleTransactionSlice";
import { fetchStudentDetail } from "../../../features/studentDetailSlice";
import { admissionFeePayment, resetStatus } from "../../../features/paymentSlice";
import ConfirmDialog from "../../confirmDialog/ConfirmDialog";


const InactiveStudentPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { transaction } = useSelector((state) => state.due);
  const { adminDetails } = useSelector((state) => state.user);
  const { student } = useSelector((state) => state.studentDetails);
  const data = student?.student;
  const { status } = useSelector((state) => state.payment);

  const [bill, setBill] = useState({});
  const [paymentMode,setPaymentMode] = useState("");
  const [transIdOpen,setTransIdOpen] = useState(false);
  const [transactionId,setTransactionId] = useState("");

  const [totalAmount, setTotalAmount] = useState(0);
  const [examFee, setExamFee] = useState(0);
  const [lateFee, setLateFee] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [payMonth, setPayMonth] = useState(0);

  // FOR BILLING
  const [studentName, setStudentName] = useState("");
  const [admissionFee, setAdmissionFee] = useState(0);
  const [monthlyFee, setMonthlyFee] = useState(0);
  const [tutionFee, setTuttionFee] = useState(0);
  const [busFee, setBusFee] = useState(0);
  const [hostelFee, setHostelFee] = useState(0);
  const [std, setStd] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [receivedBy, setReceivedBy] = useState("");



  useEffect(() => {
    setPayMonth(Math.floor(totalAmount / (data?.academicInfo?.monthlyFee || 1)));
  }, [totalAmount, data]);

  useEffect(() => {
    if (data) {
      setAdmissionFee(Number(data?.academicInfo?.admissionFee || 0));
      setMonthlyFee(Number(data.academicInfo?.monthlyFee || 0));
      setTuttionFee(Number(data.academicInfo?.tutionFee || 0));
      setBusFee(Number(data.academicInfo?.busFee || 0));
      setHostelFee(Number(data.academicInfo?.hostelFee || 0));
      setStudentName(data.personalInfo?.fullName || "");
      setRollNo(data.academicInfo?.rollNo || "");
      setStd(data.academicInfo?.std || "");
      setReceivedBy(adminDetails?.user?.userName || "");
    }
  }, [data, adminDetails]);

  useEffect(() => {
    dispatch(calculateDue(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchStudentDetail(id));
  }, [dispatch, id]);



  useEffect(() => {
    if (transaction?.monthsDue && transaction.monthsDue.length > 0) {
      setDueDate(transaction.monthsDue[0].month || "");
    }
  }, [transaction]);

  // Recalculate total amount whenever amount, examFee, or lateFee changes
  useEffect(() => {
    setTotalAmount(
      Number(admissionFee) +
      Number(tutionFee) +
      Number(hostelFee) +
      Number(busFee) +
      Number(lateFee)
    );
  }, [admissionFee, tutionFee, hostelFee, busFee, lateFee]);

  const handleCancel = () => {
    navigate(`/student-inactive/${id}`);
  };

  const handleLateFeeChange = (e) => {
    const isChecked = e.target.checked;
    const fee = parseInt(e.target.value);

    if (isChecked) {
      setLateFee(fee);
    } else {
      setLateFee(0);
    }
  };

  if (!transaction) {
    return <div>No transaction data found.</div>;
  }

  const handlePayment = () => {
    handleOpenDialog();
  };


  // <<<<<<<<<<<=========== HANDLE PAYMENT MODE =================>>>>>>>>>>>>
  const handlePaymentMode = (e) =>{

    setPaymentMode(e.target.value);


  }
useEffect(()=>{

  if(paymentMode === "upi" || paymentMode === "bank"){
    setTransIdOpen(true);
  }else{
    setTransIdOpen(false);
  }


},[paymentMode]);

// HANDLE TRANSACTION ID

const handleTransactionId = (e) =>{
  setTransactionId(e.target.value);
}


  // CONFIRM DIALOG
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    if(paymentMode === ""){
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
    
      admissionFee,
      tutionFee,
      busFee,
      paymentMode,
      transactionId,
      hostelFee,
      dueDate,
      totalAmount,
      lateFee,
     
    };

    if (!totalAmount ) {
      toast.error("No due for payment");
    } else {
      toast.promise(dispatch(admissionFeePayment({ id, formData })).unwrap(), {
        pending: "Payment processing...",
        success: "Payment successful!",
        error: "Payment failed. Please try later.",
      });
    }

    handleCloseDialog();
  };

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/payment", { state: { bill } });
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setBill({
      id,
      studentName,
      std,
      rollNo,
      admissionFee,
      tutionFee,
      busFee,
      hostelFee,
      monthlyFee,
      dueDate,
      totalAmount,
      examFee,
      lateFee,
      payMonth,
  
      receivedBy,
    });
  }, [ dueDate,admissionFee, totalAmount, examFee, lateFee, payMonth]);

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
        <h2 className="dashboard-heading">ADMISSION FEE SUMMARY</h2>

        <div className="inactive-payment-wrapper">
          <div className="inactive-payment-container">
            <div className="inactive-payment-container-left">
              <div className="left-profile">
                <p className="student-info">Student ID: {data?.studentId}</p>
                <p className="student-info">
                  Name: {data?.personalInfo?.fullName}
                </p>
                <p className="student-info">Class: {data?.academicInfo?.std}</p>
              </div>
            </div>

            <div className="inactive-payment-container-right">
              <div className="inactive-right-profile-wrapper">
                <div className="general-info">
                  <h4 className="profile-heading">Payment Summary</h4>
                  <h4 className="profile-heading">Due Date: {dueDate}</h4>
                </div>
                <div className="table-container table-subsection">
                  <table className="student-table">
                    <tbody>
                      <tr>
                        <td className="first-box">Admission Fee</td>
                        <td className="third-box">{admissionFee}</td>
                      </tr>
                      <tr>
                        <td className="first-box">Tution Fee</td>
                        <td className="third-box">{tutionFee}</td>
                      </tr>
                      <tr>
                        <td className="first-box">Hostel Fee</td>
                        <td className="third-box">{hostelFee}</td>
                      </tr>
                      <tr>
                        <td className="first-box">Bus Fee</td>
                        <td className="third-box">{busFee}</td>
                      </tr>
                      <tr>
                        <td className="first-box">
                          Late Fee{" "}
                          <input
                            className="additional-fee"
                            type="checkbox"
                            name="lateFee"
                            value={150}
                            checked={lateFee === 150}
                            onChange={handleLateFeeChange}
                          />
                        </td>
                        <td className="third-box">{lateFee}</td>
                      </tr>
                 
                      <tr>
                        <td className="first-box">Total Amount</td>
                        <td className="third-box">{totalAmount}</td>
                      </tr>

                      <tr>
                        <td className="first-box">Mode of Payment</td>
                        <td className="third-box">
                          <select className="mode" name="mode" onChange={handlePaymentMode} id="">
                            <option className="mode-option" value="">Select</option>
                            <option className="mode-option" value="cash">Cash </option>
                            <option className="mode-option" value="upi">UPI </option>
                            <option className="mode-option" value="bank">Bank </option>
                          </select>
                        </td>
                      </tr>

                    {transIdOpen &&   <tr>
                        <td className="first-box">Transaction ID</td>
                        <td className="third-box"><input className="transaction-id" type="text" value={transactionId} onChange={handleTransactionId} /></td>
                      </tr>}


                    </tbody>
                  </table>
                </div>
              </div>
              <div className="button-wrapper">
                <button
                  type="submit"
                  className="payment-confirm-btn"
                  onClick={handlePayment}
                >
                  Confirm Payment
                </button>
                <button
                  type="button"
                  className="payment-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InactiveStudentPayment;
