import React, { Fragment, useState } from "react";
import "./StudentProfile.css";
import profileImage from "../../../assets/profile.png";
import { FcHighPriority } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import Loader from "../../loader/Loader";
import { useNavigate } from "react-router-dom";
import SmsEmailToggle from "../../smsEmailToggle/SmsEmailToggle";

const StudentProfile = ({ data, loading }) => {
  const imageUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();



  // REDIRECT TO PAYMENT PAGE
const handlePayment = ()=>{
   navigate(`/payment-admission/${data._id}`) 
}



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
                      <div className="student-image-name">
                        <div className="student-image-name-2">
                          <div className="student-active-icon">
                            {data.isActive ? <FcApproval size={26} /> : <FcHighPriority size={26} />}
                          </div>
                          <img
                            className="student-profile-picture"
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
                            Student ID : {data?.studentId}
                          </h3>
                          <h3 className="student-add-det">
                            Class : {data?.academicInfo?.std}
                          </h3>
                          <h3 className="student-add-det">
                            Section : {data?.academicInfo?.section}
                          </h3>
                        </div>
                      </div>
                     {data.isActive ? '' :  <button className="admission-complete" >Complete Admission process</button>}
                    </div>
                  </div>
                  <div className="right-profile-container">
                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">General Information</h2>

                        {/* SWITCH FOR SMS AND EMAIL */}
                        <div className="toggle-btn-group">

                          <SmsEmailToggle />
                          
                        </div>
                      </div>

                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td className="first-box">Gender</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.gender}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Date Of Birth</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.dob.slice(0, 10)}
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

                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">
                          Academic Information
                        </h2>
                      </div>

                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                          <tr>
                              <td className="first-box">Class</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.academicInfo?.std}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Section</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.academicInfo?.section}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Roll No.</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.academicInfo?.rollNo}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Acedemic Year</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.academicInfo?.academicYear}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Admission Status</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.isActive === true ? 'Active' : 'InActive' }
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Admission Fee</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.academicInfo?.admissionFee}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Tution Fee</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.academicInfo?.tutionFee}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Bus Fee</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.academicInfo?.busFee}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Hostel Fee</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.academicInfo?.hostelFee}
                              </td>
                            </tr>

                            <tr>
                              <td className="first-box">Monthly Fee (Total)</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.academicInfo?.monthlyFee}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">
                          Parents & Guardian Information
                        </h2>
                      </div>

                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td className="first-box">Father's Name</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.fatherName}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Mother's Name</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.motherName}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Guardian's Name</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.gardianName}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Mobile No.</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.personalInfo?.mobile}
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
                                {data?.permanentAddress?.address}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">City</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.permanentAddress?.city}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">State</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.permanentAddress?.state}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Pin Code</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.permanentAddress?.pinCode}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Mobile</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.permanentAddress?.phone}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* CORRESPONDENCE ADDRESS */}
                    <div className="right-profile-wrapper">
                      <div className="general-info">
                        <h2 className="profile-heading">
                          Correspondence Address
                        </h2>
                      </div>

                      <div className="table-container">
                        <table className="student-table">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td className="first-box">Address</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.correspondenceAddress?.address}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">City</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.correspondenceAddress?.city}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">State</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.correspondenceAddress?.state}
                              </td>
                            </tr>
                            <tr>
                              <td className="first-box">Pin Code</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.correspondenceAddress?.pinCode}
                              </td>
                            </tr>

                            <tr>
                              <td className="first-box">Mobile</td>
                              <td className="middle-box">:</td>
                              <td className="third-box">
                                {data?.correspondenceAddress?.phone}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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

export default StudentProfile;
