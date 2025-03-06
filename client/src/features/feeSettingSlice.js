import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

const initialState = {
  loading: false,
  status: null,
  fee: {},
  error: null,
  message: null,
};

// <<<<<<<<<<<<<<============== UPDATE FEES ====================>
  const updateFees = createAsyncThunk(
    "fees/updateFees",
    async ({fees,className}, { rejectWithValue }) => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.post(`${baseUrl}/api/v1/feeSettings`,{fees,className}, {
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


  // <<<<<<<<<<<<<<============== EXAM & ADMISSION FEE MONTH UPDATE ====================>
    const updateExamAdmFeeMonth = createAsyncThunk(
      "fees/updateExamFee",
      async (data, { rejectWithValue }) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        try {
          const response = await axios.post(`${baseUrl}/api/v1/exam&admission&Month`,data, {
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


// <<<<<<<<<<<<<<============== GET FEES ====================>

const fetchFees = createAsyncThunk(
  "fees/fetchFees",
  async (_, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/getFeeStructures`, {
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

const feeSlice = createSlice({
  name: "fee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    // <<<<========= Update Fees ========>>>>>>>>>
    .addCase(updateFees.pending, (state) => {
      state.status = "pending";
      state.loading = true;
      state.error = null;
      state.message = null;
    })
    .addCase(updateFees.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      // toast.success(state.message || "Fees updated successfully!");
    })
    .addCase(updateFees.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
      
      state.error = action.payload;
      state.message = action.payload.message;
      // toast.error(action.payload.message);
    })

      // <<<<========= GET FEES ========>>>>>>>>>
      .addCase(fetchFees.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchFees.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.fee = action.payload.fees || {};
        state.error = null;

     
        
      })
      .addCase(fetchFees.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.fee = {};
        state.error = action.payload;
        state.message = action.payload.message;
        toast.error(state.message);
      })


        // <<<<<<<<<<<<<<============== EXAM & ADMISSION FEE MONTH UPDATE ====================>

          .addCase(updateExamAdmFeeMonth.pending, (state) => {
            state.status = "pending";
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(updateExamAdmFeeMonth.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.loading = false;
            state.fee = action.payload.fees;
            state.error = null;
            state.message = null;
            
          })
          .addCase(updateExamAdmFeeMonth.rejected, (state, action) => {
            state.status = "rejected";
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload.message;
            // toast.error(state.message);
          })
  },
});

export default feeSlice.reducer;
export { fetchFees,updateFees,updateExamAdmFeeMonth };
