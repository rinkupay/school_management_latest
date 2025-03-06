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

const fetchStudentTransaction = createAsyncThunk(
  "transaction/fetchStudentTransaction",
  async ({id,status=''}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/transaction/${id}`, {
        params:{status},
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

const studentTransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentTransaction.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchStudentTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.transactions = action.payload.transactions || [];
        state.transactionCount = action.payload.transactionCount || 0;
        state.error = null;
        state.message = action.payload.message || "Transactions fetched successfully";
      })
      .addCase(fetchStudentTransaction.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message || "Failed to fetch transactions";
      });
  },
});

export default studentTransactionSlice.reducer;
export { fetchStudentTransaction };
