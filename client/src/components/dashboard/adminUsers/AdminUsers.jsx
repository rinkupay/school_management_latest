import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import "./AdminUsers.css";
import toast from 'react-hot-toast';
import {deleteAdmin} from "../../../features/userSlice";
import {useDispatch} from "react-redux"
import ConfirmDialog from "../../confirmDialog/ConfirmDialog";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState({}); // Store roles for each user

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null); // To store the id of the user to be deleted

  const handleDeleteUser = async (id) => {
    if (id) {
      await dispatch(deleteAdmin(id)); // Delete user with the given id
      handleFetchUsers(); // Refresh user list after deletion
    }
  };

  const handleDeletePupUp = (id) => {
    setUserIdToDelete(id); // Store the id of the user to be deleted
    setIsDeleteOpen(true); // Open the confirmation dialog
  };

  const handleCloseDialog = () => {
    setIsDeleteOpen(false); // Close the confirmation dialog
  };

  const handleConfirmDelete = () => {
    handleDeleteUser(userIdToDelete); // Pass the id of the user to delete
    setIsDeleteOpen(false); // Close the dialog after confirming
  };

  // Fetch users
  const handleFetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/getAllUsers`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
        // Initialize roles state with existing roles
        const initialRoles = data.users.reduce((acc, user) => {
          acc[user._id] = user.role || "";
          return acc;
        }, {});
        setRoles(initialRoles);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  // Handle role change
  const handleRoleChange = (e, userId) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: e.target.value,
    }));
  };

  // Handle role update API call
  const handleUpdateRole = async (userId) => {
    try {
      const updatedRole = roles[userId]; // Get selected role

      if (!updatedRole) {
        alert("Please select a role before updating.");
        return;
      }

      const response = await fetch(`${baseUrl}/api/v1/updateUserRole/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: updatedRole }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Role updated successfully!");
        handleFetchUsers(); // Refresh users after update
      } else {
        toast.error("Failed to update role. Try again.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("An error occurred while updating the role.");
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* CONFIRM DIALOG FOR USER DELETE */}
      <ConfirmDialog
        open={isDeleteOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        message={"Are you sure to delete?"}
        actionMessage={"Delete"}
      />
      <div className="dashboard-right">
        <h2 className="dashboard-heading">All Admins</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="admin-table-body">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.userName}</td>
                  <td>{user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "N/A"}</td>
                  <td>{user.mobile}</td>
                  <td className="select-row">
                    <select
                      name="role"
                      className="role-select"
                      value={roles[user._id] || ""}
                      onChange={(e) => handleRoleChange(e, user._id)}
                    >
                      <option value="">Select</option>
                      <option value="user">Pending</option>
                      <option value="admin">Admin</option>
                      <option value="super">Super</option>
                    </select>
                    <button
                      className="role-update"
                      onClick={() => handleUpdateRole(user._id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="role-update delete"
                      onClick={() => handleDeletePupUp(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <h3>No data found</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
