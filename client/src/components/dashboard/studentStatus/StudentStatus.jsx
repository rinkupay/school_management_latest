import React, { useEffect } from "react";
import NavButton from "../navbutton/NavButton";
import { useParams } from "react-router-dom";
import "./StudentStatus.css";
import { FaClipboardList } from "react-icons/fa"; // Import icon for the button
import { fetchStudentDetail } from "../../../features/studentDetailSlice";
import { useDispatch, useSelector } from "react-redux";

const StudentStatus = () => {
  const dispatch = useDispatch();
  const imageUrl = import.meta.env.VITE_BASE_URL;

  const { id } = useParams();
  const { student } = useSelector((state) => state.studentDetails);
  const data = student?.student;


  useEffect(() => {
    dispatch(fetchStudentDetail(id)); // ✅ Dispatch the action
  }, [dispatch, id]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">STATUS</h2>
        <NavButton id={id} />

        {data && (
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <img
                  src={`${imageUrl}/${data?.profileImage}`} // Placeholder image
                  alt="Student Avatar"
                />
              </div>
              <div className="profile-name">{data?.personalInfo?.fullName}</div>
              <button className="report-btn">
                <FaClipboardList className="icon" /> View Reports
              </button>
            </div>

            <div className="profile-details">
              <div className="personal-details">
                <h3>Personal details</h3>
                <p className="personal-detail-content">
                  <strong>Student ID:</strong>{" "}
                  {data?.studentId}
                </p>
                <p className="personal-detail-content">
                  <strong>Gender:</strong>{" "}
                  {data?.personalInfo?.gender}
                </p>
                <p className="personal-detail-content">
                  <strong>Birth Date:</strong>{" "}
                  {data?.personalInfo?.dob.slice(0, 10).split('-').reverse().join('-')}
                </p>

                <h3>Class details ({data?.academicInfo?.academicYear}-{Number(data?.academicInfo?.academicYear?.slice(2))+1})</h3>
                <p className="personal-detail-content">
                  <strong>Class:</strong>{" "}
                  {data?.academicInfo?.std}
                </p>
                <p className="personal-detail-content">
                  <strong>Section:</strong>{" "}
                  {data?.academicInfo?.section}
                </p>
                <p className="personal-detail-content">
                  <strong>Admission Date:</strong>{" "}
                  {data?.createdAt?.slice(0, 10).split('-').reverse().join('-')}
                </p>
                <p className="personal-detail-content">
                  <strong>Status:</strong>{" "}
                  {data?.isActive ? (
                    <span className="status active">Active</span>
                  ) : (
                    <span className="status inactive">In Active</span>
                  )}
                </p>
                {/* <p><strong>Address:</strong> Lot PT24045 K, Taman Tanjung Damai, 21300, Kuala Terengganu, Terengganu.</p> */}
              </div>


              {/* PROGRESSION STATUS */}
              <div className="class-details">
                <h3>Progression details ({data?.progressionInfo?.currentSession}-{Number(data?.progressionInfo?.currentSession?.slice(2)) +1})</h3>
                {/* <p className="personal-detail-content">
                  <strong>Status:</strong>{" "}
                  {data?.isActive ? (
                    <span className="status active">Active</span>
                  ) : (
                    <span className="status inactive">In Active</span>
                  )}
                </p> */}
               <p className="personal-detail-content">
                  <strong>Registered Date :</strong>
                  {" "} {data?.createdAt?.slice(0, 10).split('-').reverse().join('-')}
                </p>
                <p className="personal-detail-content">
                  <strong> Current Admission Date :</strong>
                  {" "} {data?.currentlyAdmitted?.admissionDate?.slice(0, 10).split('-').reverse().join('-')}
                </p>
                <p className="personal-detail-content">
                  <strong>Current Session:</strong>{" "}
                  {data?.progressionInfo?.currentSession}
                </p>
                <p className="personal-detail-content">
                  <strong>Last Exam Marks in %:</strong>{" "}
                  {data?.progressionInfo?.marks}
                </p>
                <p className="personal-detail-content">
                  <strong>Days Attended in ({data?.progressionInfo?.currentSession}):</strong>
                  {" "}{data?.progressionInfo?.daysAttended}
                </p>
                <p className="personal-detail-content">
                  <strong>Progressed On:</strong>{" "}
                  {data?.progressionInfo?.progressedOn?.slice(0, 10).split('-').reverse().join('-')}
                </p>
                
                <p className="personal-detail-content">
                  <strong>Schooling Status:</strong>{" "}
                  {data?.progressionInfo?.schoolingStatus}
                </p>
                <p className="personal-detail-content">
                  <strong>Progression Status:</strong>{" "}
                  {data?.progressionInfo?.progressionStatus}
                </p>
              </div>




            </div>

            {/* <button className="update-btn">UPDATE</button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentStatus;
