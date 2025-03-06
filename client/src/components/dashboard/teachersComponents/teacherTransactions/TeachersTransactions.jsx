import React, { useEffect, useState, Fragment } from "react";
import "./TeachersTransactions.css";

import "../../Dashboard.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {fetchTeacherAllTransaction} from "../../../../features/teacherAllTransactionsSlice";

const TeachersTransactions = () => {
  const dispatch = useDispatch();

  const {transactions} = useSelector((state)=>state.teacherAllPayments);

  console.log(transactions);

  const columns = [
    { field: "sno", headerName: "S.No.", minWidth: 130, flex: 0 },
    // { field: "id", headerName: "Transaction ID", minWidth: 250, flex: 0.5 },
    {
      field: "teacherName",
      headerName: "Teacher Name",
      minWidth: 180,
      flex: 0.2,
    },

    { field: "month", headerName: "Paid Month", minWidth: 150, flex: 0.3 },
    {
      field: "createdAt",
      headerName: "Transaction Date",
      minWidth: 180,
      flex: 0.5,
    },
    { field: "amount", headerName: "Total Amount", minWidth: 160, flex: 0.5 },
    // { field: "mode", headerName: "Payment Mode", minWidth: 170, flex: 0.4 },
   
    {
      field: "action",
      flex: 0.3,
      headerName: "View",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/teacher-transaction/${params.id}`} className="action-link-edit">
            <MdOutlineRemoveRedEye size={24} color="#2679C4" />
          </Link>
        </Fragment>
      ),
    },
  ];


  
  const rows = [];
  transactions && transactions?.forEach((payment, index) => {
    rows.push({
      sno: index + 1,
      id: payment._id,
      teacherName: payment?.teacherName,
     
      month: payment?.month,
      createdAt: payment?.date.toString().slice(0, 10),
      amount: payment?.totalAmount,
      mode: payment?.paymentMode,
   
    });
  });



const [selectedStudentId, setSelectedStudentId] = useState([]);
  const handleSelectionModelChange = (newSelection) => {
    setSelectedStudentId(newSelection);
    // console.log(newSelection);
  };



  useEffect(()=>{
    dispatch(fetchTeacherAllTransaction());
  },[]);


  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-right">
        <h2 className="dashboard-heading">EMPLOYEE TRANSACTIONS</h2>
        <div className="data-grid">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleSelectionModelChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TeachersTransactions;
