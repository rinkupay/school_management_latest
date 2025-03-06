import React, { useState, useEffect } from "react";
import "./ProgressionCard.css";
import toast from 'react-hot-toast';
import {useDispatch,useSelector} from "react-redux"
import {setStudentProgression} from "../../../../features/studentProgressionSlice"
import ProgressionCorrectionPopup from "../correctionProgression/ProgressionCorrectionPopUp";
import {fetchFees} from "../../../../features/feeSettingSlice"

const ProgressionCard = ({sdata,setRefresh}) => {
  const dispatch = useDispatch();

  const [progressionStatus, setProgressionStatus] = useState("");
  const [marks, setMarks] = useState(0);
  const [daysAttended, setDaysAttended] = useState(0);
  const [schoolingStatus, setSchoolingStatus] = useState("");
  const [section, setSection] = useState("");
  const [previousClass, setPreviousClass] = useState("");
  const [std, setStd] = useState("");
  const [id, setId] = useState("");





    const [admissionFee, setAdmissionFee] = useState(0);
    const [tuitionFee, setTuitionFee] = useState(0);
    const [monthlyFee , setMonthlyFee] = useState(0);
    const [hostelFee , setHostelFee] = useState(0);

    
   

  const {fee} = useSelector((state) => state.feeStructure);
 
  








  const currentSession = new Date().getFullYear().toString();

  // <<<<<<<<=======  HANDLE UPDATE =============>>>>>>>>>>>
  const handleUpdate = () => {
    if (!id) {
      toast.error("Student ID is missing!");
      return;
    }

    const formData = {
      id,
      progressionStatus,
      marks,
      daysAttended,
      schoolingStatus,
      section,
      std,
      admissionFee,
      tuitionFee,
    
      
    };

  

    try {
       dispatch(setStudentProgression(formData));
    
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  // Function to determine the next class based on previous class
  const getNextClass = (prevClass) => {
    switch (prevClass) {
      case "Nursary":
        return "LKG";
      case "LKG":
        return "UKG";
      case "UKG":
        return "1";
      case "1":
        return "2";
      case "2":
        return "3";
      case "3":
        return "4";
      case "4":
        return "5";
      case "5":
        return "6";
      case "6":
        return "7";
      case "7":
        return "8";
      case "8":
        return "9";
      case "9":
        return "10";
      case "10":
        return "11";
      case "11":
        return "12";
      default:
        return prevClass;
    }
  };

  // <<<<<<<<<<=========== HANDLE CORRECTION ==========>>>>>>>>>>>
  // STUDENT PROGRESSION CORRECTION
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);


  // DISABLE FUNCTIONALITY
  const isDisabled = sdata.academicInfo.academicYear === currentSession;
  

  // Update `std` whenever `previousClass` changes
  useEffect(() => {
    setStd(getNextClass(previousClass));
  }, [previousClass]);

  // FETCHING FEES
  useEffect(() => {
dispatch(fetchFees());
  },[]);



  // SET CLASSWISE FEE
  // Handle class selection and update tuition fee
  useEffect(() => {
    if (fee) {
      fee?.classWise?.map((item) => {
        if (item.className === std) {
          setTuitionFee(item.tuitionFee || 0);
          setAdmissionFee(item.admissionFee || 0);
          // setHostelFee(item.hostelFee || 0);
          
        }
      })
    }

    
  }, [std,sdata]);

  // SET MONTHLY FEE
  useEffect(() => {
     setMonthlyFee()
  }, []);

  // SET PREVIOUS CLASS
  useEffect(() => {
    setPreviousClass(sdata.academicInfo.std);
    setSection(sdata.academicInfo.section);
    setId(sdata._id);
    setMarks(sdata.progressionInfo.marks);
    setSchoolingStatus(sdata.progressionInfo.schoolingStatus)
    setDaysAttended(sdata.progressionInfo.daysAttended);
    setProgressionStatus(sdata.progressionInfo.progressionStatus);

  }, [sdata]);



  return (
    <div className="progression-card">
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <strong>Name:</strong>
                {sdata.personalInfo.fullName}
              </p>
              <p>
                <strong>S.ID:</strong>
                {sdata.studentId}
              </p>

              <p>
                <strong>Gender:</strong>{" "}
                {sdata.personalInfo.gender?.charAt(0).toUpperCase() +
                  sdata.personalInfo.gender?.slice(1).toLowerCase()}
              </p>

              <p>
                <strong>DOB:</strong>{" "}
                {sdata.personalInfo.dob
                  ?.slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </p>
              <p>
                <strong>Father's Name:</strong> {sdata.personalInfo.fatherName}
              </p>
              <p>
                <strong>Mother's Name:</strong>
                {sdata.personalInfo.motherName}
              </p>
            </td>
            <td>
              <label>Progression Status</label>
              <select
                value={progressionStatus}
                onChange={(e) => setProgressionStatus(e.target.value)}
                disabled={isDisabled}
              >
                <option value="">Select</option>
                <option value={"Promoted/Passed with Examination"}>
                  Promoted/Passed with Examination
                </option>
                <option value={"Not Promoted/Not Passed/Repeater"}>
                  Not Promoted/Not Passed/Repeater
                </option>
                <option value={"Promoted/Passed without Examination"}>
                  Promoted/Passed without Examination
                </option>
                <option value={"Discontinued before Examination"}>
                  Discontinued before Examination
                </option>
                <option value={"Discontinued after Examination"}>
                  Discontinued after Examination
                </option>
              </select>
              <label>Marks in Percentage (%) 2023-24</label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                disabled={isDisabled}
              />
              <label>No. of Days School attended (2023-24)</label>
              <input
                type="number"
                value={daysAttended}
                onChange={(e) => setDaysAttended(e.target.value)}
                disabled={isDisabled}
              />
              <label>Schooling Status (2024-25)</label>
              <select
                value={schoolingStatus}
                onChange={(e) => setSchoolingStatus(e.target.value)}
                disabled={isDisabled}
              >
                <option value="">Select</option>
                <option value={"Studying in Same School"}>
                  Studying in Same School
                </option>
                <option value={"Left school with TC"}>
                  Left school with TC
                </option>
              </select>
            </td>
            <td>
              <p>
                <strong>Current Class:</strong> {previousClass}
              </p>
              <label>Next Class:</label>
              <select
                value={std}
                onChange={(e) => setPreviousClass(e.target.value)}
                disabled={isDisabled}
              >
                <option value="Nursary">Nursary</option>
                <option value="LKG">L.K.G</option>
                <option value="UKG">U.K.G</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
              <label>Section:</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                disabled={isDisabled}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </td>
            <td className="status-done">
              {isDisabled ? (
                <p className="done-msg">Done</p>
              ) : (
                <p className="pending-msg">Pending</p>
              )}
            </td>
            <td>
              {sdata.progressionInfo.progressedOn
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")}
            </td>
            <td>
              <button
                className={`update-btn ${isDisabled ? "inactive-cursor" : ""}`}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                onClick={!isDisabled ? handleUpdate : undefined}
              >
                Update
              </button>

              <button className="correction-btn" onClick={handleOpen}>
                Correction
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* PROGRESSION CORRECTION POPUP */}
      <ProgressionCorrectionPopup
        open={open}
        handleClose={handleClose}
        data={sdata}
        preStd={std}
       
      />
    </div>
  );
};

export default ProgressionCard;
