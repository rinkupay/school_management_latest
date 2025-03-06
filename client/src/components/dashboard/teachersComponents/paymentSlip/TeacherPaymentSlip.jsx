import React, { useEffect } from "react";

import "../../Dashboard.css"
import "./TeacherPaymentSlip.css"
import PaymentSlip from "./PaymentSlip";
import {useNavigate,useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchTeacherSingleTransaction} from "../../../../features/teacherSinglePaymentSlice";

const TeacherPaymentSlip = () => {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    
    const {transaction} = useSelector((state)=>state.teacherSinglePayment)
    const data = transaction;
 
    const handlePrint = () => {
        const printContents = document.getElementById("payment-receipt").innerHTML;
        const originalContents = document.body.innerHTML;
    
        document.body.innerHTML = printContents;
    
        window.print();
    
        document.body.innerHTML = originalContents;
        window.location.reload();
      
    }

    const goBack = ()=>{
        navigate(-1);
    }

// <<<<<<<<<<<<========= FETCH SINGLE TRANSACTION =========>>>>>>>>>>
    useEffect(()=>{
      dispatch(fetchTeacherSingleTransaction({id}));
    },[id]);

  return (


    <div className="dashboard-wrapper">

    <div className="dashboard-right">
      <h2 className="dashboard-heading">RECEIPT</h2>
      <div className="action-btn-container">
        <button className="action-btn" onClick={handlePrint}>Print</button>
        <button className="action-btn" onClick={goBack}>Go Back</button>
      </div>
     <div className="payment-receipt" id="payment-receipt">
     <PaymentSlip  data={data} />
     </div>
    </div>
    </div>
  )



};

export default TeacherPaymentSlip;
