import React, { useEffect } from "react";
import "../Dashboard.css";
import "./TransactionSlip.css"
import PaymenttReceipt from "./PaymentReceipt";




const TransactionSlip = () => {
  




  return (
    <div className="dashboard-wrapper">
 
      <div className="dashboard-right">
        <h2 className="dashboard-heading">TRANSACTION RECEIPT</h2>
       
        <PaymenttReceipt />
     
      </div>
    </div>
  );
};

export default TransactionSlip;
