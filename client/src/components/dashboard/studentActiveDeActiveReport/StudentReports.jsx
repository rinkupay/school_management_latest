import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./StudentReports.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
import { fetchStudents } from "../../../features/studentSlice";
import Loader from "../../loader/Loader";

const StudentReports = () => {
  const dispatch = useDispatch();


  const [std, setStd] = useState("");
  const [section, setSection] = useState("");
  const [isActive,setIsActive] = useState();
  const [data, setData] = useState([]);

  

  const {students,loading} = useSelector((state)=>state.students);

  const handleClassChange = (e) => setStd(e.target.value);
  const handleSectionChange = (e) => setSection(e.target.value);

  const handleActiveOrInactive = (e)=> {
    setIsActive(e.target.value);
  } 

  const handlePrintReport = () => {
    const printContent = document.getElementById("student-printableTable").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Students Report", 14, 10);

    const tableColumn = ["SL No.","Student ID","Student Name","Father's Name","Mobile", "Class", "Section", "Admission Date", "Admission Status"];
    const tableRows = data.map((student,index) => [
      index + 1,
      student.studentId,
      student.personalInfo.fullName,
      student.personalInfo.fatherName,
      student.personalInfo.mobile,
      student.academicInfo.std,
      student.academicInfo.section,
      student.currentlyAdmitted.admissionDate.slice(0,10).split('-').reverse().join('-'),
      student.isActive ? "Active" : "In Active",
      
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("Students_Report.pdf");
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((student,index) => ({
        "SL No.":index + 1,
        "Student ID":student.studentId,
        "Student Name": student.personalInfo.fullName,
        "Father's Name": student.personalInfo.fatherName,
        "Mobile": student.personalInfo.mobile,
        Class: student.academicInfo.std,
        Section: student.academicInfo.section,
        "Admission Date": student.currentlyAdmitted.admissionDate.slice(0,10).split('-').reverse().join('-'),
         "Admission Status":student.isActive ? "Active" : "In Active",
        
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Due Report");
    XLSX.writeFile(workbook, "Students_Report.xlsx");
  };

  const handleFetchData = () => {
    dispatch(fetchStudents({ std, section,isActive }));
  };

  useEffect(() => {
    if (students) {
      setData(students);
    }
  }, [students]);

  return (
    <div className="dashboard-wrapper">
      {loading && <Loader/>}
      <div className="dashboard-right">
        <h2 className="dashboard-heading">STUDENTS REPORT</h2>
        {data && (
          <div style={{ padding: "1rem" }}>
            <div className="student-report-report-container">
              <div className="student-report-report-sub-container">
                <select
                  className="student-report-report-selection"
                  value={std}
                  onChange={handleClassChange}
                >
                  <option value="">All Class</option>
                  {[
                    "Nursary",
                    "LKG",
                    "UKG",
                    ...Array.from({ length: 12 }, (_, i) => i + 1),
                  ].map((cls) => (
                    <option key={cls} value={cls}>{`Class ${cls}`}</option>
                  ))}
                </select>
                <select
                  className="student-report-report-selection"
                  value={section}
                  onChange={handleSectionChange}
                >
                  <option value="">All Section</option>
                  {["A", "B", "C", "D"].map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>

                <select
                  className="student-report-report-selection"
                  value={isActive}
                  onChange={handleActiveOrInactive}
                >
                  <option value=""> All Status</option>
                  <option value={true}>Active</option>
                  <option value={false}>InActive</option>
                </select>
              </div>
              <div className="student-report-report-sub-container">
                <button
                  className="student-report-report-action-btn search"
                  onClick={handleFetchData}
                >
                  Get <MdManageSearch size={18} />
                </button>
                <button
                  className="student-report-report-action-btn"
                  onClick={handlePrintReport}
                >
                  Print <IoMdPrint size={18} />
                </button>
                <button
                  className="student-report-report-action-btn"
                  onClick={handleGenerateReport}
                >
                  Save <FaRegFilePdf size={18} />{" "}
                </button>
                <button
                  className="student-report-report-action-btn"
                  onClick={handleExportToExcel}
                >
                  {" "}
                  Export <FaRegFileExcel size={18} />
                </button>
              </div>
            </div>
            <TableContainer component={Paper} id="student-printableTable">
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>SL No.</TableCell>
                    <TableCell>Student ID</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Father's Name</TableCell>
                    <TableCell>Mobile No.</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Section</TableCell>
                    <TableCell>Admission Date</TableCell>
                    <TableCell>Admission Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((sdata,index) => (
                      <TableRow key={sdata.studentId}>
                          <TableCell>{index + 1}</TableCell>
                        <TableCell>{sdata.studentId}</TableCell>
                        <TableCell>{sdata.personalInfo.fullName}</TableCell>
                        <TableCell>{sdata.personalInfo.fatherName}</TableCell>
                        <TableCell>{sdata.personalInfo.mobile}</TableCell>
                        <TableCell>{sdata.academicInfo.std}</TableCell>
                        <TableCell>{sdata.academicInfo.section}</TableCell>
                        <TableCell>
                          {sdata.currentlyAdmitted.admissionDate
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </TableCell>
                        <TableCell>
                          {sdata.isActive ? "Active" : "In Active"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} style={{ textAlign: "center" }}>
                        No student found
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

export default StudentReports;
