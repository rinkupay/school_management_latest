import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast"

const initialState = {
  loading: false,
  status: null,
  payments: [],
  error: null,
  message: null,
};

const fetchTeacherDuePayments = createAsyncThunk(
  "payments/fetchTeacherDuePayments",
  async (id, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/due-pay/${id}`,{withCredentials:true});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const teacherDuePaymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherDuePayments.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTeacherDuePayments.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.payments = action.payload;
        state.error = null;
        state.message = action.payload.message;
     
      })
      .addCase(fetchTeacherDuePayments.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.payments =[];
        state.error = action.payload;
        state.message = action.payload.message;
        toast.success(action.payload.message)
      });
  },
});

export default teacherDuePaymentSlice.reducer;
export { fetchTeacherDuePayments };
