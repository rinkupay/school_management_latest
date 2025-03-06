import React, { Fragment, useEffect, useState } from "react";
import "./TeacherProfile.css";
import profileImage from "../../../../assets/profile.png";
import Loader from "../../../loader/Loader";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";




const TeacherProfile = ({ data,loading }) => {
  const imageUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [imageToShow, setImageToShow] = useState(null); // State to store the image URL to show in modal
  const [documentImage,setDocumentImage] = useState(null);
  

  // Open the modal and set the image to show
  const handleViewClick = (imageUrl) => {
    setImageToShow(imageUrl);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImageToShow(null);
  };

  // REDIRECT TO PAYMENT PAGE
  const handlePayment = () => {
    navigate(`/payment-admission/${data._id}`);
  };

  useEffect(()=>{
   setDocumentImage(data?.documentInfo?.aadharImage);
  },[])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {data && (
            <Fragment>
              <div className="profile-wrapper">
                <div className="profile-container">
                  <div className="left-profile-container">
                    <div className="left-wrapper">
                      <div className="active-icons">
                        {data.isActive ? <FcApproval size={24} /> :  <FcHighPriority size={24} />}
                      
                     
                      </div>
                      <div className="image-name">
                        <div className="image-name-2">
                          <img
                            className="profile-picture"
                            src={
                              data?.profileImage
                                ? `${imageUrl}/${data?.profileImage}`
                                : profileImage
                            }
                            alt=""
                          />
                          <h2 className="student-name">
                            {data?.personalInfo?.fullName}
                          </h2>
                        </div>
                        <div className="profile-add-details">
                          <h3 className="student-add-det">
                            Role : {data?.employeeRole}
                          </h3>
                          <h3 className="student-add-det">
                           ID : 41654654
                          </h3>
                          <h3 className="student-add-det">
                            {/* Section :  */}
                          </h3>
                        </div>
                      </div>
                      {/* {data.isActive ? '' :  <button className="admission-complete" onClick={()=>handlePayment()}>Complete Admission</button>} */}
                    </div>
                  </div>
                  <div className="right-profile-container">
                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">General Information</h2>
                      </div>

                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td className="first-box">Name</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.fullName}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Gender</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.gender}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Designation</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.experienceInfo?.designation}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Date Of Birth</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.dob?.slice(0, 10)}
                              </td>
                            </tr>

                            <tr>
                              <td className="first-box">Age</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.age}
                              </td>
                            </tr>

                            <tr>
                              <td className="first-box">Religion</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.religion}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Caste</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.caste}
                              </td>
                            </tr>

                            <tr>
                              <td className="first-box">Blood Group</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.bloodGroup}
                              </td>
                            </tr>

                            <tr>
                              <td className="first-box">Mobile</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.mobile}
                              </td>
                            </tr>

                            <tr>
                              <td className="first-box">E-Mail</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.email}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* EDUCATIONAL BACKGROUND */}

                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">Educational Details</h2>
                      </div>

                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td className="first-box">
                                Highest Qualification
                              </td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.educationInfo?.qualification}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Institution</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.educationInfo?.institution}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Language Known</td>
                              <td className="middle-box">:</td>
                              <td className="third-box language">
                                {data?.educationInfo?.languageKnown?.map(
                                  (data, index) => (
                                    <span key={index}>{data + ","}</span>
                                  )
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Special Skill</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {/* {data?.academicInfo?.admissionFee} */}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* SALARY STRUCTURE */}

                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">Salary Structure</h2>
                      </div>

                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                          <tr>
                              <td className="first-box">Joining Date</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.paymentInfo?.joinDate?.slice(0,10).split('-').reverse().join('-')}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Per Month</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.paymentInfo?.perMonthSalary}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">Experience</h2>
                      </div>

                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td className="first-box">Period</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.experienceInfo?.experiencePeriod}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">
                                Organization & Address
                              </td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.experienceInfo?.organization}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Designation</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.experienceInfo?.designation}
                              </td>
                            </tr>

                            <tr>
                              <td className="first-box">
                                Personal Achievements ( if any)
                              </td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.experienceInfo?.personalAchievemen}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">Documents</h2>
                      </div>
                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td className="first-box">Aadhar ID</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.aadharId}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Aadhar Card</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.documentInfo?.aadharImage ? (
                                  <div className="aadhar-view">
                                    <FaCheckCircle
                                      size={20}
                                      display={"flex"}
                                      color="green"
                                    />{" "}
                                    <button onClick={handleViewClick}>view</button>
                                  </div>
                                ) : (
                                  "N/A"
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* PERMANENT ADDRESS */}
                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">Permanent Address</h2>
                      </div>

                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td className="first-box">Address</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.addressInfo?.address1}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">City</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.addressInfo?.city}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">State</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.addressInfo?.state}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Pin Code</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.addressInfo?.pinCode}
                              </td>
                            </tr>
                            {/* <tr>
                              <td className="first-box">Mobile</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                            
                              </td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>

                      {/* Modal to display the image */}
                      {isModalOpen && (
                        <div className={`modal-overlay ${isModalOpen ? "open" : ""}`}>
                          
                          <div className="modal-content">
                          <span
                              className="close-button"
                              onClick={handleCloseModal}
                              
                              
                            >
                              &times;
                            </span>
                            <img
                              src={`${imageUrl}/${data?.documentInfo?.aadharImage}`}
                              alt="Aadhar"
                              className="aadhar-modal-image"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default TeacherProfile;
