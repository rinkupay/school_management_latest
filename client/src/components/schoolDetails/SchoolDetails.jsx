import React, { useState, useEffect } from "react";
import "../dashboard/Dashboard.css";
import "./SchoolDetails.css";
import {
  saveSchoolName,
  fetchSchoolDetails,
  setSchoolSession,
} from "../../features/schoolDetailsSlice/schoolDetailSlice";
import { useSelector, useDispatch } from "react-redux";

const SchoolDetails = () => {
  const dispatch = useDispatch();

  const { schoolDetails } = useSelector((state) => state.schoolDetails);

  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [sessionStart, setSessionStart] = useState("");
  const [sessionEnd, setSessionEnd] = useState("");
  const [activeTab, setActiveTab] = useState("school");
  const [successMessage, setSuccessMessage] = useState("");

  // Handler to save school details
  const saveSchoolDetails = async() => {
    const schoolDetails = { schoolName, address };
    await dispatch(saveSchoolName({ schoolDetails }));
  };

  // Handler to save session details
  const saveSessionDetails = async () => {
    const sessionDetails = { sessionStart, sessionEnd };
    await dispatch(setSchoolSession({ sessionDetails })).then(() => {
      dispatch(fetchSchoolDetails());
    });
  };

  // Fetch school details on mount
  useEffect(() => {
    const fetchDetails = async () => {
      await dispatch(fetchSchoolDetails()).unwrap(); 
    };
    fetchDetails();
  }, []);

  // SET SCHOOL DETAILS
  useEffect(() => {
    if (schoolDetails && Object.keys(schoolDetails).length > 0) {
      setSchoolName(schoolDetails?.schoolName || "");
      setAddress(schoolDetails?.schoolAddress || "");
      setSessionStart(schoolDetails?.sessionDetails?.startDate || "");
      setSessionEnd(schoolDetails?.sessionDetails?.endDate || "");
    }
  }, [schoolDetails]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">SCHOOL SETTINGS</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="schoolDetail-form-wrapper">
          <div className="schoolDetail-col left">
            <div className="schoolDetail-row-left">
              <p
                className={`school-action-label ${
                  activeTab === "school" ? "active" : ""
                }`}
                onClick={() => setActiveTab("school")}
              >
                School Title
              </p>
              <p
                className={`school-action-label ${
                  activeTab === "session" ? "active" : ""
                }`}
                onClick={() => setActiveTab("session")}
              >
                School Session
              </p>
            </div>
          </div>

          <div className="schoolDetail-col right">
            {/* SCHOOL TITLE AND ADDRESS */}
            {activeTab === "school" && (
              <div className="schoolDetail-row-right">
                <input
                  className="school-action-input"
                  type="text"
                  placeholder="Enter School Name"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
                <input
                  className="school-action-input"
                  type="text"
                  placeholder="Enter School Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                {/* Save Button for School Details */}
                <button className="save-button" onClick={saveSchoolDetails}>
                  Save
                </button>

                <div className="saved-school-details">
                  <h3> Current School Details</h3>
                  <p>
                    <strong>School Name:</strong> {schoolDetails?.schoolName}
                  </p>
                  <p>
                    <strong>Address:</strong> {schoolDetails?.schoolAddress}
                  </p>
                </div>
              </div>
            )}

            {/* SCHOOL SESSION */}
            {activeTab === "session" && (
              <div className="schoolDetail-row-right">
                <div className="session-container">
                  <div className="label-container">
                    <label className="label-session" htmlFor="">
                      Session Setting
                    </label>
                  </div>
                  <div className="session-menu-wrapper">
                    <div className="session-menus">
                      <label htmlFor="start-date">Start</label>
                      <input
                        className="input-date"
                        type="date"
                        id="start-date"
                        value={sessionStart}
                        onChange={(e) => setSessionStart(e.target.value)}
                      />
                    </div>
                    <div className="session-menus">
                      <label htmlFor="end-date">End</label>
                      <input
                        className="input-date"
                        type="date"
                        id="end-date"
                        value={sessionEnd}
                        onChange={(e) => setSessionEnd(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button for Session Details */}
                <button className="save-button" onClick={saveSessionDetails}>
                  Save Session
                </button>

                <div className="saved-session-details">
                  <h3>Current Session Details</h3>
                  <p>
                    <strong>Session Start:</strong> {sessionStart}
                  </p>
                  <p>
                    <strong>Session End:</strong> {sessionEnd}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
