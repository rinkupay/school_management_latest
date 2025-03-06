import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


const initialState = {
  loading: false,
  status: null,
  students: [],
  totalStudents: 0,
  maleStudents: 0,
  femaleStudents: 0,
  error: null,
  message: null,
};

// <<<<<<<<<<<<<<============== GET ALL STUDENTS ====================>

const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async ({ std, section, isActive }, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/students`, {
        params: { std, section, isActive },
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

// DELETE A STUDENT
const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/student/${id}`, {
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

// UPDATE STUDENT SECTION
const updateStudentSection = createAsyncThunk(
  "student/updateStudentSection",
  async ({ id, sectionData }, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.patch(
        `${baseUrl}/api/v1/student-section-update/${id}`,
        { section: sectionData }, // Send `sectionData` in the request body
        { withCredentials: true }  // Correctly placed options
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // <<<<========= GET ALL STUDENTS ========>>>>>>>>>
      .addCase(fetchStudents.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.students = action.payload.students;
        state.totalStudents = action.payload.totalStudents;
        state.maleStudents = action.payload.maleStudents;
        state.femaleStudents = action.payload.femaleStudents;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })

      // <<<<========= DELETE A STUDENT ========>>>>>>>>>
      .addCase(deleteStudent.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.students = action.payload.students;

        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })

      // <<<<========= UPDATE STUDENT SECTION ========>>>>>>>>>
      .addCase(updateStudentSection.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateStudentSection.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.error = null;
        state.message = null;
        toast.success(action.payload.message);
      })
      .addCase(updateStudentSection.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = null;
        toast.error(action.payload.message);
      });
  },
});

export default studentSlice.reducer;
export { fetchStudents, deleteStudent, updateStudentSection };
