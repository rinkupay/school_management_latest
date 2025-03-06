import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  student: {},
  
  error: null,
  message: null,
};

const fetchStudentDetail = createAsyncThunk(
  "student/fetchStudentDetail",
  async (id, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/student/${id}`,{withCredentials:true});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const studentDetailSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDetail.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchStudentDetail.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.student = action.payload;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchStudentDetail.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      });
  },
});

export default studentDetailSlice.reducer;
export { fetchStudentDetail };
