import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  transactions: [],
  transactionCount: 0,
  error: null,
  message: null,
};

const fetchTeacherAllTransaction = createAsyncThunk(
  "transaction/fetchTeacherTransaction",
  async (_, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/teachers-pay-history`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data && error.response.data.message
          ? { message: error.response.data.message }
          : { message: "An unknown error occurred" }
      );
    }
  }
);

const teacherAllTransactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherAllTransaction.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTeacherAllTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.transactions = action.payload.payments || [];
        // Uncomment if transactionCount is included in response
        // state.transactionCount = action.payload.paymentCounts || 0;
        state.error = null;
        state.message = "Transactions fetched successfully";
      })
      .addCase(fetchTeacherAllTransaction.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload.message || "Failed to fetch transactions";
        state.message = action.payload.message || "Failed to fetch transactions";
      });
  },
});

export default teacherAllTransactionSlice.reducer;
export { fetchTeacherAllTransaction };
