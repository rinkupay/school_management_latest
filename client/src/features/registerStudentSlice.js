import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

const initialState = {
  loading: false,
  status: null,
  student: {},
  error: null,
  message: null,
};

// <<<<<<<<<<<<<<============== REGISTER STUDENTS ====================>

const registerStudent = createAsyncThunk(
  "student/registerStudent",
  async (formData, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${baseUrl}/api/v1/new/student`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// <<<<<<<<<<<<<<============== UPDATE STUDENTS ====================>

const updaterStudent = createAsyncThunk(
  "student/updaterStudent",
  async ({ formData, id }, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.put(`${baseUrl}/api/v1/student-update/${id}`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


// <<<<<<<<<<<<<<============== UPDATE STUDENTS EMAIL & SMS NOTIFICATION ====================>

  const updateStudentNotification = createAsyncThunk(
    "student/updateStudentNotification",
    async ({ id,formData }, { rejectWithValue }) => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.patch(`${baseUrl}/api/v1/student-update/${id}`, formData, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

const studentRegisterSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // <<<<========= REGISTER STUDENT ========>>>>>>>>>

      .addCase(registerStudent.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.student = action.payload.student;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })

      // <<<======== UPDATE STUDENT =========>>>>>>>>>>>>>
      .addCase(updaterStudent.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updaterStudent.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.student = action.payload.student;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updaterStudent.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })

       // <<<======== UPDATE STUDENT NOTIFICATION SMS & EMAIL =========>>>>>>>>>>>>>
       .addCase(updateStudentNotification.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateStudentNotification.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        toast.success(action.payload.message || "Notification updated successfully");
      })
      .addCase(updateStudentNotification.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
        toast.error(action.payload.message || "Someting went wrong");
      });
  }
});

export const { resetState } = studentRegisterSlice.actions;
export default studentRegisterSlice.reducer;
export { registerStudent, updaterStudent,updateStudentNotification };
