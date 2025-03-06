import React, { useEffect, useState, Fragment } from "react";
import "../Dashboard.css";
import "./StudentEnquiry.css";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { fetchStudentEnquiryInfo } from "../../../features/studentEnquirySlice";
import {
  fetchSingleStudentEnquiryInfo,
  resetStudentData,
} from "../../../features/singleStudentEnquirySlice";

import StudentProfileDialog from "./dialogBox/StudentProfileDialog";
import AddStudent from "./addDialogBox/AddStudent";
import { deleteSingleStudentEnquiryInfo } from "../../../features/singleStudentEnquirySlice";

const StudentEnquiry = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.studentEnquiry);
  const { studentData } = useSelector(
    (state) => state.singleStudentEnquiryDetails
  );

  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [studentId, setStudentId] = useState("");

  // Handle Add Student Enquiry
  const [addStudentOpen, setAddStudentOpne] = useState(false);


  // Handle view student action
  const handleViewStudent = (id) => {
    setStudentId(id);
    dispatch(fetchSingleStudentEnquiryInfo(id));
  };

  // Handle close dialog action
  const handleCloseDialog = () => {
    setProfileDialogOpen(false);
    dispatch(resetStudentData());
    setSelectedStudent(null);
  };

  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  // HANDLE DELETE STUDENT
  const handleDeleteStudent = (sId) => {
    dispatch(deleteSingleStudentEnquiryInfo({ studentId: sId }));
    setProfileDialogOpen(false);
    dispatch(fetchStudentEnquiryInfo()); // Refresh the list of students
  };

  // DataGrid columns configuration
  const columns = [
    { field: "name", headerName: "Student Name", minWidth: 100, flex: 0.3 },
    { field: "gender", headerName: "Gender", minWidth: 80, flex: 0.3 },
    {
      field: "fatherName",
      headerName: "Father Name",
      minWidth: 100,
      flex: 0.3,
    },
    { field: "std", headerName: "Class", minWidth: 100, flex: 0.2 },
    {
      field: "createdAt",
      headerName: "Enquiry Date",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <div
            className="action-btngroup"
            style={{ display: "flex", gap: "2rem" }}
          >
            <Link
              onClick={() => handleViewStudent(params.id)}
              className="action-link-edit"
              title="View Student"
            >
              <FaEdit size={24} color="#2679C4" />
            </Link>

            <Link
              onClick={() => handleDeleteStudent(params.id)}
              className="action-link-edit"
              title="Delete Student"
            >
              <MdDeleteForever size={24} color="#D40000" />
            </Link>
          </div>
        </Fragment>
      ),
    },
  ];

  // DataGrid rows preparation
  const rows =
    students?.map((student) => ({
      id: student._id,
      name: student.studentName,
      gender: student.gender,
      fatherName: student.fatherName,
      std: student.className,
      createdAt: student.createdAt.slice(0, 10),
    })) || [];

  // Fetch student enquiries on mount
  useEffect(() => {
    dispatch(fetchStudentEnquiryInfo());
  }, [dispatch]);

  // Open profile dialog when student data is available
  useEffect(() => {
    if (studentData && Object.keys(studentData).length > 0) {
      setSelectedStudent(studentData);
      setProfileDialogOpen(true);
    }
  }, [studentData]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right dialog">
        <h2 className="dashboard-heading">STUDENT ENQUIRY</h2>

        <div className="header-enquiry-wrapper">
          <div className="header-enquiry-container">
            <div className="header-enquiry-menu">
              <div className="search-container">
                <input
                  className="search-input"
                  type="text"
                  onChange={handleSearchValue}
                  placeholder="Search..."
                  value={searchValue}
                />
                <div className="search-icon-md">
                  <IoMdSearch className="search-icon" />
                </div>
              </div>
            </div>
            <div className="header-enquiry-menu">
              <p>
                <IoMdPersonAdd
                  onClick={() => setAddStudentOpne(true)}
                  size={24}
                  color="blue"
                  title="Add Student"
                  cursor={"pointer"}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="data-grid">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
        {profileDialogOpen && (
          <StudentProfileDialog
            open={profileDialogOpen}
            onClose={handleCloseDialog}
            student={selectedStudent}
            studentId={studentId}
            handleDelete={handleDeleteStudent}
          />
        )}

        {/* ADD STUDENT */}

        {addStudentOpen && (
          <AddStudent 
            open={addStudentOpen} 
            onClose={() => setAddStudentOpne(false)}  // Correctly close modal
          />
        )}
      </div>
    </div>
  );
};

export default StudentEnquiry;
