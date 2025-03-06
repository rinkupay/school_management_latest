import React, { Fragment, useEffect, useState } from "react";
import { FaRupeeSign, FaMoneyBillWave, FaChartLine, FaWallet } from "react-icons/fa";
import "../Dashboard.css";
import "./StatisticComponent.css";
import { fetchTotalAmount } from "../../../features/statisticSlice";
import {fetchTeacherTotalAmount} from "../../../features/teacherStatistic";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const Dashboard = () => {
  const { totalAmount, paymentsCount, loading } = useSelector((state) => state.statistic);


  const {teacherTotalAmount,teacherPaymentsCount} = useSelector((state)=>state.teacherStatistic);
  const dispatch = useDispatch();

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

  useEffect(() => {
    const payload = {};
    if (startDate && endDate) {
      payload.startDate = startDate;
      payload.endDate = endDate;
    } else if (startDate && !endDate) {
      payload.startDate = startDate;
    } else if (currentMonth) {
      payload.currentMonth = currentMonth;
    }

    if (Object.keys(payload).length > 0) {
      dispatch(fetchTotalAmount(payload));
    }
  }, [currentMonth, startDate, endDate, dispatch]);

  let totalExpenses = teacherTotalAmount ? teacherTotalAmount : 0;
  const remainingBalance = totalAmount - totalExpenses;


  // FETCH TEACHER TOTAL AMOUNT

  useEffect(() => {
    const payload = {};
    if (startDate && endDate) {
      payload.startDate = startDate;
      payload.endDate = endDate;
    } else if (startDate && !endDate) {
      payload.startDate = startDate;
    } else if (currentMonth) {
      payload.currentMonth = currentMonth;
    }

    if (Object.keys(payload).length > 0) {
      dispatch(fetchTeacherTotalAmount(payload));
    }

  },[currentMonth, startDate, endDate,])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard-wrapper">
          <div className="dashboard-right">
            <h2 className="dashboard-heading">DASHBOARD</h2>
     
            <div className="static-wrapper">
              <div className="static-container">
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
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: "#4caf50", color: "white", p: 2 }}>
                    <CardContent>
                      <Typography variant="h6"><FaRupeeSign /> Collection Amount</Typography>
                      <Typography variant="h4">₹{totalAmount?.toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                
           
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: "#f44336", color: "white", p: 2 }}>
                    <CardContent>
                      <Typography variant="h6"><FaChartLine /> Total Expenses</Typography>
                      <Typography variant="h4">₹{teacherTotalAmount?.toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: "#2196f3", color: "white", p: 2 }}>
                    <CardContent>
                      <Typography variant="h6"><FaWallet /> Remaining Balance</Typography>
                      <Typography variant="h4">₹{remainingBalance?.toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;