import React, { Fragment, useEffect, useState, useRef } from "react";
import { FaRupeeSign, FaChartLine, FaWallet } from "react-icons/fa";
import "../Dashboard.css";
import "./FinancialReport.css";
import { fetchTotalAmount } from "../../../features/statisticSlice";
import { fetchTeacherTotalAmount } from "../../../features/teacherStatistic";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const FinancialReport = () => {
  const { totalAmount, paymentsCount, loading } = useSelector(
    (state) => state.statistic
  );
  const { teacherTotalAmount } = useSelector((state) => state.teacherStatistic);
  const dispatch = useDispatch();

  const [currentMonth, setCurrentMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonthOption, setSelectedMonthOption] = useState("current");
  const [showReport, setShowReport] = useState(false);

  const reportRef = useRef();

  const date = new Date();
  const currentYear = date.getFullYear();
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const defaultCurrentMonth = `${currentYear}-${formattedMonth}`;
  const reportDate = date.toLocaleDateString();

  const session = `${currentYear}-${currentYear + 1}`;

  const handleStartDate = (e) => {
    setCurrentMonth("");
    setShowReport(false);
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setCurrentMonth("");
    setShowReport(false);
    setEndDate(e.target.value);
  };

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

    const formattedSelectedMonth = `${selectedYear}-${String(
      selectedMonth
    ).padStart(2, "0")}`;
    setCurrentMonth(formattedSelectedMonth);
  };

  const handleGenerateReport = async () => {
    await fetchStudentAmount();
    await fecthTeacherTotalAmounts();
    setShowReport(true);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // To reload the page and restore the original content
  };

  useEffect(() => {
    setCurrentMonth(defaultCurrentMonth);
  }, []);

  //   FETCH STUDENT TOTAL AMOUNT

  //   useEffect(() => {
  //     const payload = {};
  //     if (startDate && endDate) {
  //       payload.startDate = startDate;
  //       payload.endDate = endDate;
  //     } else if (startDate && !endDate) {
  //       payload.startDate = startDate;
  //     } else if (currentMonth) {
  //       payload.currentMonth = currentMonth;
  //     }

  //     if (Object.keys(payload).length > 0) {
  //       dispatch(fetchTotalAmount(payload));
  //     }
  //   }, [currentMonth, startDate, endDate, dispatch]);

  const fetchStudentAmount = () => {
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
  };

  let totalExpenses = teacherTotalAmount ? teacherTotalAmount : 0;
  const remainingBalance = totalAmount - totalExpenses;

  //   FETCH TEACHER TOTAL AMOUNT
  //   useEffect(() => {
  //     const payload = {};
  //     if (startDate && endDate) {
  //       payload.startDate = startDate;
  //       payload.endDate = endDate;
  //     } else if (startDate && !endDate) {
  //       payload.startDate = startDate;
  //     } else if (currentMonth) {
  //       payload.currentMonth = currentMonth;
  //     }

  //     if (Object.keys(payload).length > 0) {
  //       dispatch(fetchTeacherTotalAmount(payload));
  //     }
  //   }, [currentMonth, startDate, endDate, dispatch]);

  const fecthTeacherTotalAmounts = () => {
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
  };

  useEffect(() => {
    document.title = `Financial Report ${session} `;
  }, []);
  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard-wrapper">
          <div className="dashboard-right">
            <h2 className="dashboard-heading">FINANCIAL REPORT</h2>
            <div className="financial-static-wrapper">
              <div className="financial-static-container">
                <div className="financial-filter-menues">
                  <div className="financial-filter-menu">
                    <label htmlFor="monthFilter">Month:</label>
                    <select
                      name="monthFilter"
                      id="monthFilter"
                      onChange={handleMonthChange}
                      value={selectedMonthOption}
                    >
                      <option value="current">Current Month</option>
                      <option value="previous">Previous Month</option>
                    </select>
                  </div>
                  <div className="financial-filter-menu">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                      type="date"
                      id="startDate"
                      onChange={handleStartDate}
                      value={startDate}
                    />
                  </div>
                  <div className="financial-filter-menu">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      id="endDate"
                      onChange={handleEndDate}
                      value={endDate}
                    />
                  </div>

                  <div className="financial-filter-menu">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleGenerateReport}
                    >
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>

              {showReport && (
                <div ref={reportRef} className="printable-report">
                  {/* Updated Report Header */}
                  <div className="print-form-sec" id="print-content">
                  <div className="report-header">
                    <div className="report-header-left">
                      <h2>XYZ School</h2>
                      <p>123 School Road, City, State, ZIP</p>
                    </div>
                    <div className="report-header-right">
                      <p>
                        <strong>Report Date:</strong> {reportDate}
                      </p>
                      <p>
                        <strong>Session:</strong> {session}
                      </p>
                      {currentMonth !== "" && (
                        <p>
                          <strong>Financial Month:</strong> {currentMonth}
                        </p>
                      )}
                      {startDate && endDate && (
                        <p>
                          <strong>From:</strong>{" "}
                          {startDate.split("-").reverse().join("-")}{" "}
                          <strong>To:</strong>{" "}
                          {endDate.split("-").reverse().join("-")}
                        </p>
                      )}
                    </div>
                  </div>

                  <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                          <TableCell>
                            <strong>Type</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Amount (₹)</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <FaRupeeSign /> Collection Amount
                          </TableCell>
                          <TableCell>
                            ₹{totalAmount?.toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <FaChartLine /> Total Expenses
                          </TableCell>
                          <TableCell>
                            ₹{totalExpenses?.toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <FaWallet /> Remaining Balance
                          </TableCell>
                          <TableCell>
                            ₹{remainingBalance?.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  </div>

                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={handlePrint}
                  >
                    Print Report
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FinancialReport;
