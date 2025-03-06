import React, { Fragment, useEffect, useState } from "react";
import "../Dashboard.css";

import "../studentUpdate/StudentUpdate.css";
import profileImage from "../../../assets/profile.png";
import { updaterStudent ,resetState } from "../../../features/registerStudentSlice";
import { fetchStudentDetail } from "../../../features/studentDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"
import imageCompression from 'browser-image-compression';
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../confirmDialog/ConfirmDialog";
import {fetchFees} from "../../../features/feeSettingSlice";


const StudentUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageUrl = import.meta.env.VITE_BASE_URL;
  const  {id}  = useParams();



  

  const { student } = useSelector((state) => state.studentDetails);
  const {loading ,status} = useSelector((state)=>state.registerStudent)
  const {fee} = useSelector((state) => state.feeStructure);


  const data = student?.student;

  // <<<<========  PERSONAL INFORMATION ==========>>>>>>>>>>
  const [fullName, setFullName] = useState(data?.personalInfo.fullName);
  const [dob, setDob] = useState(data?.personalInfo.dob);
  const [gender, setGender] = useState(data?.personalInfo.gender);
  const [motherName, setMotherName] = useState(data?.personalInfo.motherName);
  const [fatherName, setFatherName] = useState(data?.personalInfo.fatherName);
  const [gardianName, setGardianName] = useState(
    data?.personalInfo.gardianName
  );
  const [religion, setReligion] = useState(data?.personalInfo.religion);
  const [caste, setCaste] = useState(data?.personalInfo.caste);
  const [bloodGroup, setBloodGroup] = useState(data?.personalInfo.bloodGroup);
  const [email, setEmail] = useState(data?.personalInfo.email);
  const [mobile, setMobile] = useState(data?.personalInfo.mobile);

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
  const [rollNo, setRollNo] = useState(data?.academicInfo.rollNo);
  const [std, setStd] = useState(data?.academicInfo.std);
  const [section, setSection] = useState(data?.academicInfo.section);
  const [academicYear, setAcademicYear] = useState(data?.academicInfo.academicYear);
  const [admissionFee,setAdmissionFee] = useState(data?.academicInfo.admissionFee);

  const [tutionFee, setTutionFee] = useState(data?.academicInfo.tutionFee);
  const [busFee, setBusFee] = useState(data?.academicInfo.busFee);
  const [hostelFee, setHostelFee] = useState(data?.academicInfo.hostelFee);
  const [monthlyFee, setMonthlyFee] = useState(data?.academicInfo.monthlyFee);


  const [busFeeChecked, setBusFeeChecked] = useState(busFee > 0);
  const [hostelFeeChecked, setHostelFeeChecked] = useState(hostelFee > 0);


  const handleBusFeeCheckboxChange = () => {
    setBusFeeChecked(!busFeeChecked);
    setBusFee(busFeeChecked ? 0 : data?.academicInfo.busFee || 0);
  };

  const handleHostelFeeCheckboxChange = () => {
    setHostelFeeChecked(!hostelFeeChecked);
    setHostelFee(hostelFeeChecked ? 0 : data?.academicInfo.hostelFee || 0);
  };

  const handleRollNo = (e) => {
    setRollNo(e.target.value);
  };

  const handleClass = (e) => {
    setStd(e.target.value);
  };

  const handleSection = (e) => {
    setSection(e.target.value);
  };

  // IMAGE SECTION
  const [image, setImage] = useState(`${imageUrl}/${data?.profileImage}`);
  const [avatar, setAvatar] = useState(`${imageUrl}/${data?.profileImage}`);
  const [compressedImage, setCompressedImage] = useState(null);
 


  // <<<<<<<<<<<<<<<========== IMAGE COMPRESSION ======================>>>>>>>>>>>>>>>>

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true
        };

        const compressedFile = await imageCompression(imageFile, options);
        const compressedImageUrl = URL.createObjectURL(compressedFile);

        setCompressedImage(compressedImageUrl);
        setImage(compressedFile);
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatar(reader.result);
            
          }
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing the image:', error);
      }
    }
  };





  const [permanentAddress, setPermanentAddress] = useState({
    address: data?.permanentAddress.address,
    city: data?.permanentAddress.city,
    state: data?.permanentAddress.state,
    pinCode: data?.permanentAddress.pinCode,
    phone: data?.permanentAddress.phone,
  });

  const [temporaryAddress, setTemporaryAddress] = useState({
    address: data?.correspondenceAddress.address,
    city: data?.correspondenceAddress.city,
    state: data?.correspondenceAddress.state,
    pinCode: data?.correspondenceAddress.pinCode,
    phone: data?.correspondenceAddress.phone,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    // if (name === "avatar") {
    //   setImage(event.target.files[0]);
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setAvatar(reader.result);
    //     }
    //   };
    //   reader.readAsDataURL(event.target.files[0]);
    if (name === "busFee") {
      setBusFee(checked ? parseInt(value) : 0);
      setBusFeeChecked(checked);
    } else if (name === "hostelFee") {
      setHostelFee(checked ? parseInt(value) : 0);
      setHostelFeeChecked(checked);
    } else if (type === "checkbox" && name === "sameaspermanent") {
      if (checked) {
        setTemporaryAddress(permanentAddress);
      } else {
        setTemporaryAddress({
          address: "",
          city: "",
          state: "",
          pinCode: "",
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

    handleOpenDialog();

   
 
  };


  //<<<<<<<<<<<<================ CONFIRM DIALOG ======================>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async() => {
    // Perform delete action


     // Basic validation

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


    toast.promise(dispatch(updaterStudent({formData,id})).unwrap(), {
      pending: "Updating...",
      success: "Update successfully",
      error: "Updation failed",
      
    })
    
    

 
    handleCloseDialog();
  };



  // FETCHING FEES 
  useEffect(() => {
dispatch(fetchFees());
  },[]);


// Handle class selection and update tuition fee
// Handle class selection and update tuition fee
  useEffect(() => {
    if (fee) {
      fee?.classWise?.map((item) => {
        if (item.className === std) {
          setTutionFee(item.tuitionFee || 0);
          setAdmissionFee(item.admissionFee || 0);
        }
      });
    }
  }, [std]);









// USEFFECT

  useEffect(() => {
    setAcademicYear(new Date().getFullYear());
    setMonthlyFee(tutionFee + busFee + hostelFee);
  }, [busFee, tutionFee, hostelFee]);

  useEffect(() => {

    dispatch(fetchStudentDetail(id));

  }, []);


  useEffect(()=>{
    if(status === 'fulfilled'){
      navigate(`/student-inactive/${id}`)
      
    }
    dispatch(resetState());

  },[status])


  useEffect(() => {
    if (data) {
      setFullName(data.personalInfo.fullName || "");
      setDob(data.personalInfo.dob || "");
      setGender(data.personalInfo.gender || "");
      setMotherName(data.personalInfo.motherName || "");
      setFatherName(data.personalInfo.fatherName || "");
      setGardianName(data.personalInfo.gardianName || "");
      setReligion(data.personalInfo.religion || "");
      setCaste(data.personalInfo.caste || "");
      setBloodGroup(data.personalInfo.bloodGroup || "");
      setEmail(data.personalInfo.email || "");
      setMobile(data.personalInfo.mobile || "");
      setRollNo(data.academicInfo.rollNo || "");
      setStd(data.academicInfo.std || "");
      setSection(data.academicInfo.section || "");
      setAcademicYear(data.academicInfo.academicYear || "");
      setAdmissionFee(data.academicInfo.admissionFee || 0)
      setTutionFee(data.academicInfo.tutionFee || 0);
      setBusFee(data.academicInfo.busFee || 0);
      setHostelFee(data.academicInfo.hostelFee || 0);
      setMonthlyFee(data.academicInfo.monthlyFee || 0);
      setBusFeeChecked(data.academicInfo.busFee > 0);
      setHostelFeeChecked(data.academicInfo.hostelFee > 0);
      setPermanentAddress({
        address: data.permanentAddress.address || "",
        city: data.permanentAddress.city || "",
        state: data.permanentAddress.state || "",
        pinCode: data.permanentAddress.pinCode || "",
        phone: data.permanentAddress.phone || "",
      });
      setTemporaryAddress({
        address: data.correspondenceAddress.address || "",
        city: data.correspondenceAddress.city || "",
        state: data.correspondenceAddress.state || "",
        pinCode: data.correspondenceAddress.pinCode || "",
        phone: data.correspondenceAddress.phone || "",
      });
      setImage(`${import.meta.env.VITE_BASE_URL}/${data.profileImage}`);
      setAvatar(`${import.meta.env.VITE_BASE_URL}/${data.profileImage}`);
    }
  }, [data]);  // Dependency array includes `data`
  

  return (
    <Fragment>
      {data && <div className="dashboard-wrapper">
  
      <div className="dashboard-right">
        <h2 className="dashboard-heading">UPDATE STUDENT</h2>
        {/* <NavButton id={id}/> */}
        <div className="register-container">
          <div className="container">
            {/* <h1>XYZ College/School</h1> */}
            <h2>Student Updation Form</h2>
            <div className="form-wrapper">
              <form onSubmit={handleRegister}>
                <div className="form-item">
                  <label htmlFor="">Student Image:</label>

                  <div className="image">
                    <img
                      className="profile-image"
                      src={image ? avatar : profileImage}
                      alt="profile-image"
                    />
                  </div>

                  <input
                    type="file"
                    name="avatar"
                    id="studentimage"
                    onChange={handleImageUpload}
                    accept="image/*"
                 
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
                    onChange={handleDateofBirth}
                    value={dob ? dob.slice(0, 10) : ''}
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
                    value={caste}
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
                    value={religion}
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
                    value={bloodGroup}
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
                      value={section}
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
                    placeholder="Tuition fee"
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
                        readOnly={!busFeeChecked}
                        disabled={!busFeeChecked}
                        onChange={(e) =>
                          setBusFee(
                            e.target.value ? Number(e.target.value) : ""
                          )
                        }
                      />
                      <input
                        type="checkbox"
                        className="bus-fee"
                        name="busFee"
                        id="busFeeCheckbox"
                        checked={busFeeChecked}
                        onChange={handleBusFeeCheckboxChange}
                      />
                      <p>Bus</p>
                    </div>



           

<div className="form-item">
                      <label htmlFor="hostelFee">Hostel Fee:</label>
                      <input
                        type="number"
                        value={hostelFee}
                        onChange={(e) =>
                          setHostelFee(
                            e.target.value ? Number(e.target.value) : ""
                          )
                        }
                        placeholder="Enter Hostel Fee"
                        readOnly={!hostelFeeChecked}
                        disabled={!hostelFeeChecked}
                      />
                      <input
                        type="checkbox"
                        className="bus-fee"
                        name="hostelFee"
                        id="hostelFeeCheckbox"
                        checked={hostelFeeChecked}
                        onChange={handleHostelFeeCheckboxChange}
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
                    // onChange={(e) => setMonthlyFee(parseInt(e.target.value))}
                    readOnly
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
                    value={permanentAddress.pinCode}
                    onChange={handleChange}
                    maxLength={6}
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
                    value={temporaryAddress.pinCode}
                    onChange={handleChange}
                    maxLength={6}
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
                    {loading ? "Please wait" : "Update"}
                  </button>
                  <p className="register" onClick={()=>navigate(`/student-inactive/${id}`)}  >
                    Cancel
                  </p>
                </div>
               
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}


      <ConfirmDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirm}
          message={"Are you sure you want to update?"}
          actionMessage={"Update Student"}
        />

    </div>}
    </Fragment>
  );
};

export default StudentUpdate;
