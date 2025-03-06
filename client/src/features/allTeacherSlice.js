import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  teachers: [],
  totalTeachers: 0,
  maleTeacher: 0,
  femaleTeacher: 0,
  error: null,
  message: null,
};

// <<<<<<<<<<<<<<============== GET ALL TEACHERS ====================>

const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async ({gender,role}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/teachers`, {
        params: { gender, role },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // <<<<========= GET ALL STUDENTS ========>>>>>>>>>
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.teachers = action.payload.teachers;
        state.totalTeachers = action.payload.teacherCounts;
        state.maleTeacher = action.payload.maleTeacherCounts;
        state.femaleTeacher = action.payload.femaleTeacherCounts;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload?.message;
      });
  },
});

export default teacherSlice.reducer;
export { fetchTeachers };
