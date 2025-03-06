import React, { useState, useEffect, Fragment } from "react";

import "./Teachers.css";
import "../Dashboard.css";
import { DataGrid } from "@mui/x-data-grid";
import { fetchTeachers } from "../../../features/allTeacherSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import Loader from "../../loader/Loader"

const Teachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [gender,setGender] = useState("");
  const [role,setRole] = useState("");



  const { teachers, totalTeachers, maleTeacher, femaleTeacher,loading } = useSelector(
    (state) => state.teachers
  );

  const columns = [
    // { field: "id", headerName: "Teacher ID", minWidth: 250, flex: 0.5 },
    { field: "tid", headerName: "Employee ID", minWidth: 100, flex: 0.2 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
    { field: "gender", headerName: "Gender", minWidth: 100, flex: 0.2 },
    { field: "role", headerName: "Role", minWidth: 100, flex: 0.2 },
    { field: "status", headerName: "Status", minWidth: 100, flex: 0.2 },
   

    {
      field: "action",
      flex: 0.3,
      headerName: "View",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/teacher/${params.id}`} className="action-link-edit">
            <MdOutlineRemoveRedEye size={24} color="#2679C4" />
          </Link>
        </Fragment>
      ),
    },
  ];

  const rows = [];
  teachers &&
    teachers.forEach((teacher) => {
      rows.push({
        id: teacher._id,
        tid:teacher?.teacherId,
        gender:teacher?.personalInfo?.gender,
        name: teacher?.personalInfo?.fullName,
        role: teacher?.employeeRole,
        status: teacher?.isActive ? 'Active' : 'Inactive',
      
      });
    });

  const [selectedStudentId, setSelectedStudentId] = useState([]);
  const handleSelectionModelChange = (newSelection) => {
    setSelectedStudentId(newSelection);
  };



  useEffect(() => {
    dispatch(fetchTeachers({gender,role}));
  }, [gender,role]);
  return (
    <div className="dashboard-wrapper">
    
      <div className="dashboard-right">
        <h2 className="dashboard-heading">ALL EMPLOYEES</h2>
        <div className="filter-wrapper">

          {loading && <Loader/>}


          <div className="fiter-content-sub">
          <div className="filter-content">
            <label htmlFor="class">Select Role:</label>
            <select className="teacher-filter-sec" name="" id="class" onChange={(e)=>setRole(e.target.value)} value={role}>
              <option value="">All</option>
              <option value="Teacher">Teacher</option>
              <option value="Staff">Staff</option>
             
            </select>
          </div>

          <div className="filter-content">
            <label htmlFor="class">Gender:</label>
            <select className="teacher-filter-sec" name="" id="class" onChange={(e)=>setGender(e.target.value)} value={gender}>
              <option value="">All </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
             
            </select>
          </div>
         

          <div className="filter-content">
            <label htmlFor="section">Total  :</label>
            <p className="totalStudent">{totalTeachers}</p>
          </div>
          <div className="filter-content">
            <label htmlFor="section">Male :</label>
            <p className="totalStudent">{maleTeacher}</p>
          </div>
          <div className="filter-content">
            <label htmlFor="section">Female :</label>
            <p className="totalStudent">{femaleTeacher}</p>
          </div>
          </div>
          <div className="fiter-content-sub">
           <p><IoMdPersonAdd size={24} color="blue" cursor={"pointer"} onClick={()=>navigate('/add-teacher')}  title="Add Teacher" /></p>
          </div>
        </div>
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
  );
};

export default Teachers;
