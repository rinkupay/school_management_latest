import React, { Fragment, useEffect, useState } from "react";
import "./AdminProfile.css";

import "../Dashboard.css";
import profileImg from "../../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import {updateUser} from "../../../features/userRegisterSlice"
import { useParams } from "react-router-dom";
import {loadAdmin} from "../../../features/userSlice"



const AdminProfile = () => {

  const dispatch = useDispatch();
  const {id} = useParams();




  const { adminDetails } = useSelector((state) => state.user);
  const data = adminDetails?.user;

  const {status} = useSelector((state)=>state.registerUser)

  // State hooks to store form field values
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");

  // State Hook for edit mode
  const [edit, setEdit] = useState(false);

  // Handler functions for each field
  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleMobileChange = (e) => setMobile(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleAddress1Change = (e) => setAddress1(e.target.value);
  const handleAddress2Change = (e) => setAddress2(e.target.value);
  const handlePincodeChange = (e) => setPinCode(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);


    // Function to reset form fields to initial values
    const resetForm = () => {
      if (data) {
        setFullName(data?.userName);
        setEmail(data?.email);
        setGender(data?.gender);
        setMobile(data?.mobile || "");
        setAddress1(data?.address?.address1 || "");
        setAddress2(data?.address?.address2 || "");
        setPinCode(data?.address?.pinCode || "");
        setState(data?.address?.state || "");
      }
    };

  const editMode = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
    resetForm(); // Reset the form fields
  };

 // Update profile information
 const handleUpdate = async() => {
  const formData = {
    userName: fullName,
    mobile,
    email,
    address1,
    address2,
    pinCode,
    state,
  };

  // Dispatch the update action or make an API call
  dispatch(updateUser({formData,id}));
  

  setEdit(false); // Exit edit mode


 
};

useEffect(()=>{

  if(status === "fulfilled"){
    dispatch(loadAdmin())
  }

},[status,dispatch])

  useEffect(() => {
    resetForm(); // Set initial form values
  }, [data]);





  return (
    <Fragment>
      {data && (
        <div className="dashboard-wrapper">
      
          <div className="dashboard-right">
            <h2 className="dashboard-heading">Profile</h2>

            <div className="admin-profile-wrapper">
              <div className="admin-profile-container">
                <div className="admin-profile-left">
                  <div className="profile-left-container">
                    <div className="left-profile-menu">
                      <img src={profileImg} alt="Profile" />
                      <h4>{data.userName}</h4>
                      <p>{data.email}</p>
                    </div>
                  </div>
                </div>
                <div className="admin-profile-right">
                  <div className="profile-right-sub">
                    <div className="profile-right-container">
                      



                      
                            <div className="edit-menu">
                            <h4>Profile Settings</h4>
                              {edit ? (
                                <p onClick={handleUpdate}>Save</p>
                              ) : (
                                <p onClick={editMode}>Edit</p>
                              )}
                              {edit && (
                                <p onClick={handleCancel}>Cancel</p>
                              )}
                            </div>
                    
                   


                      <div className="profile-right-sub-container">
                        <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <label htmlFor="fullname">Full Name</label>
                            <input
                              className={`menu-field ${edit && "active-edit"}`}
                              type="text"
                              id="fullname"
                              value={fullName}
                              onChange={handleFullNameChange}
                              readOnly={!edit}
                            />
                          </div>
                        </div>

                        <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <label>Gender</label>
                            <div className="gender-checkboxes">
                              <label>
                                <input className="gender"
                                  type="radio"
                                  name="gender"
                                  value="male"
                                  checked={gender === "male"}
                                  onChange={handleGenderChange}
                                  disabled={!edit}
                                />
                                Male
                              </label>
                              <label>
                                <input className="gender"
                                  type="radio"
                                  name="gender"
                                  value="female"
                                  checked={gender === "female"}
                                  onChange={handleGenderChange}
                                  disabled={!edit}
                                />
                                Female
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <label htmlFor="role">Role</label>
                            <input
                              className="menu-field"
                              type="text"
                              id="role"
                              value={data.role}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <label htmlFor="mobile">Mobile No</label>
                            <input
                              className={`menu-field ${edit && "active-edit"}`}
                              type="text"
                              id="mobile"
                              value={mobile}
                              onChange={handleMobileChange}
                              readOnly={!edit}
                            />
                          </div>
                        </div>

                        <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <label htmlFor="email">Email</label>
                            <input
                              className={`menu-field ${edit && "active-edit"}`}
                              type="text"
                              id="email"
                              value={email}
                              onChange={handleEmailChange}
                              readOnly={!edit}
                            />
                          </div>
                        </div>

                        <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <label htmlFor="address1">Address Line 1</label>
                            <input
                              className={`menu-field ${edit && "active-edit"}`}
                              type="text"
                              id="address1"
                              value={address1}
                              onChange={handleAddress1Change}
                              readOnly={!edit}
                            />
                          </div>
                        </div>

                        <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <label htmlFor="address2">Address Line 2</label>
                            <input
                              className={`menu-field ${edit && "active-edit"}`}
                              type="text"
                              id="address2"
                              value={address2}
                              onChange={handleAddress2Change}
                              readOnly={!edit}
                            />
                          </div>
                        </div>

                        <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <label htmlFor="pincode">Pin Code</label>
                            <input
                              className={`menu-field ${edit && "active-edit"}`}
                              type="number"
                              id="pincode"
                              value={pinCode}
                              onChange={handlePincodeChange}
                              readOnly={!edit}
                            />
                          </div>
                        </div>

                        <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <label htmlFor="state">State</label>
                            <input
                              className={`menu-field ${edit && "active-edit"}`}
                              type="text"
                              id="state"
                              value={state}
                              onChange={handleStateChange}
                              readOnly={!edit}
                            />
                          </div>
                        </div>

                        {/* <div className="admin-menu-container">
                          <div className="admin-menu-sub">
                            <div className="edit-menu">
                              {edit ? (
                                <button onClick={handleUpdate}>Save</button>
                              ) : (
                                <button onClick={editMode}>Edit</button>
                              )}
                              {edit && (
                                <button onClick={handleCancel}>Cancel</button>
                              )}
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="profile-right-sub"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AdminProfile;
