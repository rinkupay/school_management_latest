import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  totalAmount: 0,
  paymentsCount: 0,
  error: null,
  message: null,
};

const fetchTotalAmount = createAsyncThunk(
  "amount/fetchTotalAmount",
  async ({ currentMonth, startDate = "", endDate = "" }, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    try {
      let url = `${baseUrl}/api/v1/total-amount/${currentMonth}`;

      // Append query parameters dynamically
      const queryParams = [];
      if (startDate) queryParams.push(`startDate=${startDate}`);
      if (endDate) queryParams.push(`endDate=${endDate}`);
      if (queryParams.length) url += `?${queryParams.join("&")}`;

      const response = await axios.get(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);





const fetchTotalAmountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalAmount.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTotalAmount.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.totalAmount = action.payload.totalAmount;
        state.paymentsCount = action.payload.paymentsCount;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchTotalAmount.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.totalAmount = 0; // Reset to 0 on error
        state.paymentsCount = 0; // Reset to 0 on error
        state.error = action.payload || "Something went wrong";
        state.message = action.payload?.message || "Failed to fetch data";
      });
  },
});

export default fetchTotalAmountSlice.reducer;
export { fetchTotalAmount };
