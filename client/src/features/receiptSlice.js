import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  receipt: {},
  error: null,
  message: null,
};

const fetchSingleStudentTransaction = createAsyncThunk(
  "payment/fetchSingleStudentTransaction",
  async (id, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/student-recept/${id}`,{withCredentials:true});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const singleStudentTransactionSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleStudentTransaction.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchSingleStudentTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.receipt = action.payload.transaction;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchSingleStudentTransaction.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.receipt ={};
        state.error = action.payload;
        state.message = action.payload.message;
      });
  },
});

export default singleStudentTransactionSlice.reducer;
export { fetchSingleStudentTransaction };
