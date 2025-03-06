import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BASE_URL;

// ✅ Load adminDetails from localStorage for persistence
const storedAdmin = JSON.parse(localStorage.getItem("adminDetails"));

const initialState = {
  loading: false,
  status: null,
  adminDetails: storedAdmin || null,
  isLoggedIn: !!storedAdmin,
  error: null,
  message: null,
};

// <<<============== LOGIN ADMIN ===========>>>>
const loginAdmin = createAsyncThunk("admin/loginAdmin", async (adminData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/login`, adminData, { withCredentials: true });
    localStorage.setItem("adminDetails", JSON.stringify(response.data)); // ✅ Persist admin
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

// <<<============== LOAD ADMIN ===========>>>>
const loadAdmin = createAsyncThunk("admin/loadAdmin", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    localStorage.removeItem("adminDetails"); // ✅ Clear storage on failure
    return rejectWithValue(error.response?.data || "Failed to load admin");
  }
});

// <<<============== LOGOUT ADMIN ===========>>>>
const logoutAdmin = createAsyncThunk("admin/logoutAdmin", async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${baseUrl}/api/v1/logout`, {}, { withCredentials: true });
    localStorage.removeItem("adminDetails"); // ✅ Clear admin from localStorage
    return null; // ✅ Ensure adminDetails resets
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
    return rejectWithValue(error.response?.data || "Logout failed");
  }
});

// <<<============== DELETE ADMIN ===========>>>>
const deleteAdmin = createAsyncThunk("admin/deleteAdmin", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/v1/user-delete/${id}`, { withCredentials: true });
    toast.success(response.data.message || "User deleted successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Server error");
    return rejectWithValue(error.response?.data || "Delete failed");
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.adminDetails = null;
      state.isLoggedIn = false;
      state.status = null;
      state.error = null;
      localStorage.removeItem("adminDetails"); // ✅ Clear user from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ LOGIN ADMIN
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.status = "pending";
        state.error = null;
        state.message = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "fulfilled";
        state.adminDetails = action.payload;
        state.isLoggedIn = true;
        state.message = action.payload?.message || "Login successful";
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload?.message || "Login failed";
      })

      // ✅ LOAD ADMIN
      .addCase(loadAdmin.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(loadAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "fulfilled";
        state.adminDetails = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loadAdmin.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.adminDetails = null;
        state.isLoggedIn = false;
        state.error = action.payload?.message || "Failed to load admin";
      })

      // ✅ LOGOUT ADMIN
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.status = "fulfilled";
        state.adminDetails = null;
        state.isLoggedIn = false;
        toast.success("Logout successful"); // ✅ Fixed toast message
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload?.message || "Logout failed";
      })

      // ✅ DELETE ADMIN
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "fulfilled";
        state.message = action.payload?.message || "User deleted successfully";
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
export { loginAdmin, loadAdmin, logoutAdmin, deleteAdmin };
