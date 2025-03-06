import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';


const initialState = {
  loading: false,
  status: null,
  errorMessage: null,
  message: null,
};

const resetUserPassword = createAsyncThunk(
  "password/resetUserPassword",
  async (formData, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${baseUrl}/api/v1/reset-password`,formData, {
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


const userPasswordChange = createAsyncThunk(
  "password/userPasswordChange",
  async ({formData,token}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.put(`${baseUrl}/api/v1/new-password/${token}`,formData, {
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

const userPasswordResetSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    resetState: (state) => {
        return initialState;  // Reset the state to initialState
      },
  },
  extraReducers: (builder) => {
    builder

    // RESET PASSWORD
      .addCase(resetUserPassword.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.errorMessage = null;
        state.message = null;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.errorMessage = null;
        state.message = action.payload.message;
       
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.errorMessage = "Email not found";
        state.message = "";
       
      })

      
    // CHANGE PASSWORD
    .addCase(userPasswordChange.pending, (state) => {
      state.status = "pending";
      state.loading = true;
      state.errorMessage = null;
      state.message = null;
    })
    .addCase(userPasswordChange.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.loading = false;
      state.errorMessage = null;
      state.message = "Password changed successfully";
      toast.success(action.payload.message);
     
    })
    .addCase(userPasswordChange.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
      state.errorMessage = "Reset Password Token is invalid or has been expired";
      state.message = "";
     
    });
  },
});

export const { resetState } = userPasswordResetSlice.actions;
export default userPasswordResetSlice.reducer;
export { resetUserPassword,userPasswordChange };
