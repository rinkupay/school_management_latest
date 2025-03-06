import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  dueStudents: [],
  error: null,
  message: null,
};

// Async thunk to fetch student due report
const fetchStudentDueReport = createAsyncThunk(
  "amount/fetchStudentDueReport",
  async ({ selectedClass, selectedSection }, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/due-reports`, {
        params: { std: selectedClass, section: selectedSection }, // ✅ FIXED PARAMS
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

// Redux slice
const fetchStudentDueSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDueReport.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchStudentDueReport.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.dueStudents = action.payload.allDues;
        state.error = null;
        state.message = action.payload.message || "Data fetched successfully";
      })
      .addCase(fetchStudentDueReport.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.message = action.payload || "An error occurred"; // ✅ FIXED ERROR HANDLING
      });
  },
});

export default fetchStudentDueSlice.reducer;
export { fetchStudentDueReport };
