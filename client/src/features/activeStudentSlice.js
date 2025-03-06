import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  students: [],
  totalStudents: 0,
  maleStudents:0,
  femaleStudents:0,
  error: null,
  message: null,
};

// <<<<<<<<<<<<<<============== GET ACTIVE STUDENTS ====================>

  const fetchActiveStudents = createAsyncThunk(
    "students/fetchActiveStudents",
    async ({ std, section,isActive }, { rejectWithValue }) => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.get(`${baseUrl}/api/v1/students-active`, {
          params: { std, section ,isActive},
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
  

const activeStudentSlice = createSlice({
  name: "active-student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // <<<<========= GET ALL STUDENTS ========>>>>>>>>>
      .addCase(fetchActiveStudents.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchActiveStudents.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.students = action.payload.students;
        state.totalStudents = action.payload.totalStudents;
        state.maleStudents = action.payload.maleStudents;
        state.femaleStudents = action.payload.femaleStudents;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchActiveStudents.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      });
  },
});

export default activeStudentSlice.reducer;
export { fetchActiveStudents };
