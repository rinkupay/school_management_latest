import React, { useEffect, useState, Fragment } from "react";
import "./Dashboard.css";
import "./Students.css"

import { DataGrid } from "@mui/x-data-grid";
import { fetchStudents } from "../../features/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Loader from "../loader/Loader";

const Student = () => {
  const dispatch = useDispatch();

  const { students,totalStudents,maleStudents , femaleStudents,loading } = useSelector((state) => state.students);
  const [std,setStd] = useState("");
  const [section,setSection] = useState("");

  const columns = [
    // { field: "id", headerName: "Student ID", minWidth: 250, flex: 0.5 },
    { field: "sid", headerName: "Student ID", minWidth: 100, flex: 0.2 },
    {
      field: "name",
      headerName: "Student Name",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "std",
      headerName: "Class",
      minWidth: 100,
      flex: 0.2,
    },
    {
      field: "section",
      headerName: "Section",
      minWidth: 100,
      flex: 0.2,
    },
    {
      field: "createdAt",
      headerName: "Admission Date",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "active",
      headerName: "Status",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "action",
      flex: 0.3,
      headerName: "View",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link
            to={`/student-inactive/${params.id}`}
            className="action-link-edit"
          >
            <MdOutlineRemoveRedEye size={24} color="#2679C4" />
          </Link>
        </Fragment>
      ),
    },
  ];

  const rows = [];
  students &&
    students.forEach((student) => {
      rows.push({
        id: student._id,
        sid: student.studentId,
        gender: student.personalInfo.gender,
        std: student.academicInfo.std,
        section: student.academicInfo.section,
        createdAt: student.createdAt.toString().slice(0, 10),
        active: `${student.isActive ? "Active" : "InActive"}`,
        name: student.personalInfo.fullName,
      });
    });

  const [selectedStudentId, setSelectedStudentId] = useState([]);
  const handleSelectionModelChange = (newSelection) => {
    setSelectedStudentId(newSelection);
  };

  useEffect(() => {
    dispatch(fetchStudents({std,section}));
  }, [std,section]);

 

  
       // HANDLE CLASS 
       const handleCLass = (e)=>{
        setStd(e.target.value);
  
      }

    // HANDLE SECTION 
    const handleSection = (e)=>{
      setSection(e.target.value);

    }


  return (
    <div>

      {/* LODER */}
      {loading && <Loader />}



      <div className="dashboard-wrapper">

        <div className="dashboard-right">
          <h2 className="dashboard-heading">STUDENTS LISTS</h2>

          {/* FILTER COMPONENT */}
          <div className="filter-wrapper">
            <div className="filter-content">
              <label htmlFor="class">Class:</label>
              <select name="" id="class" onChange={handleCLass} value={std}>
                <option value="">All</option>
                <option value="Nursary">Nursary</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className="filter-content">
              <label htmlFor="section">Section:</label>
              <select name="" id="section" onChange={handleSection} value={section}>
              <option value="">All</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <div className="filter-content">
              <label htmlFor="section">Total :</label>
              <p className="totalStudent">{totalStudents}</p>
            </div>
            <div className="filter-content">
              <label htmlFor="section">Male:</label>
              <p className="totalStudent">{maleStudents}</p>
            </div>
            <div className="filter-content">
              <label htmlFor="section">Female:</label>
              <p className="totalStudent">{femaleStudents}</p>
            </div>
        
          </div>



          {/* FILTERED DATA */}
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
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={handleSelectionModelChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
