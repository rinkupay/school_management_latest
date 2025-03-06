import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import { useLocation } from "react-router-dom";
import "./RegisterStudent.css";
import profileImage from "../../../assets/profile.png";
import {
  registerStudent,
  resetState,
} from "../../../features/registerStudentSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { fetchFees } from "../../../features/feeSettingSlice";

const RegisterStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const studentData = location.state?.studentData;

  const { loading } = useSelector((state) => state.students);
  const { student, status } = useSelector((state) => state.registerStudent);
  const { fee } = useSelector((state) => state.feeStructure);

  // <<<<========  PERSONAL INFORMATION ==========>>>>>>>>>>
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");

  const [gender, setGender] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gardianName, setGardianName] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleDob = (e) => {
    setDob(e.target.value);
  };
  const handleMotherName = (e) => {
    setMotherName(e.target.value);
  };
  const handleFatherName = (e) => {
    setFatherName(e.target.value);
  };
  const handleGardianName = (e) => {
    setGardianName(e.target.value);
  };
  const handleReligion = (e) => {
    setReligion(e.target.value);
  };
  const handleCaste = (e) => {
    setCaste(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDateofBirth = (e) => {
    setDob(e.target.value);
  };
  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
  };

  // <<<<========  Academic Information ==========>>>>>>>>>>
  const [rollNo, setRollNo] = useState("");
  const [std, setStd] = useState("");

  const [section, setSection] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const [admissionFee, setAdmissionFee] = useState(0);
  const [tutionFee, setTutionFee] = useState(0);
  const [busFee, setBusFee] = useState("");
  const [hostelFee, setHostelFee] = useState("");
  const [monthlyFee, setMonthlyFee] = useState(0);
  const [isBusFee, setIsBusFee] = useState(false);
  const [isHostelFee, setIsHostelFee] = useState(false);

  const handleRollNo = (e) => {
    setRollNo(e.target.value);
  };

  const handleClass = (e) => {
    setStd(e.target.value);
  };

  const handleSection = (e) => {
    setSection(e.target.value);
  };
  const handleBusFee = (e) => {
    setBusFee(e.target.value);
  };
  const handleHostelFee = (e) => {
    setHostelFee(e.target.value);
  };

  // IMAGE SECTION
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");

  const [permanentAddress, setPermanentAddress] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [temporaryAddress, setTemporaryAddress] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "avatar") {
      setImage(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else if (name === "busFee") {
      setIsBusFee(checked ? true : false);
      if (!checked) {
        setBusFee(0);
      }
    } else if (name === "hostelFee") {
      setIsHostelFee(checked ? true : false);
      if (!checked) {
        setHostelFee(0);
      }
    } else if (type === "checkbox" && name === "sameaspermanent") {
      if (checked) {
        setTemporaryAddress(permanentAddress);
      } else {
        setTemporaryAddress({
          address: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
        });
      }
    } else if (name.startsWith("permanent")) {
      setPermanentAddress((prevAddress) => ({
        ...prevAddress,
        [name.replace("permanent", "").toLowerCase()]: value,
      }));
    } else if (name.startsWith("temporary")) {
      setTemporaryAddress((prevAddress) => ({
        ...prevAddress,
        [name.replace("temporary", "").toLowerCase()]: value,
      }));
    }
  };

  // <<<<<<<======= REGISTER HANDLER ========>>>>>>>>
  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !fullName ||
      !dob ||
      !gender ||
      !motherName ||
      !fatherName ||
      !rollNo ||
      !gardianName ||
      !religion ||
      !bloodGroup ||
      !email ||
      !mobile
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (!image) {
      toast.error("Please select profile image");
      console.log("please select image");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    const personalInfo = {
      fullName,
      dob,
      gender,
      motherName,
      fatherName,
      gardianName,
      religion,
      caste,
      bloodGroup,
      email,
      mobile,
    };

    const academicInfo = {
      rollNo,
      std,

      section,
      academicYear,
      admissionFee,
      tutionFee,
      busFee,
      hostelFee,
      monthlyFee,
    };
 

    const formData = new FormData();
    formData.append("image", image);
    formData.append("personalInfo", JSON.stringify(personalInfo));
    formData.append("academicInfo", JSON.stringify(academicInfo));
    formData.append("permanentAddress", JSON.stringify(permanentAddress));
    formData.append("temporaryAddress", JSON.stringify(temporaryAddress));

    toast.promise(dispatch(registerStudent(formData)).unwrap(), {
      pending: "Registering...",
      success: "Registered successfully",
      error: "Registration failed",
    });
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    setAcademicYear(`${currentYear}`);
    setMonthlyFee(tutionFee + Number(busFee) + Number(hostelFee));
  }, [busFee, tutionFee, hostelFee]);

  useEffect(() => {
    if (status === "fulfilled") {
      navigate(`/student/${student?._id}`);
    }
    if (status === "fulfilled") {
      // Student registered successfully, reset the state
      dispatch(resetState());
    }
  }, [student?._id, status, dispatch]);

  // Handle class selection and update tuition fee
  useEffect(() => {
    if (fee) {
      fee?.classWise?.map((item) => {
        if (item.className === std) {
          setTutionFee(item?.tuitionFee || 0);
          setAdmissionFee(item?.admissionFee || 0);
        }
      });
    }
  }, [std]);

  // IF STUDENT DATA
  useEffect(() => {
    if (studentData) {
      setFullName(studentData?.studentName || "");
      setFatherName(studentData?.fatherName || "");
      setGender(studentData?.gender || "");

      setDob(studentData?.dateOfBirth || "");

      setStd(studentData?.className || "");
      setMobile(studentData?.mobile || "");
      setPermanentAddress({ address: studentData?.address || "" });
    }
  }, [studentData]);

  useEffect(() => {
    dispatch(fetchFees());
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">REGISTER STUDENT</h2>
        <div className="register-container">
          <div className="container">
            {/* <h1>XYZ College/School</h1> */}
            <h2>Student Registration Form</h2>
            <div className="form-wrapper">
              <form onSubmit={handleRegister}>
                <div className="form-item">
                  {/* <label htmlFor="">Student Image:</label> */}
               
                    <div className="image">
                      <img
                        className="profile-image"
                        src={image ? avatar : profileImage}
                        alt="profile-image"
                      />
                    </div>

                    <input
                      className="choose-image"
                      type="file"
                      name="avatar"
                      id="studentimage"
                      onChange={handleChange}
                      required
                    />
                  </div>
              
                <div className="form-item">
                  <label htmlFor="fullname">Student Name:</label>
                  <input
                    type="text"
                    name="fullname"
                    value={fullName}
                    id="fullname"
                    placeholder="Full Name"
                    onChange={handleFullName}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="fathersname">Father's Name:</label>
                  <input
                    type="text"
                    name="fathersname"
                    id="fathersname"
                    value={fatherName}
                    placeholder="Father's Full Name"
                    onChange={handleFatherName}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="mothersname">Mother's Name:</label>
                  <input
                    type="text"
                    name="mothersname"
                    id="mothersname"
                    value={motherName}
                    placeholder="Mother's Full Name"
                    onChange={handleMotherName}
                    required
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="mothersname">Gardian's Name:</label>
                  <input
                    type="text"
                    name="gardianname"
                    id="gardianname"
                    value={gardianName}
                    placeholder="Gardian's Full Name"
                    onChange={handleGardianName}
                    required
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="gender">Gender:</label>
                  <div className="genders">
                    <p>Male</p>
                    <input
                      type="radio"
                      id="male"
                      checked={gender === "male"}
                      onChange={handleGenderChange}
                      name="gender"
                      value="male"
                      required
                    />
                    <p>Female</p>
                    <input
                      type="radio"
                      id="female"
                      checked={gender === "female"}
                      onChange={handleGenderChange}
                      name="gender"
                      value="female"
                    />
                  </div>
                </div>
                <div className="form-item">
                  <label htmlFor="DOB">Date of Birth:</label>
                  <input
                    className="date-of-birth"
                    type="date"
                    name="DOB"
                    id="DOB"
                    value={dob}
                    onChange={handleDateofBirth}
                    required
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="mothersname">Caste:</label>
                  <select
                    className="class-item"
                    name="level"
                    id="level"
                    onChange={handleCaste}
                  >
                    <option value="">Select</option>
                    <option value={`Scheduled Caste`}>Scheduled Caste</option>
                    <option value={`Scheduled Tribe`}>Scheduled Tribe</option>
                    <option value={`OBC`}>OBC</option>
                    <option value={`General`}>General</option>
                    <option value={`Other`}>Other</option>
                  </select>
                </div>

                <div className="form-item">
                  <label htmlFor="mothersname">Religion:</label>
                  <select
                    className="class-item"
                    name="level"
                    id="level"
                    onChange={handleReligion}
                  >
                    <option value="">Select</option>
                    <option value={`Hinduism`}>Hinduism</option>
                    <option value={`Christainity`}>Christinity</option>
                    <option value={`Sikhism`}>Sikhism</option>
                    <option value={`Buddhism`}>Buddhism</option>
                    <option value={`Jainism`}>Jainism</option>
                    <option value={`Other`}>Other</option>
                  </select>
                </div>

                <div className="form-item">
                  <label htmlFor="mothersname">Blood Group:</label>
                  <select
                    className="class-item"
                    name="level"
                    id="level"
                    onChange={handleBloodGroup}
                  >
                    <option value="">Select</option>
                    <option value={`O Negative`}>O Negative</option>
                    <option value={`O Positive`}>O Positive</option>
                    <option value={`A Negative`}>A Negative</option>
                    <option value={`A Positive`}>A Positive</option>
                    <option value={`B Negative`}>B Negative</option>
                    <option value={`B Positive`}>B Positive</option>
                    <option value={`AB Negative`}>AB Negative</option>
                    <option value={`AB Positive`}>AB Positive</option>
                  </select>
                </div>

                <div className="form-item">
                  <label htmlFor="email">E-mail:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="email@xyz.com"
                    onChange={handleEmail}
                    required
                  />
                </div>
                <div className="form-item"></div>

                <div className="form-item">
                  <label htmlFor="phonenumber">Tel/Mobile:</label>
                  <input
                    type="tel"
                    name="phonenumber"
                    id="phonenumber"
                    value={mobile}
                    placeholder="XXX XXX XXXX"
                    onChange={handleMobile}
                    maxLength={10}
                    required
                  />
                </div>

                {/* ACADEMIC INFORMATION */}

                <hr />
                <h3>Academic Information</h3>
                <div className="form-item">
                  <label htmlFor="level">Class:</label>
                  <select
                    className="class-item"
                    onChange={handleClass}
                    name="level"
                    id="level"
                    value={std}
                  >
                    <option value="">Select class</option>
                    <option value={`Nursary`}>Nursary</option>

                    <option value={`LKG`}>L.K.G</option>
                    <option value={`UKG`}>U.K.G</option>
                    <option value={1}>Class 1</option>
                    <option value={2}>Class 2</option>
                    <option value={3}>Class 3</option>
                    <option value={4}>Class 4</option>
                    <option value={5}>Class 5</option>
                    <option value={6}>Class 6</option>
                    <option value={7}>Class 7</option>
                    <option value={8}>Class 8</option>
                    <option value={9}>Class 9</option>
                    <option value={10}>Class 10</option>
                    <option value={11}>Class 11</option>
                    <option value={12}>Class 12</option>
                  </select>
                  <div className="section-container">
                    <select
                      className="select-section"
                      name="department"
                      id="department"
                      onChange={handleSection}
                    >
                      <option value="">Select Section</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                </div>

                <div className="form-item">
                  <label htmlFor="department">Roll No:</label>
                  <input
                    type="text"
                    value={rollNo}
                    name=""
                    id=""
                    placeholder="Roll No."
                    onChange={handleRollNo}
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="department">Academic Year:</label>
                  <input
                    type="text"
                    value={academicYear}
                    name=""
                    id=""
                    placeholder="Academic year"
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="tutionFee">Admission Fee:</label>
                  <input
                    type="number"
                    name="tutionFee"
                    id="tutionFee"
                    value={admissionFee}
                    placeholder="Admission fee"
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="tutionFee">Tuition Fee:</label>
                  <input
                    type="number"
                    name="tutionFee"
                    id="tutionFee"
                    value={tutionFee}
                    placeholder="Tuition fee"
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="busFee">Bus Fee:</label>
                  <input
                    type="number"
                    name="busFee"
                    id="busFee"
                    placeholder="Bus fee"
                    value={busFee}
                    onChange={handleBusFee}
                    disabled={!isBusFee}
                  />
                  <input
                    type="checkbox"
                    className="bus-fee"
                    value={busFee}
                    name="busFee"
                    id="busFeeCheckbox"
                    onChange={handleChange}
                  />
                  <p>Bus</p>
                </div>
                <div className="form-item">
                  <label htmlFor="hostelFee">Hostel Fee:</label>
                  <input
                    type="number"
                    name="hostelFee"
                    id="hostelFee"
                    placeholder="Hostel fee"
                    value={hostelFee}
                    onChange={handleHostelFee}
                    disabled={!isHostelFee}
                  />
                  <input
                    type="checkbox"
                    className="bus-fee"
                    value={hostelFee}
                    name="hostelFee"
                    id="hostelFeeCheckbox"
                    onChange={handleChange}
                  />
                  <p>Hostel</p>
                </div>
                <div className="form-item">
                  <label htmlFor="monthlyFee">Monthly Fee:</label>
                  <input
                    type="number"
                    name="monthlyFee"
                    id="monthlyFee"
                    value={monthlyFee}
                    placeholder="Monthly fee"
                    disabled
                  />
                </div>

                {/* PERMANENT ADDRESS */}
                <hr />
                <h3>Permanent Address</h3>
                <div className="form-item">
                  <label htmlFor="permanentAddress">Address:</label>
                  <input
                    type="text"
                    name="permanentAddress"
                    id="permanentAddress"
                    placeholder="Permanent Address"
                    value={permanentAddress.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="permanentCity">City:</label>
                  <input
                    type="text"
                    name="permanentCity"
                    id="permanentCity"
                    placeholder="City"
                    value={permanentAddress.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="permanentState">State:</label>
                  <input
                    type="text"
                    name="permanentState"
                    id="permanentState"
                    placeholder="State"
                    value={permanentAddress.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="permanentZip">Zip Code:</label>
                  <input
                    type="number"
                    name="permanentZip"
                    id="permanentZip"
                    placeholder="Zip Code"
                    value={permanentAddress.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="permanentPhone">Tel/Mobile:</label>
                  <input
                    type="tel"
                    name="permanentPhone"
                    id="permanentPhone"
                    placeholder="XXX XXX XXXX"
                    value={permanentAddress.phone}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>
                <hr />
                <h3>Temporary Address</h3>
                <div className="same-perm">
                  <label htmlFor="sameaspermanent">
                    Same as Permanent Address:
                  </label>
                  <input
                    type="checkbox"
                    name="sameaspermanent"
                    id="sameaspermanent"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="temporaryAddress">Address:</label>
                  <input
                    type="text"
                    name="temporaryAddress"
                    id="temporaryAddress"
                    placeholder="Temporary Address"
                    value={temporaryAddress.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="temporaryCity">City:</label>
                  <input
                    type="text"
                    name="temporaryCity"
                    id="temporaryCity"
                    placeholder="City"
                    value={temporaryAddress.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="temporaryState">State:</label>
                  <input
                    type="text"
                    name="temporaryState"
                    id="temporaryState"
                    placeholder="State"
                    value={temporaryAddress.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="temporaryZip">Zip Code:</label>
                  <input
                    type="number"
                    name="temporaryZip"
                    id="temporaryZip"
                    placeholder="Zip Code"
                    value={temporaryAddress.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="temporaryPhone">Tel/Mobile:</label>
                  <input
                    type="tel"
                    name="temporaryPhone"
                    id="temporaryPhone"
                    placeholder="XXX XXX XXXX"
                    value={temporaryAddress.phone}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>
                <div className="register-button">
                  <button className="register" type="submit" disabled={loading}>
                    {loading ? "Please wait" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
