import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

const initialState = {
  loading: false,
  status: null,
  fees: [],
  error: null,
  message: null,
};

// GENERATE FEE MEMOS FOR STUDENTS
const generateFeesMemo = createAsyncThunk(
  "transaction/generateFeesMemo",
  async  ({id},{rejectWithValue}) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/generate-fees-memo/${id}`,{withCredentials:true})
      return response.data;
    } catch (error) {
      return rejectWithValue( error.response ? error.ressponse.data : error.message)
    }
  }
)

const fetchSingleStudentDueTransaction = createAsyncThunk(
  "transaction/fetchSingleStudentDueTransaction",
  async (id, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/student-transaction/${id}`, {
      
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

const collectStudentFees = createAsyncThunk(
  "transaction/collectStudentFees",
  async ({id,months,paymentMode,transactionId}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${baseUrl}/api/v1/collect-fees/${id}`, {months,paymentMode,transactionId} ,{
      
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

const singleStudentDueTransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder



      // GENERATE FEES MEMO FOR STUDENTS

      .addCase(generateFeesMemo.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(generateFeesMemo.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(generateFeesMemo.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload.error;
        state.message = action.payload.message || "Failed to generate fees memo";
        toast.error(action.payload.messge || "Failed to generate fees memo");
      })

    // FETCH SINGLE STUDENT DUE FEES
      .addCase(fetchSingleStudentDueTransaction.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchSingleStudentDueTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.fees = action.payload.payments || [];
       
        state.error = null;
      
      })
      .addCase(fetchSingleStudentDueTransaction.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message || "Failed to fetch transactions";
      })


      // COLLECT SINGLE STUDENT FEES

      .addCase(collectStudentFees.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(collectStudentFees.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.message = action.payload.message
       
        state.error = null;
        // toast.success(action.payload.message)
      
      })
      .addCase(collectStudentFees.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message || "Failed to collect fees";
        toast.error(action.payload.message || "Something went wrong");
      })


    

  },
});

export default singleStudentDueTransactionSlice.reducer;
export { fetchSingleStudentDueTransaction,collectStudentFees,generateFeesMemo };
