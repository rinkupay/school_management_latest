import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "./SearchByName.module.css"; // Import CSS module
import "../Dashboard.css";
import toast from 'react-hot-toast';

const SearchByName = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState("");
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Handle search by name
  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === "") {
        setStudents([]); // Clear results if input is empty
        return;
      }

      const response = await fetch(
        `${baseUrl}/api/v1/studentByName?name=${searchTerm}`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent if authentication is required
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setStudents(data.students);
      } else {
        setStudents([]);
      }
    } catch (error) {
      toast.error("Error fetching students:", error);
    }
  };

  // Handle search by ID
  const handleSearchById = async (searchId) => {
    try {
      if (searchId.trim() === "") {
        setStudentData(null); // Clear results if input is empty
        return;
      }

      const response = await fetch(
        `${baseUrl}/api/v1/studentBySchoolId?schoolId=${searchId}`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent if authentication is required
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setStudentData(data.student);
      } else {
        setStudentData(null);
      }
    } catch (error) {
      toast.error("Error fetching students:", error);
    }
  };

  const handleProfile = async (id) => {
    navigate(`/student/${id}`);
  };

  return (
    <div className='dashboard-wrapper'>
      <div className='dashboard-right'>
        <h2 className='dashboard-heading'>SEARCH STUDENT</h2>
        <div className={styles.ssearchWrapper}>
          <div className={styles.ssearchItem}>
            <input
              type="text"
              className={styles.ssearchName}
              placeholder="Search by name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.ssearchBtn} onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className={styles.ssearchItem}>
            <input
              type="text"
              className={styles.ssearchName}
              placeholder="Search by ID"
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button
              className={styles.ssearchBtn}
              onClick={() => handleSearchById(searchId)}
            >
              Search
            </button>
          </div>
        </div>

        <div className={styles.sstudentTable}>
          <table className={styles.sstudentTable}>
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Section</th>
                <th>Action</th>
              </tr>
            </thead>
            {students && students.length > 0 && (
              <tbody>
                {students.map((student, index) => (
                  <tr className={styles.sstudentRow} key={student._id}>
                    <td className={styles.sstudentData}>{index + 1}</td>
                    <td className={styles.sstudentData}>
                      {student.personalInfo.fullName}
                    </td>
                    <td className={styles.sstudentData}>
                      {student.personalInfo.fatherName}
                    </td>
                    <td className={styles.sstudentData}>
                      {student.academicInfo.rollNo}
                    </td>
                    <td className={styles.sstudentData}>
                      {student.academicInfo.std}
                    </td>
                    <td className={styles.sstudentData}>
                      {student.academicInfo.section}
                    </td>
                    <td
                      className={styles.sstudentData}
                      onClick={() => handleProfile(student._id)}
                    >
                      <IoEye className={styles.sviewIcon} size={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}

            {studentData && (
              <tbody>
                <tr className={styles.sstudentRow}>
                  <td className={styles.sstudentData}>{1}</td>
                  <td className={styles.sstudentData}>
                    {studentData?.personalInfo?.fullName}
                  </td>
                  <td className={styles.sstudentData}>
                    {studentData?.personalInfo?.fatherName}
                  </td>
                  <td className={styles.sstudentData}>
                    {studentData?.academicInfo?.rollNo}
                  </td>
                  <td className={styles.sstudentData}>
                    {studentData?.academicInfo?.std}
                  </td>
                  <td className={styles.sstudentData}>
                    {studentData?.academicInfo?.section}
                  </td>
                  <td
                    className={styles.sstudentData}
                    onClick={() => handleProfile(studentData._id)}
                  >
                    <IoEye className={styles.sviewIcon} size={20} />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchByName;
