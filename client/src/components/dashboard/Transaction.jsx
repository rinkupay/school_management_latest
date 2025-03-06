import React, { useEffect, useState, Fragment } from "react";
import "./statistics/StatisticComponent.css"
import "./Dashboard.css";
import { DataGrid } from '@mui/x-data-grid';
import { fetchTransaction } from "../../features/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Transaction = () => {
  const dispatch = useDispatch();

  const { transactions } = useSelector((state) => state.transaction);
  const payments = transactions;
  const status = 'paid';

  // FILTER MENUS STATE AND FUNCTONS
  
    const [currentMonth, setCurrentMonth] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedMonthOption, setSelectedMonthOption] = useState("current");
    const date = new Date();
    const currentYear = date.getFullYear();
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const defaultCurrentMonth = `${currentYear}-${formattedMonth}`;
  
    const handleStartDate = (e) => setStartDate(e.target.value);
    const handleEndDate = (e) => setEndDate(e.target.value);
  
    const handleMonthChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedMonthOption(selectedValue);
  
      let selectedYear = currentYear;
      let selectedMonth = date.getMonth() + 1;
  
      if (selectedValue === "previous") {
        if (selectedMonth === 1) {
          selectedMonth = 12;
          selectedYear -= 1;
        } else {
          selectedMonth -= 1;
        }
      }
  
      const formattedSelectedMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
      setCurrentMonth(formattedSelectedMonth);
    };
      useEffect(() => {
        setCurrentMonth(defaultCurrentMonth);
      }, []);
  


  const columns = [
    { field: "sno", headerName: "S.No.", minWidth: 130, flex: 0 },
    // { field: "id", headerName: "Transaction ID", minWidth: 250, flex: 0.5 },
    { field: "studentName", headerName: "Student Name", minWidth: 180, flex: 0.2 },
    { field: "std", headerName: "Class", minWidth: 130, flex: 0.3 },
    { field: "month", headerName: "Paid Month", minWidth: 150, flex: 0.3 },
    { field: "createdAt", headerName: "Transaction Date", minWidth: 180, flex: .5 },
    { field: "amount", headerName: "Total Amount", minWidth: 160, flex: 0.5 },
    // { field: "mode", headerName: "Payment Mode", minWidth: 170, flex: 0.4 },
    // { field: "receivedBy", headerName: "Received By", minWidth: 150, flex: 0.3 },
    {
      field: "action",
      flex: 0.3,
      headerName: "View",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/transaction/${params.id}`} className="action-link-edit">
            <MdOutlineRemoveRedEye size={24} color="#2679C4" />
          </Link>
        </Fragment>
      ),
    },
  ];

  const rows = [];
  transactions && payments?.forEach((payment, index) => {
    rows.push({
      sno: index + 1,
      id: payment._id,
      studentName: payment.studentName,
      std:payment.std,
      month: payment.month,
      createdAt: payment.date.toString().slice(0, 10),
      amount: payment.totalAmount,
      mode: payment.paymentMode,
      // receivedBy: payment.receivedBy.adminName,
    });
  });

  const [selectedStudentId, setSelectedStudentId] = useState([]);
  const handleSelectionModelChange = (newSelection) => {
    setSelectedStudentId(newSelection);
    
  };

  useEffect(() => {
    dispatch(fetchTransaction(status));  
  }, [dispatch]);

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-right">
        <h2 className="dashboard-heading">TRANSACTIONS</h2>


        {/* FILTER MENUS */}

        {/* <div className="static-container">
                <div className="filter-menues">
                  <div className="filter-menu">
                    <label htmlFor="monthFilter">Month:</label>
                    <select name="monthFilter" id="monthFilter" onChange={handleMonthChange} value={selectedMonthOption}>
                      <option className="filter-option" value="current">Current Month</option>
                      <option className="filter-option" value="previous">Previous Month</option>
                    </select>
                  </div>
                  <div className="filter-menu">
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" id="startDate" onChange={handleStartDate} value={startDate} />
                  </div>
                  <div className="filter-menu">
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" id="endDate" onChange={handleEndDate} value={endDate} />
                  </div>
                </div>
              </div> */}








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
}

export default Transaction;
