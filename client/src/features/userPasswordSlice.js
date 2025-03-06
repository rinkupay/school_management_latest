import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: false,
  status: null,
  errorMessage: null,
  message: null,
};

const updateUserPassword = createAsyncThunk(
  "password/updateUserPassword",
  async (formData, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.put(`${baseUrl}/api/v1/password-update`,formData, {
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

const userPasswordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    resetState: (state) => {
        return initialState;  // Reset the state to initialState
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserPassword.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.errorMessage = null;
        state.message = null;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.errorMessage = null;
        state.message = "Passord changed successfully";
       
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.errorMessage = action.payload;
        state.message = action.payload.message;
       
      });
  },
});

export const { resetState } = userPasswordSlice.actions;
export default userPasswordSlice.reducer;
export { updateUserPassword };
