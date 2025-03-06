import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

const initialState = {
  loading: false,
  status: null,
  teacher: {},
  error: null,
  message: null,
};

// <<<<<<<<<<<<<<============== REGISTER TEACHER ====================>

const registerTeacher = createAsyncThunk(
  "teacher/registerTeacher",
  async (formData, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${baseUrl}/api/v1/teacher-register`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


// <<<<<<<<<<<<<<============== DELETE TEACHER ====================>
  const deleteTeacher = createAsyncThunk(
    "teacher/deleteTeacher",
    async ({teacherId}, { rejectWithValue }) => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.delete(`${baseUrl}/api/v1/teacher/${teacherId}`, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

// <<<<<<<<<<<<<<============== UPDATE TEACHER IMAGE ====================>

  const updateTeacherImage = createAsyncThunk(
    "teacher/updateTeacherImage",
    async ({ formData, id }, { rejectWithValue }) => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.post(`${baseUrl}/api/v1/teacher-pic-update/${id}`, formData, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

// <<<<<<<<<<<<<<============== UPDATE TEACHER ====================>

const updateTeacher = createAsyncThunk(
  "teacher/updateTeacher",
  async ({ formData, id }, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.put(`${baseUrl}/api/v1/teacher/${id}`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


// <<<<<<<<<<<<<<============== UPDATE TEACHER STATUS ====================>

  const updateTeacherStatus = createAsyncThunk(
    "teacher/updateTeacherStatus",
    async ({ id,status }, { rejectWithValue }) => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.patch(`${baseUrl}/api/v1/teacher-status-update/${id}`,{status}, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

const teacherRegistrationSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    resetState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // <<<<========= REGISTER TEACHER ========>>>>>>>>>

      .addCase(registerTeacher.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.teacher = action.payload;
        state.error = null;
        state.message = action.payload.message;
        toast.success(action.payload.message); // Toast notification
      })
      .addCase(registerTeacher.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
        toast.success(action.payload.message); // Toast notification
      })

      // <<<======== UPDATE TEACHER =========>>>>>>>>>>>>>
      .addCase(updateTeacher.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        // state.teacher = action.payload;
        state.error = null;
        state.message = action.payload.message;
        toast.success(action.payload.message); // Toast notification
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message)
        state.message = action.payload.message;

      })



      // <<<======== UPDATE TEACHER =========>>>>>>>>>>>>>
      .addCase(updateTeacherImage.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateTeacherImage.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        // state.teacher = action.payload;
        state.error = null;
        // state.message = action.payload.message;
        toast.success(action.payload.message); // Toast notification
      })
      .addCase(updateTeacherImage.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message)
        state.message = action.payload.message;

      })



      
      // <<<======== DELETE TEACHER =========>>>>>>>>>>>>>
      .addCase(deleteTeacher.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        // state.teacher = action.payload;
        state.error = null;
        state.message = action.payload.message;
        toast.success(action.payload.message); // Toast notification
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message)
        state.message = action.payload.message;

      })


      // <<<<<<<<<<<<<<============== UPDATE TEACHER STATUS ====================>
        .addCase(updateTeacherStatus.pending, (state) => {
          state.status = "pending";
          state.loading = true;
          state.error = null;
          state.message = null;
        })
        .addCase(updateTeacherStatus.fulfilled, (state, action) => {
          state.status = "fulfilled";
          state.loading = false;
          // state.teacher = action.payload;
          state.error = null;
          state.message = action.payload.message;
          toast.success(action.payload.message); // Toast notification
        })
        .addCase(updateTeacherStatus.rejected, (state, action) => {
          state.status = "rejected";
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload.message)
          state.message = action.payload.message;
  
        })


  }
});

export const { resetState } = teacherRegistrationSlice.actions;
export default teacherRegistrationSlice.reducer;
export { registerTeacher, updateTeacher,updateTeacherImage,deleteTeacher,updateTeacherStatus };
