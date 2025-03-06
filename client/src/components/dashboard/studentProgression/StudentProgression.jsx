import React, { useState, useEffect } from 'react';
import "../Dashboard.css";
import "./StudentProgression.css";
import ProgressionCard from './progrationCard/ProgressionCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveStudents } from '../../../features/activeStudentSlice';


const StudentProgression = () => {
  const dispatch = useDispatch();

  // Retrieve values from localStorage or set defaults
  const [std, setStd] = useState(localStorage.getItem("selectedClass") || "");
  const [section, setSection] = useState(localStorage.getItem("selectedSection") || "");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { students, loading, totalStudents, maleStudents, femaleStudents } = useSelector(
    (state) => state.activeStudents
  );
  const {status} = useSelector((state)=>state.studentProgression);

  // HANDLE CLASS SELECTION
  const handleCLass = (e) => {
    const selectedClass = e.target.value;
    setStd(selectedClass);
    localStorage.setItem("selectedClass", selectedClass); // Save to localStorage
  };

  // HANDLE SECTION SELECTION
  const handleSection = (e) => {
    const selectedSection = e.target.value;
    setSection(selectedSection);
    localStorage.setItem("selectedSection", selectedSection); // Save to localStorage
  };

  // Fetch students when class or section changes
  useEffect(() => {
    dispatch(fetchActiveStudents({ std, section }));
  }, [std, section,refresh]);

  // Update data when students change
  useEffect(() => {
    if (students) {
      setData(students);
    }
  }, [students]);

  // REFRESH THE PAGE AFTER PROGRESSED

    useEffect(() => {
     if(status === 'fulfilled'){
  setRefresh(!refresh);
     }
    },[status])


  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">STUDENT PROGRESSION</h2>
        <div className="filter-wrapper">
          <div className="filter-content">
            <label htmlFor="class">Class:</label>
            <select id="class" onChange={handleCLass} value={std}>
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
            <select id="section" onChange={handleSection} value={section}>
              <option value="">All</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="filter-content">
            <label>Total:</label>
            <p className="totalStudent">{totalStudents}</p>
          </div>
          <div className="filter-content">
            <label>Male:</label>
            <p className="totalStudent">{maleStudents}</p>
          </div>
          <div className="filter-content">
            <label>Female:</label>
            <p className="totalStudent">{femaleStudents}</p>
          </div>
        </div>

        <div className="progression-component">
          <table>
            <thead>
              <tr>
                <th>Student Basic Details</th>
                <th>Progression Status (2023-24) Details</th>
                <th>Eligible/Promoted Class</th>
                <th>Status</th>
                <th>Progressed On</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
          {data.map((sdata) => (
            <ProgressionCard key={sdata._id} sdata={sdata} setRefresh ={setRefresh} />
          ))}
        </div>
      </div>

      {/* Student Progression Correction Form */}

    </div>
  );
};

export default StudentProgression;
