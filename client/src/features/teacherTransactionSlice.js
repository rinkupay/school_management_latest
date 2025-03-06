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

const fetchTeacherTransaction = createAsyncThunk(
  "transaction/fetchTeacherTransaction",
  async (id, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/teacher-pay-his/${id}`, {
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

const teacherTransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherTransaction.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTeacherTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.transactions = action.payload.payments || [];
        state.transactionCount = action.payload.paymentCounts || 0;
        state.error = null;
        state.message = action.payload.message || "Transactions fetched successfully";
      })
      .addCase(fetchTeacherTransaction.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message =  "Failed to fetch transactions";
      });
  },
});

export default teacherTransactionSlice.reducer;
export { fetchTeacherTransaction };
