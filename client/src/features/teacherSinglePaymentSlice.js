import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  transaction: {},
  error: null,
  message: null,
};

const fetchTeacherSingleTransaction = createAsyncThunk(
  "transaction/fetchTeacherSingleTransaction",
  async ({id}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/teacher-payment/${id}`, {
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

const teacherSingleTransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherSingleTransaction.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTeacherSingleTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.transaction = action.payload.payments ;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchTeacherSingleTransaction.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      });
  },
});

export default teacherSingleTransactionSlice.reducer;
export { fetchTeacherSingleTransaction };
