import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SectionShift.css";
import { MdManageSearch } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchStudents,updateStudentSection } from "../../../features/studentSlice";


const SectionShift = () => {
  const dispatch = useDispatch();


  const [std, setStd] = useState("");
  const [section, setSection] = useState("");
  const [isActive,setIsActive] = useState(true);
  const [data, setData] = useState([]);
  const [newSection,setNewSection] = useState({});

  
  

  

  const {students} = useSelector((state)=>state.students);


  // HANDLE CHANGE NEW SECTION
  const handleNewSection = (id,value)=>{
    setNewSection((prev)=>({
      ...prev,
      [id]:value,
    }))
  }
  // HANDLE SECTION UPDATE
  const handleSectionUpdate = async(id,newSection)=>{

const sectionData = newSection[id]
await dispatch(updateStudentSection({id,sectionData}))

  }

  const handleClassChange = (e) => setStd(e.target.value);
  const handleSectionChange = (e) => setSection(e.target.value);

  const handleActiveOrInactive = (e)=> {
    setIsActive(e.target.value);
  } 






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
     
      <div className="dashboard-right">
        <h2 className="dashboard-heading">SECTION SHIFT</h2>
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
                    <TableCell>Status</TableCell>
                    {/* <TableCell>Mobile No.</TableCell> */}
                    <TableCell>Class</TableCell>
                    {/* <TableCell>Section</TableCell> */}
                    {/* <TableCell>Admission Date</TableCell> */}
                    <TableCell>Update Section</TableCell>
                  
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
                        {/* <TableCell>{sdata.personalInfo.mobile}</TableCell> */}
                        
                        <TableCell>
                          {sdata.isActive ? "Active" : "In Active"}
                        </TableCell>
                        <TableCell>{sdata.academicInfo.std}</TableCell>
                        {/* <TableCell>{sdata.academicInfo.section}</TableCell> */}
                      
                          <TableCell>
                            <div className="update-section">
                              <div className="section-select">
                              <select name="" id="" onChange={(e)=>handleNewSection(sdata._id,e.target.value)} value={newSection[sdata._id] || sdata?.academicInfo?.section}>
                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            </select>
                            
                       
                              </div>
                              <div className="section-update-btn">
                              <button onClick={()=>handleSectionUpdate(sdata._id,newSection)}>Update</button>
                              </div>
                            </div>
                            </TableCell>
                        
                        {/* <TableCell>
                          {sdata.currentlyAdmitted.admissionDate
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </TableCell> */}

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

export default SectionShift;
