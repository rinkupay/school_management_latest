import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./StudentDueReport.css";
import {jsPDF} from "jspdf";
import { autoTable } from 'jspdf-autotable'
import * as XLSX from "xlsx";
import { FaRegFileExcel } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { MdManageSearch } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchStudentDueReport } from "../../../features/studentDueReportSlice";

const StudentDueReport = () => {

  const dispatch = useDispatch();
  const { dueStudents } = useSelector((state) => state.dueStudents);


  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [data, setData] = useState([]);

  const handleClassChange = (e) => setSelectedClass(e.target.value);
  const handleSectionChange = (e) => setSelectedSection(e.target.value);

  const handlePrintReport = () => {
    const printContent = document.getElementById("printableTable").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Student Fee Due Report", 14, 10);

    const tableColumn = ["Student Name", "Class", "Section", "Months", "Due Amount"];
    const tableRows = data.map((student) => [
      student.studentName,
      student.studentClass,
      student.studentSection,
      student.dueMonths?.join(","),
      student.totalDueAmount,
    ]);

    autoTable(doc,{ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("Student_Fee_Report.pdf");
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((student) => ({
        "Student Name": student.studentName,
        Class: student.studentClass,
        Section: student.studentSection,
        "Months":  student.dueMonths?.join(","),
        "Due Amount": student.totalDueAmount,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Due Report");
    XLSX.writeFile(workbook, "Student_Due_Report.xlsx");
  };

  const handleFetchData = () => {
    dispatch(fetchStudentDueReport({ selectedClass, selectedSection }));
  };

  useEffect(() => {
    if (dueStudents) {
      setData(dueStudents);
    }
  }, [dueStudents]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">DUE REPORTS</h2>
        {data && (
          <div style={{ padding: "1rem" }}>
            <div className="report-container">
              <div className="report-sub-container">
                <select className="report-selection" value={selectedClass} onChange={handleClassChange}>
                  <option value="">All Class</option>
                  {["Nursary", "LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => i + 1)].map((cls) => (
                    <option key={cls} value={cls}>{`Class ${cls}`}</option>
                  ))}
                </select>
                <select className="report-selection" value={selectedSection} onChange={handleSectionChange}>
                  <option value=""> All Section</option>
                  {["A", "B", "C", "D"].map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
              <div className="report-sub-container"> 
                <button className="report-action-btn search" onClick={handleFetchData}>Get <MdManageSearch size={18} /></button>     
                <button className="report-action-btn" onClick={handlePrintReport}>Print <IoMdPrint size={18}/></button>
                <button className="report-action-btn" onClick={handleGenerateReport}>Save <FaRegFilePdf size={18}/> </button>
                <button className="report-action-btn" onClick={handleExportToExcel}> Export <FaRegFileExcel  size={18}/></button>
              </div>
            </div>
            <TableContainer component={Paper} id="printableTable">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Section</TableCell>
                    <TableCell>Months</TableCell>
                    <TableCell>Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((sdata) => (
                      <TableRow key={sdata.studentId}>
                        <TableCell>{sdata.studentName}</TableCell>
                        <TableCell>{sdata.studentClass}</TableCell>
                        <TableCell>{sdata.studentSection}</TableCell>
                        <TableCell>{sdata.dueMonths?.join(',')}</TableCell>
                        <TableCell>{sdata.totalDueAmount}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} style={{ textAlign: "center" }}>
                        No due student found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDueReport;
