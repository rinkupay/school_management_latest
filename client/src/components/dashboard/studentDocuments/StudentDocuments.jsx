import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentDocuments.css";
import "../Dashboard.css";
import NavButton from "../navbutton/NavButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDocument } from "../../../features/studentDocumentSlice";
import Loader from "../../loader/Loader"

// Reusable DocumentRow Component
const DocumentRow = ({ label, name, documentPreview, documentUrl, handleFileChange, openModal }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
        />
      </td>
      <td>
        {(documentPreview || documentUrl) && (
          <img
            src={documentPreview || documentUrl}
            alt={`${label} Preview`}
            className="document-preview-d"
            onClick={() => openModal(documentPreview || documentUrl)} // Open modal on image click
          />
        )}
      </td>
    </tr>
  );
};

const StudentDocuments = () => {
  const { id } = useParams();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  

  const { studentDocument,loading } = useSelector((state) => state.studentDocument);

  const [documents, setDocuments] = useState({
    aadhar: null,
    tc: null,
    cc: null,
    rc: null,
  });

  const [documentPreviews, setDocumentPreviews] = useState({
    aadhar: null,
    tc: null,
    cc: null,
    rc: null,
  });

 
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Modal state for image preview
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Fetch documents on load
  useEffect(() => {
    dispatch(fetchStudentDocument(id));
  }, [dispatch, id]);

  // Set document previews after fetching
  useEffect(() => {
    if (studentDocument) {
      setDocumentPreviews({
        aadhar: `${baseURL}/${studentDocument.aadhar}`,
        tc: `${baseURL}/${studentDocument.tc}`,
        cc: `${baseURL}/${studentDocument.cc}`,
        rc: `${baseURL}/${studentDocument.rc}`,
      });
    }
  }, [studentDocument]);

  // UTILITY FUNCTION TO CHECK FILE SIZE
  const checkFileSize = (file,message) => {
    const maxFileSize = 200 * 1024 ; // 200KB
    if (file.size > maxFileSize) {
      setError(`${message} should be less than 200KB.`);
      return false;
    }
    return true;
  }

  // Handle file changes for Aadhar upload
  const handleAadharChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    const message = "Aadhar Card";
    if (!checkFileSize(file,message)) return;
    
   
    setDocuments((prev) => ({ ...prev, aadhar: file }));

    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreviews((prev) => ({ ...prev, aadhar: reader.result }));
      };
      reader.readAsDataURL(file);
    }

    try {
    
      setError(null);
      setMessage(null);

      const formData = new FormData();
      formData.append("aadhar", file);

      axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Aadhar Card uploaded successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }  

  };

  // Handle file changes for TC upload
  const handleTcChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    const message = "TC";
    if (!checkFileSize(file,message)) return;
    setDocuments((prev) => ({ ...prev, tc: file }));

    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreviews((prev) => ({ ...prev, tc: reader.result }));
      };
      reader.readAsDataURL(file);
    }

    try {
    
      setError(null);
      setMessage(null);

      const formData = new FormData();
      formData.append("tc", file);

      axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("TC uploaded successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }  
    
  };

  // Handle file changes for CC upload
  const handleCcChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    const message = "CC";
    if (!checkFileSize(file,message)) return;
    setDocuments((prev) => ({ ...prev, cc: file }));

    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreviews((prev) => ({ ...prev, cc: reader.result }));
      };
      reader.readAsDataURL(file);
    }
    try {
     
      setError(null);
      setMessage(null);

      const formData = new FormData();
      formData.append("cc", file);

      axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("CC uploaded successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } 
  };

  // Handle file changes for RC upload
  const handleRcChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    const message = "RC";
    if (!checkFileSize(file,message)) return;
    setDocuments((prev) => ({ ...prev, rc: file }));

    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreviews((prev) => ({ ...prev, rc: reader.result }));
      };
      reader.readAsDataURL(file);
    }
    try {
   
      setError(null);
      setMessage(null);

      const formData = new FormData();
      formData.append("rc", file);

      axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("RC uploaded successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }  
    
  };


 

  // Function to open the modal
  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="dashboard-wrapper">
{loading && <Loader />}
      <div className="dashboard-right">
        <h2 className="dashboard-heading">DOCUMENTS</h2>
        <NavButton id={id} />

        <div>
          {/* Display success or error message */}
          {error && <div className="error-d">{error}</div>}
          {message && <div className="success-d">{message}</div>}

          <form >
            <table className="document-table-d">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Upload</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                <DocumentRow
                  label="Aadhar Card"
                  name="aadhar"
                  documentPreview={documentPreviews.aadhar}
                  documentUrl={`${baseURL}/${studentDocument.aadhar}`}
                  handleFileChange={handleAadharChange}  // Pass individual handler
                  openModal={openModal}
                />
                <DocumentRow
                  label="Transfer Certificate (TC)"
                  name="tc"
                  documentPreview={documentPreviews.tc}
                  documentUrl={`${baseURL}/${studentDocument.tc}`}
                  handleFileChange={handleTcChange}  // Pass individual handler
                  openModal={openModal}
                />
                <DocumentRow
                  label="Character Certificate (CC)"
                  name="cc"
                  documentPreview={documentPreviews.cc}
                  documentUrl={`${baseURL}/${studentDocument.cc}`}
                  handleFileChange={handleCcChange}  // Pass individual handler
                  openModal={openModal}
                />
                <DocumentRow
                  label="Residential Certificate (RC)"
                  name="rc"
                  documentPreview={documentPreviews.rc}
                  documentUrl={`${baseURL}/${studentDocument.rc}`}
                  handleFileChange={handleRcChange}  // Pass individual handler
                  openModal={openModal}
                />
              </tbody>
            </table>

            {/* <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload Documents"}
            </button> */}
          </form>
        </div>
      </div>

      {/* Modal for image preview */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>X</span>
            <img src={modalImage} alt="Modal Preview" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDocuments;
