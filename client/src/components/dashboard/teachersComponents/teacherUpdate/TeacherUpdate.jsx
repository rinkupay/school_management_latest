import React, { useEffect, useState } from "react";

import "./TeacherUpdate.css";
import "../../Dashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import TeacherNavBtn from "../teacherNavBtn/TeacherNavBtn";
import profileImage from "../../../../assets/profile.png";
import { fetchTeacherDetail } from "../../../../features/teacherDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import toast from 'react-hot-toast';
import { updateTeacher,updateTeacherImage,resetState } from "../../../../features/teacherRegistrationSlice";



const TeacherUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageUrl = import.meta.env.VITE_BASE_URL;

  // <<<<<<<<<<<<<<<================= ACCESSING DATE FROM STATE ============>>>>>>>>>>>
  const { teacher } = useSelector((state) => state.teacherDetails);
  const data = teacher?.teacher;

  const {loading} = useSelector((state)=>state.teacher);




  // <<<<========  PERSONAL INFORMATION ==========>>>>>>>>>>
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // <<<<<<<<<<========= SALARY ==============>>>>>>>>>>
  const [salary, setSalary] = useState(0);

  // <<<<<<<<<<========= PERSONAL ACHEIVEMENTS ==============>>>>>>>>>>
  const [acheivement, setAcheivement] = useState({
    experiencePeriod: "",
    organization: "",
    designation: "",
    personalAcheivement: "",
  });

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleFatherName = (e) => {
    setFatherName(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleDateofBirth = (e) => {
    setDob(e.target.value);
  };
  const handleAge = (e) => {
    setAge(Number(e.target.value));
  };
  const handleCaste = (e) => {
    setCaste(e.target.value);
  };
  const handleReligion = (e) => {
    setReligion(e.target.value);
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

  // IMAGE SECTION
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [compressedImage, setCompressedImage] = useState(null);
  const [newImage,setNewImage] = useState(null);
  

  // <<<<<<<<<<<<<<<========== IMAGE COMPRESSION ======================>>>>>>>>>>>>>>>>

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(imageFile, options);
        const compressedImageUrl = URL.createObjectURL(compressedFile);

        setCompressedImage(compressedImageUrl);
        setNewImage(compressedFile)
        setImage(compressedFile);
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing the image:", error);
      }
    }
  };

  const [permanentAddress, setPermanentAddress] = useState({
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  // Handle changes for permanent address fields
  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setPermanentAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // <<<<<<<<<<============== HANDLE SALARY ==================>>>>>>>>>>>>>>>
  const handleSalary = (e) => {
    setSalary(e.target.value);
  };

  // <<<<<<<<<<============== HANDLE PERSONAL ACHEIVEMENTS ==================>>>>>>>>>>>>>>>
  const handlePersonalAcheivement = (e) => {
    const { name, value } = e.target;
    setAcheivement((preAche) => ({
      ...preAche,
      [name]: value,
    }));
  };

  // <<<<<<<<<<============== HANDLE EDUCATION DETAILS ==================>>>>>>>>>>>>>>>
  const [education, setEducation] = useState({
    highestQualification: "",
    institution: "",
    languageKnown: "",
    specialSkill: "",
  });

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducation((preEducation) => ({
      ...preEducation,
      [name]: value,
    }));
  };

  // <<<<<<<<============== HANDLE IMAGE UPDATE ===============>>>>>>>>

  const updateImage = () => {
    const formData = new FormData();
    formData.append("image", newImage);

    try {
      dispatch(updateTeacherImage({id,formData}));

      dispatch(resetState());


    } catch (error) {
      toast.error(error.message);
    }
  };

  // <<<<<<<<============== HANDLE UPDATE ===============>>>>>>>>
  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "personalInfo",
      JSON.stringify({
        fullName,
        fatherName,
        gender,
        religion,
        caste,
        bloodGroup,
        dob,
        age,
        email,
        mobile,
      })
    );
    formData.append("permanentAddress", JSON.stringify(permanentAddress));
    formData.append("educationInfo", JSON.stringify(education));
    formData.append("acheivement", JSON.stringify(acheivement));
    formData.append("salary", JSON.stringify(salary));

    try {
      dispatch(updateTeacher({ formData, id }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Upload New Image
  useEffect(()=>{
   if(newImage){
    updateImage();
   }
  },[newImage]);

  // FETCH TEACHER DETAILS
  useEffect(() => {
    dispatch(fetchTeacherDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (data) {
      setFullName(data?.personalInfo?.fullName || "");
      setFatherName(data?.personalInfo?.fatherName || "");
      setGender(data?.personalInfo?.gender || "");
      setDob(data?.personalInfo?.dob || "");
      setAge(data?.personalInfo?.age || 0);
      setCaste(data?.personalInfo?.caste || "");
      setReligion(data?.personalInfo?.religion || "");
      setBloodGroup(data?.personalInfo?.bloodGroup || "");
      setEmail(data?.personalInfo?.email || "");
      setMobile(data?.personalInfo?.mobile || "");
      setImage(`${import.meta.env.VITE_BASE_URL}/${data.profileImage || ""}`);
      setAvatar(`${import.meta.env.VITE_BASE_URL}/${data.profileImage || ""}`);

      setPermanentAddress({
        address: data?.addressInfo?.address1 || "",
        city: data?.addressInfo?.city || "",
        state: data?.addressInfo?.state || "",
        pinCode: data?.addressInfo?.pinCode || "",
        phone: data?.addressInfo?.mobile || "",
      });

      setEducation({
        highestQualification: data?.educationInfo?.qualification || "",
        institution: data?.educationInfo?.institution || "",
        languageKnown: data?.educationInfo?.languageKnown || "",
        specialSkill: data?.educationInfo?.specialSkill || "",
      });

      setSalary(data?.paymentInfo?.perMonthSalary || 0);

      setAcheivement({
        experiencePeriod: data?.experienceInfo?.experiencePeriod || "",
        organization: data?.experienceInfo?.organization || "",
        designation: data?.experienceInfo?.designation || "",
        personalAcheivement: data?.experienceInfo?.personalAcheivements || "",
      });
    }
  }, [data]);

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-right">
        <h2 className="dashboard-heading">EMPLOYEE UPDATION</h2>
        <TeacherNavBtn id={id} />
        <div className="register-container">
          <div className="container">
            {/* <h1>XYZ College/School</h1> */}
            <h2>Employee Updation Form</h2>
            <div className="form-wrapper">
              <form onSubmit={handleUpdate}>
                <div className="form-item">
                  <label htmlFor="">Employee Image:</label>

                  <div className="image">
                   {loading ? "Helllo" :  <img
                      className="profile-image"
                      src={avatar ? avatar : profileImage}
                  
                      alt="profile-image"
                    />}
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
                  <label htmlFor="fullname">Teacher Name:</label>
                  <input
                    type="text"
                    name="fullname"
                    value={fullName || ""}
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
                    value={fatherName || ""}
                    placeholder="Father's Full Name"
                    onChange={handleFatherName}
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
                      checked={gender === "Male"}
                      onChange={handleGenderChange}
                      name="gender"
                      value="Male"
                      required
                    />
                    <p>Female</p>
                    <input
                      type="radio"
                      id="female"
                      checked={gender === "Female"}
                      onChange={handleGenderChange}
                      name="gender"
                      value="Female"
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
                    value={dob ? dob.slice(0, 10) : ""}
                    required
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="DOB">Age:</label>
                  <input
                    className="date-of-birth"
                    type="Number"
                    name="age"
                    id="age"
                    onChange={handleAge}
                    value={age}
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
                    <option value={`ST`}>ST</option>
                    <option value={`SC`}>SC</option>
                    <option value={`OBC`}>OBC</option>
                    <option value={`General`}>General</option>
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
                    <option value={`Hindu`}>Hindu</option>
                    <option value={`Sarna`}>Sarna</option>
                    <option value={`Christian`}>Christian</option>
                    <option value={`Sikh`}>Sikh</option>
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

                {/* EDUCATIONAL DETAILS */}
                <hr />
                <h3>EDUCATIONAL DETAILS</h3>
                <div className="form-item">
                  <label htmlFor="highestQualification">
                    Highest Qualification:
                  </label>
                  <input
                    type="text"
                    name="highestQualification"
                    id="highestQualification"
                    placeholder="Highest Qualification"
                    value={education.highestQualification}
                    onChange={handleEducationChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="institution">Institution:</label>
                  <input
                    type="text"
                    name="institution"
                    id="institution"
                    placeholder="Institution"
                    value={education.institution}
                    onChange={handleEducationChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="languageKnown">Language Known:</label>
                  <input
                    type="text"
                    name="languageKnown"
                    id="languageKnown"
                    placeholder="Language Known"
                    value={education.languageKnown}
                    onChange={handleEducationChange}
                    required
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="specialSkill">Special Skill:</label>
                  <input
                    type="text"
                    name="specialSkill"
                    id="specialSkill"
                    placeholder="Special Skill"
                    value={education.specialSkill}
                    onChange={handleEducationChange}
                  />
                </div>

                {/* EXPERIENCE DETAILS */}
                <hr />
                <h3>EXPERIENCE DETAILS</h3>
                <div className="form-item">
                  <label htmlFor="experience">Experience Period:</label>
                  <input
                    type="text"
                    name="experiencePeriod"
                    id="experience"
                    placeholder="Experience Period"
                    value={acheivement.experiencePeriod}
                    onChange={handlePersonalAcheivement}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="organization">Organization:</label>
                  <input
                    type="text"
                    name="organization"
                    id="organization"
                    placeholder="Organization"
                    value={acheivement.organization}
                    onChange={handlePersonalAcheivement}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="designation">Designation:</label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    placeholder="Designation"
                    value={acheivement.designation}
                    onChange={handlePersonalAcheivement}
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="acheivements">Personal Acheivements:</label>
                  <input
                    type="text"
                    name="personalAcheivement"
                    id="acheivements"
                    placeholder="Personal Acheivement"
                    value={acheivement.personalAcheivement}
                    onChange={handlePersonalAcheivement}
                  />
                </div>

                {/* SALARY DETAAILS */}
                <hr />
                <h3>SALARY DETAILS</h3>

                <div className="form-item">
                  <label htmlFor="salary">Salary (Per Month):</label>
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    placeholder="Salary"
                    value={salary || 0}
                    onChange={handleSalary}
                  />
                </div>

                {/* PERMANENT ADDRESS */}
                <hr />
                <h3>Permanent Address</h3>
                <div className="form-item">
                  <label htmlFor="permanentAddress">Address:</label>
                  <input
                    type="text"
                    name="address"
                    id="permanentAddress"
                    placeholder="Permanent Address"
                    value={permanentAddress.address}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="permanentCity">City:</label>
                  <input
                    type="text"
                    name="city"
                    id="permanentCity"
                    placeholder="City"
                    value={permanentAddress.city}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="permanentState">State:</label>
                  <input
                    type="text"
                    name="state"
                    id="permanentState"
                    placeholder="State"
                    value={permanentAddress.state}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="permanentZip">Zip Code:</label>
                  <input
                    type="number"
                    name="pinCode"
                    id="permanentZip"
                    placeholder="Zip Code"
                    value={permanentAddress.pinCode}
                    onChange={handleAddressChange}
                    maxLength={6}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="permanentPhone">Tel/Mobile:</label>
                  <input
                    type="tel"
                    name="phone"
                    id="permanentPhone"
                    placeholder="XXX XXX XXXX"
                    value={permanentAddress.phone}
                    onChange={handleAddressChange}
                    maxLength={10}
                  />
                </div>
                <hr />

                <div className="register-button">
                  <button className="register-btn" type="submit" disabled={loading}>
                    {loading ? "Please wait" : "Update"}
                  </button>
                  <p
                    className="register-btn"
                    onClick={() => navigate(`/teacher/${id}`)}
                  >
                    Cancel
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherUpdate;
