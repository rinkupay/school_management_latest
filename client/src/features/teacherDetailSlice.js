import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  teacher: {},
  error: null,
  message: null,
};

const fetchTeacherDetail = createAsyncThunk(
  "teacher/fetchTeacherDetail",
  async (id, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/teacher/${id}`,{withCredentials:true});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const teacherDetailSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherDetail.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTeacherDetail.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.teacher = action.payload;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchTeacherDetail.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      });
  },
});

export default teacherDetailSlice.reducer;
export { fetchTeacherDetail };
