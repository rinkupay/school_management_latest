import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  payment: {},
  error: null,
  message: null,
};

const teacherPayment = createAsyncThunk(
  "payment/teacherPayment",
  async ({id,formData}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${baseUrl}/api/v1/teacher-pay/${id}`,formData, {
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









const teacherPaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(teacherPayment.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(teacherPayment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.payment = action.payload;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(teacherPayment.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })


  },
});

export const { resetStatus } = teacherPaymentSlice.actions;
export default teacherPaymentSlice.reducer;
export { teacherPayment };
