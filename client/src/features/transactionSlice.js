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

const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async (status, { rejectWithValue }) => {

    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/transactions`, {
        params: { status }, // ✅ Pass `status` as a query parameter
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.transactions = action.payload.transactions || []; // ✅ Ensure transactions array exists
        state.transactionCount = action.payload.transactionCount || 0; // ✅ Ensure count is handled
        state.error = null;
        state.message = action.payload.message || "Transactions fetched successfully";
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to fetch transactions";
      });
  },
});

export default transactionSlice.reducer;
export { fetchTransaction };
