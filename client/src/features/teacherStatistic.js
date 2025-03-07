import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  teacherTotalAmount: 0,
  teacherPaymentsCount: 0,
  error: null,
  message: null,
};

const fetchTeacherTotalAmount = createAsyncThunk(
  "amount/fetchTeacherTotalAmount",
  async ({ currentMonth, startDate = "", endDate = "" }, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    try {
      let url = `${baseUrl}/api/v1/teacher-amount`;

      // Append query parameters dynamically
      const queryParams = [];
      if (currentMonth && currentMonth !== "undefined") queryParams.push(`currentMonth=${currentMonth}`);
      if (startDate) queryParams.push(`startDate=${startDate}`);
      if (endDate) queryParams.push(`endDate=${endDate}`);

      if (queryParams.length) url += `?${queryParams.join("&")}`;

    

      const response = await axios.get(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message); // Debugging
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const fetchTeacherTotalAmountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherTotalAmount.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTeacherTotalAmount.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.teacherTotalAmount = action.payload.totalAmount || 0;
        state.teacherPaymentsCount = action.payload.paymentsCount || 0;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchTeacherTotalAmount.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.teacherTotalAmount = 0;
        state.teacherPaymentsCount = 0; // Reset to 0 on error
        state.error = action.payload || "Something went wrong";
        state.message = action.payload?.message || "Failed to fetch data";
      });
  },
});

export default fetchTeacherTotalAmountSlice.reducer;
export { fetchTeacherTotalAmount };
