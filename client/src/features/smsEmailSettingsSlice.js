import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

// API Base URL (Configure in .env for production)
const API_URL = "/api/v1/email-sms-settings"; // Ensure leading `/`
const baseUrl = import.meta.env.VITE_BASE_URL;

// Helper function for API calls
const fetchData = async (url, method = "GET", data = null) => {
  try {
    const response = await axios({ method, url, data,  withCredentials:true });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "Something went wrong";
  }
};

// Async Thunks
export const fetchEmailSmsSettings = createAsyncThunk(
  "settings/fetchEmailSmsSettings",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchData(`${baseUrl}${API_URL}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateEmailSmsSettings = createAsyncThunk(
  "settings/updateEmailSmsSettings",
  async (settings, { rejectWithValue }) => {
    try {
      return await fetchData(`${baseUrl}${API_URL}`, "PUT", settings);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Redux Slice
const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    emailNotifications: true,
    smsNotifications: true,
    message:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailSmsSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmailSmsSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.emailNotifications = action.payload.emailNotifications;
        state.smsNotifications = action.payload.smsNotifications;
      })
      .addCase(fetchEmailSmsSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmailSmsSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmailSmsSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.emailNotifications = action.payload.emailNotifications;
        state.smsNotifications = action.payload.smsNotifications;
        toast.success(action.payload.message);
        
      })
      .addCase(updateEmailSmsSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default settingsSlice.reducer;
