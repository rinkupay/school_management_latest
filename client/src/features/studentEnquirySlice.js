import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  students: [],
  
  error: null,
  message: null,
};

const fetchStudentEnquiryInfo = createAsyncThunk(
  "student/fetchStudentEnquiryInfo",
  async (_, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/student-enquiry`,{withCredentials:true});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const studentEnquirySlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentEnquiryInfo.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchStudentEnquiryInfo.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.students = action.payload.students;
        state.error = null;
  
      })
      .addCase(fetchStudentEnquiryInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      });
  },
});

export default studentEnquirySlice.reducer;
export { fetchStudentEnquiryInfo };
