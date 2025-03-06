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

const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${baseUrl}/api/v1/register`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// <<<<<<<<<<<<<<============== UPDATE STUDENTS ====================>

const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ formData, id }, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.put(`${baseUrl}/api/v1//profile-update/${id}`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const userRegisterSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // <<<<========= REGISTER STUDENT ========>>>>>>>>>

      .addCase(registerUser.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.student = action.payload.student;
        state.error = null;
        state.message = action.payload.message;
        toast.success(action.payload.message); // Toast notification
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
        toast.success(action.payload.message); // Toast notification
      })

      // <<<======== UPDATE STUDENT =========>>>>>>>>>>>>>
      .addCase(updateUser.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.student = action.payload.student;
        state.error = null;
        state.message = action.payload.message;
        toast.success(action.payload.message); // Toast notification
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      });
  }
});

export const { resetState } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
export { registerUser, updateUser };
