import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import "./FeeSettings.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchFees, updateFees, updateExamAdmFeeMonth } from "../../../features/feeSettingSlice";
import toast from 'react-hot-toast';

const FeeSettings = () => {
  const dispatch = useDispatch();

  const { fee } = useSelector((state) => state.feeStructure);


  // State for Class 
  const [className, setClassName] = useState("");

  // State for all fees
  const [fees, setFees] = useState({
    admissionFee: 0,
    tuitionFee: 0,
    examFee: 0,
    lateFee: 0,
    libraryFee: 0,
  });

  // State for Admission Fee Collection Month
  const [admissionFeeMonth, setAdmissionFeeMonth] = useState([]);

  // State for Exam Fee Collection Month
  const [examFeeMonth, setExamFeeMonth] = useState([]);

  // State for Library Fee Collection Month
  const [libraryFeeMonth, setLibraryFeeMonth] = useState([]);

  // Edit State Boolean
  const [isEdit, setIsEdit] = useState(true);

  // Admission & Exam Fee State
  const [isAvailable, setIsAvailable] = useState(true);

  // Handle fee changes
  const handleFeeChange = (e) => {
    const { id, value } = e.target;
    setFees((prevFees) => ({
      ...prevFees,
      [id]: value,
    }));
  };

  // Handle Admission Fee Month
  const handleAdmissionFeeMonth = (e) => {
    const { value, checked } = e.target;
    setAdmissionFeeMonth((prevMonth) => {
      if (checked) {
        return [...prevMonth, value]; // Add month to array if checked
      } else {
        return prevMonth.filter((month) => month !== value); // Remove month from array if unchecked
      }
    });
  };

  // Handle Exam Fee Month
  const handleExamFeeMonth = (e) => {
    const { value, checked } = e.target;
    setExamFeeMonth((prevMonth) => {
      if (checked) {
        return [...prevMonth, value]; // Add month to array if checked
      } else {
        return prevMonth.filter((month) => month !== value); // Remove month from array if unchecked
      }
    });
  };

  // Handle Library Fee Month
  const handleLibraryFeeMonth = (e) => {
    const { value, checked } = e.target;
    setLibraryFeeMonth((prevMonth) => {
      if (checked) {
        return [...prevMonth, value]; // Add month to array if checked
      } else {
        return prevMonth.filter((month) => month !== value); // Remove month from array if unchecked
      }
    });
  };

  // Handle Class Name 
  const handleClassName = (e) => {
    setClassName(e.target.value);
  };

  // Handle Edit & Update
  const handleEdit = () => {
    setIsEdit(false);
  };

  // Handle Cancel
  const handleCancel = () => {
    setIsEdit(true);
  };

  // Handle Update
  const handleUpdate = () => {
    setIsEdit(true);

    toast.promise(
      dispatch(updateFees({ fees, className })).unwrap(), // Your async action
      {
        pending: "Updating fees...",
        success: `Class ${className} fee structure updated successfully!`,
        error: "Failed to update fees. Please try again.",
      }
    );
  };

  // Handle Exam & Admission Fee Available
  const handleExamFeeAvailable = () => {
    setIsAvailable(false);
  };

  // Cancel Exam & Admission Fee Available
  const handleCancelAdmission = () => {
    setIsAvailable(true);
  };

  const handleExamAdmissionUpdate = () => {
    const data = { admissionFeeMonth, examFeeMonth, libraryFeeMonth };

    try {
      setIsAvailable(true);
      toast.promise(
        dispatch(updateExamAdmFeeMonth(data)).unwrap(),
        {
          pending: "Updating Month...",
          success: "Month updated successfully!",
          error: "Failed to update fees. Please try again.",
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  // SIDE EFFECTS OF THIS COMPONENT
  useEffect(() => {
    dispatch(fetchFees());
  }, []);

  useEffect(() => {
    if (className === "") {
      setFees({
        admissionFee: 0,
        tuitionFee: 0,
        examFee: 0,
        lateFee: 0,
        libraryFee: 0,
      });
      return; // Exit the effect early
    }

    if (fee && fee.classWise) {
      const classData = fee.classWise.find((data) => data.className === className);

      if (classData) {
        setFees((prevFees) => ({
          ...prevFees,
          admissionFee: classData?.admissionFee || 0,
          tuitionFee: classData?.tuitionFee || 0,
          examFee: classData?.examFee || 0,
          lateFee: classData?.lateFee || 0,
          libraryFee: classData?.libraryFee || 0,
        }));
      }
    }
  }, [className, fee]);

  useEffect(() => {
    if (fee) {
      setAdmissionFeeMonth(fee?.monthSet?.admissionFeeMonth || []);
      setExamFeeMonth(fee?.monthSet?.examFeeMonth || []);
      setLibraryFeeMonth(fee?.monthSet?.libraryFeeMonth || []);
    }
  }, [fee, className]);

  return (
    <div className="dashboard-wrapper feeSettings">
      <div className="dashboard-right">
        <h2 className="dashboard-heading fee-settings">FEE SETTINGS</h2>

        <div className="fee-wrapper">
          <div className="fee-container-left">
            <div className="switch-class">
              <label className="fee-label class" htmlFor="class">Class:</label>
              <select onChange={handleClassName} id="class">
                <option className="class-options" value="">Select</option>
                {['Nursary','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'].map((data, index) => (
                  <option className="class-options" key={index} value={data}>{data}</option>
                ))}
              </select>
            </div>
            {/* Render fee input fields dynamically */}
            {Object.keys(fees).map((feeKey) => (
              <div className="fee-menus" key={feeKey}>
                <label className="fee-label" htmlFor={feeKey}>
                  {feeKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} :
                </label>
                <input
                  className={`fee-value ${!isEdit ? 'fee-input-active' : ''}`}
                  onChange={handleFeeChange}
                  value={fees[feeKey]}
                  type="number"
                  id={feeKey}
                  readOnly={isEdit}
                />
              </div>
            ))}

            <div className="update-btn">
              {isEdit && (
                <button className="fee-update" onClick={handleEdit}>Edit</button>
              )}
              <div className="update-btn-btn">
                {!isEdit && (
                  <div className="update-btn-btn">
                    <button className="fee-update" onClick={handleUpdate}>Update</button>
                    <button className="fee-update" onClick={handleCancel}>Cancel</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="fee-container-right">
            {/* Admission Fee Collection Months */}
            <div className="right-fee-wrapper">
              <div className="fee-collect">
                <label className="fee-label" htmlFor="fee-label">
                  Admission Fee
                </label>
                <ul>
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((monthName) => (
                    <li key={monthName}>
                      {monthName}
                      <input
                        className="checkbox-fee"
                        type="checkbox"
                        value={monthName}
                        onChange={handleAdmissionFeeMonth}
                        checked={admissionFeeMonth?.includes(monthName)}
                        disabled={isAvailable}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Exam Fee Collection Months */}
            <div className="right-fee-wrapper">
              <div className="fee-collect">
                <label className="fee-label" htmlFor="fee-label">
                  Exam Fee
                </label>
                <ul>
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((monthName) => (
                    <li key={monthName}>
                      {monthName}
                      <input
                        className="checkbox-fee"
                        type="checkbox"
                        value={monthName}
                        onChange={handleExamFeeMonth}
                        checked={examFeeMonth?.includes(monthName)}
                        disabled={isAvailable}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Library Fee Collection Months */}
            <div className="right-fee-wrapper">
              <div className="fee-collect">
                <label className="fee-label" htmlFor="fee-label">
                  Library Fee
                </label>
                <ul>
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((monthName) => (
                    <li key={monthName}>
                      {monthName}
                      <input
                        className="checkbox-fee"
                        type="checkbox"
                        value={monthName}
                        onChange={handleLibraryFeeMonth}
                        checked={libraryFeeMonth?.includes(monthName)}
                        disabled={isAvailable}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="update-btn">
              {isAvailable && (
                <button className="fee-update" onClick={handleExamFeeAvailable}>
                  Edit
                </button>
              )}
              {!isAvailable && (
                <div className="update-btn-btn">
                  <button className="fee-update" onClick={handleExamAdmissionUpdate}>Update</button>
                  <button className="fee-update" onClick={handleCancelAdmission}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeSettings;
