import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherRegistration.css";

import "../../Dashboard.css";
import { registerTeacher } from "../../../../features/teacherRegistrationSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loader/Loader";
import imageCompression from "browser-image-compression";

const TeacherRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.teacher);

  const [employeeRole, setEmployeeRole] = useState("");
  // Individual useState hooks for each form field
  const [profileImage,setProfileImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [joinDate,setJoinDate] = useState("");
  const [qualification, setQualification] = useState("");
  const [institution, setInstitution] = useState("");
  const [languageKnown, setLanguageKnown] = useState([]);
  const [specialSkill, setSpecialSkill] = useState("");
  const [perMonthSalary, setPerMonthSalary] = useState("");
  const [experiencePeriod, setExperiencePeriod] = useState("");
  const [organization, setOrganization] = useState("");
  const [designation, setDesignation] = useState("");
  const [personalAchievements, setPersonalAchievements] = useState("");
  const [aadharId, setAadharId] = useState("");
  const [resume, setResume] = useState(""); // Handle resume file
  const [image, setImage] = useState(""); // Handle image file
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone,setPhone] = useState("");


  // OPTIONALY RENDER INPUT FIELD
  const [isEmployee,setIsEmployee] = useState(false);

  



  const handleProfileChange = async (e) => {
    // setProfileImage(e.target.files[0]);

    const imageFile = e.target.files[0];
    if (imageFile) {
      try {
        // Compression options
        const options = {
          maxSizeMB: 0.5, // Maximum file size (in MB)
          maxWidthOrHeight: 500, // Maximum width or height in px
          useWebWorker: true, // Use web worker for better performance
        };
        // Compress the image
        const compressedFile = await imageCompression(imageFile, options);
        setProfileImage(compressedFile); // Set the compressed image
      } catch (error) {
        console.error("Error during image compression:", error);
      }
    }

  };

  // Handle employee role
  const handleEmployeeRole = (e) => {
    setEmployeeRole(e.target.value);
  }



  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      setResume(files[0]);
    } else if (name === "image") {
      setImage(files[0]);
    } else {
      switch (name) {
        case "fullName":
          setFullName(value);
          break;
        case "fatherName":
          setFatherName(value);
          break;
        case "gender":
          setGender(value);
          break;
        case "dob":
          setDob(value);
          break;
        case "age":
          setAge(value);
          break;
        case "mobile":
          setMobile(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "qualification":
          setQualification(value);
          break;
        case "institution":
          setInstitution(value);
          break;
        case "perMonthSalary":
          setPerMonthSalary(value);
          break;
        case "experiencePeriod":
          setExperiencePeriod(value);
          break;
        case "organization":
          setOrganization(value);
          break;
        case "designation":
          setDesignation(value);
          break;
        case "personalAchievements":
          setPersonalAchievements(value);
          break;
        case "aadharId":
          setAadharId(value);
          break;
        case "address":
          setAddress(value);
          break;
        case "city":
          setCity(value);
          break;
        case "state":
          setState(value);
          break;
        case "pinCode":
          setPinCode(value);
          break;
        case "phone":
          setPhone(value);
          break;
        // Add other cases similarly for each field
        default:
          break;
      }
    }
  };

  const handleReligion = (e) => {
    setReligion(e.target.value);
  };

  const handleCaste = (e) => {
    setCaste(e.target.value);
  };

  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLanguageKnown([...languageKnown, value]);
    } else {
      setLanguageKnown(languageKnown.filter((lang) => lang !== value));
    }
  };

  const handleSubmit = (e) => {
 
    e.preventDefault();

    const formData = new FormData();
    formData.append("employeeRole", employeeRole);
    formData.append("fullName", fullName);
    formData.append("fatherName", fatherName);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("age", age);
    formData.append("religion", religion);
    formData.append("caste", caste);
    formData.append("bloodGroup", bloodGroup);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("qualification", qualification);
    formData.append("institution", institution);
    formData.append("languageKnown", languageKnown);
    formData.append("specialSkill", specialSkill);
    formData.append("joinDate",joinDate);
    formData.append("perMonthSalary", parseInt(perMonthSalary,10));
    formData.append("experiencePeriod", experiencePeriod);
    formData.append("organization", organization);
    formData.append("designation", designation);
    formData.append("personalAchievements", personalAchievements);
    formData.append("aadharId", aadharId);
    formData.append("resume", resume);
    formData.append("image", image); // Append image
    formData.append("profileImage", profileImage); 
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pinCode", pinCode);
    formData.append("phone",phone);

    dispatch(registerTeacher(formData));
  };


  // SET EPMLOYEE TYPE
  useEffect(() =>{
    if(employeeRole === "Staff"){
      setIsEmployee(false)
    }
    if(employeeRole === "Teacher"){
      setIsEmployee(true);
    }
  },[employeeRole])

  return ( 
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        
        <div className="dashboard-wrapper">
  
      <div className="dashboard-right">
        <h2 className="dashboard-heading">EMPLOYEE REGISTRATION</h2>

        <div className="registration-container">
          <h2 className="form-heading">Employee Registration Form</h2>
          <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
              <label>Profile Image</label>
               <input type="file" onChange={handleProfileChange} />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Father Name</label>
              <input
                type="text"
                name="fatherName"
                value={fatherName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={handleChange}
                required
              >
                <option value="">Select </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="" id="" onChange={handleEmployeeRole} required>
                <option value="">Select Role</option>
                <option value="Teacher">Teacher</option>
                <option value="Staff">Staff</option>

              </select>
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Religion</label>
              <select
                name="religion"
                value={religion}
                onChange={handleReligion}
                required
              >
                <option value="">Select Religion</option>
                <option value="Christian">Christian</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Sikh">Sikh</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Caste</label>
              <select
                name="caste"
                value={caste}
                onChange={handleCaste}
                required
              >
                <option value="">Select Caste</option>
                <option value="Scheduled Tribes">Scheduled Tribes</option>
                <option value="Scheduled Caste">Scheduled Caste</option>
                <option value="OBC">OBC</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="form-group">
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                value={bloodGroup}
                onChange={handleBloodGroup}
              >
                <option value="">Select Blood Group</option>
                <option value="O Positive">O Positive</option>
                <option value="O Negative">O Negative</option>
                <option value="A Positive">A Positive</option>
                <option value="A Negative">A Negative</option>
                <option value="B Positive">B Positive</option>
                <option value="B Negative">B Negative</option>
                <option value="AB Positive">AB Positive</option>
                <option value="AB Negative">AB Negative</option>
              </select>
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="number"
                name="mobile"
                value={mobile}
                onChange={handleChange}
                maxLength={10}
                pattern="\d{10}"
                title="Mobile number must be 10 digits"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <h3 className="section-heading">Educational Details</h3>
            <div className="form-group">
              <label>Highest Qualification</label>
              <input
                type="text"
                name="qualification"
                value={qualification}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                name="institution"
                value={institution}
                onChange={handleChange}
              />
            </div>

            {/* Language Known - Multiple Checkboxes */}
            <div className="form-group">
              <label>Languages Known</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="languageKnown"
                    value="English"
                    onChange={handleLanguageChange}
                  />{" "}
                  English
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="languageKnown"
                    value="Hindi"
                    onChange={handleLanguageChange}
                  />{" "}
                  Hindi
                </label>
               
               
              </div>
            </div>

            <h3 className="section-heading">Salary & Experience</h3>
            <div className="form-group">
              <label>Joining Date</label>
              <input
                type="date"
                name="perMonthSalary"
                value={joinDate}
                onChange={(e)=>setJoinDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Per Month Salary</label>
              <input
                type="number"
                name="perMonthSalary"
                value={perMonthSalary}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Experience Period</label>
              <input
                type="text"
                name="experiencePeriod"
                value={experiencePeriod}
                onChange={handleChange}
                disabled = {!isEmployee}
              />
            </div>
            <div className="form-group">
              <label>Organization & Address</label>
              <input
                type="text"
                name="organization"
                value={organization}
                onChange={handleChange}
                disabled = {!isEmployee}
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={designation}
                onChange={handleChange}
                disabled = {!isEmployee}
              />
            </div>
            <div className="form-group">
              <label>Personal Achievements (if any)</label>
              <textarea
                name="personalAchievements"
                value={personalAchievements}
                onChange={handleChange}
                disabled = {!isEmployee}
              ></textarea>
            </div>

            <h3 className="section-heading">Documents</h3>
            <div className="form-group">
              <label>Aadhar ID</label>
              <input
                type="text"
                name="aadharId"
                value={aadharId}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Aadhar Card</label>
              <input type="file" name="resume" onChange={handleImageChange} />
            </div>

            <h3 className="section-heading">Permanent Address</h3>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={pinCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                value={phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Please wait..." : "Rgeister"}
            </button>
          </form>
        </div>
      </div>
    </div>
        </Fragment>}
    </Fragment>
  );
};

export default TeacherRegistration;
