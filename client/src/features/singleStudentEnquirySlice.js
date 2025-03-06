import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

const initialState = {
  loading: false,
  status: null,
  studentData: {},
  error: null,
  message: null,
};


// <<<<<<========== CREATE STUDENT ENQUIRY ==========>>>>>>>>>>
const createSingleStudentEnquiryInfo = createAsyncThunk(
  "student/createSingleStudentEnquiryInfo",
  async (formData, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${baseUrl}/api/v1/student-create`,formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


// <<<<<<========== FETCH SINGLE STUDENT ENQUIRY ==========>>>>>>>>>>
const fetchSingleStudentEnquiryInfo = createAsyncThunk(
  "student/fetchSingleStudentEnquiryInfo",
  async (id, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/student-enquiry/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


// <<<<<<========== Update STUDENT ENQUIRY ==========>>>>>>>>>>
const updateSingleStudentEnquiryInfo = createAsyncThunk(
  "student/updateSingleStudentEnquiryInfo",
  async ({studentId,editableStudent}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.patch(`${baseUrl}/api/v1/student-enq/${studentId}`,editableStudent, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


// <<<<<<========== DELETE STUDENT ENQUIRY ==========>>>>>>>>>>
const deleteSingleStudentEnquiryInfo = createAsyncThunk(
  "student/deleteSingleStudentEnquiryInfo",
  async ({studentId}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/student-enq/${studentId}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const singleStudentEnquirySlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    // Reset student data
    resetStudentData: (state) => {
      state.studentData = {};
      state.status = null;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleStudentEnquiryInfo.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchSingleStudentEnquiryInfo.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.studentData = action.payload.student;
        state.error = null;
      })
      .addCase(fetchSingleStudentEnquiryInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
        toast.error(action.payload.message)
      })



// <<<<<<========== CREATE STUDENT ENQUIRY ==========>>>>>>>>>>
      .addCase(createSingleStudentEnquiryInfo.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createSingleStudentEnquiryInfo.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
        toast.success(action.payload.message)
        
      })
      .addCase(createSingleStudentEnquiryInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
        toast.error(action.payload.message)
      })

// <<<<<<========== Update STUDENT ENQUIRY ==========>>>>>>>>>>
.addCase(updateSingleStudentEnquiryInfo.pending, (state) => {
  state.status = "pending";
  state.loading = true;
  state.error = null;
  state.message = null;
})
.addCase(updateSingleStudentEnquiryInfo.fulfilled, (state, action) => {
  state.status = "fulfilled";
  state.loading = false;
  state.message = action.payload.message;
  state.error = null;
  toast.success(action.payload.message)
  
})
.addCase(updateSingleStudentEnquiryInfo.rejected, (state, action) => {
  state.status = "rejected";
  state.loading = false;
  state.error = action.payload;
  state.message = action.payload.message;
  toast.error(action.payload.message)
})

// <<<<<<========== DELETE STUDENT ENQUIRY ==========>>>>>>>>>>
.addCase(deleteSingleStudentEnquiryInfo.pending, (state) => {
  state.status = "pending";
  state.loading = true;
  state.error = null;
  state.message = null;
})
.addCase(deleteSingleStudentEnquiryInfo.fulfilled, (state, action) => {
  state.status = "fulfilled";
  state.loading = false;
  state.message = action.payload.message;
  state.error = null;
  toast.success(action.payload.message)
  
})
.addCase(deleteSingleStudentEnquiryInfo.rejected, (state, action) => {
  state.status = "rejected";
  state.loading = false;
  state.error = action.payload;
  state.message = action.payload.message;
  toast.error(action.payload.message)
})
  },
});

export const { resetStudentData } = singleStudentEnquirySlice.actions;
export default singleStudentEnquirySlice.reducer;
export { fetchSingleStudentEnquiryInfo,createSingleStudentEnquiryInfo,updateSingleStudentEnquiryInfo,deleteSingleStudentEnquiryInfo };
