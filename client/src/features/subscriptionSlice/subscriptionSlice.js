import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast"

const initialState = {
  loading: false,
  status: null,
  subscription:{},
  error: null,
  message: null,
};

// <<<<<<<<<<<<<<============== SET SUBSCRIPTION ====================>

  const setSubscription = createAsyncThunk(
    "subscription/setSubscription",
    async ({startDate,expiryDate}, { rejectWithValue }) => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.post(`${baseUrl}/api/v1/subscription`, {
          params: {startDate,expiryDate},
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



  // <<<<<<<<<<<<<<============== GET SUBSCRIPTION ====================>

    const getSubscription = createAsyncThunk(
        "subscription/getSubscription",
        async (_, { rejectWithValue }) => {
          const baseUrl = import.meta.env.VITE_BASE_URL;
          try {
            const response = await axios.get(`${baseUrl}/api/v1/subscription`, {
              
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
  

const setSubscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // <<<<========= SET SUBSCRIPTION ========>>>>>>>>>
      .addCase(setSubscription.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(setSubscription.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        toast.success(action.payload.message)
      })
      .addCase(setSubscription.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
        toast.error(action.payload.messages)
      })


      // <<<<========= GET SUBSCRIPTION ========>>>>>>>>>
      .addCase(getSubscription.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getSubscription.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.subscription = action.payload.subscription
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(getSubscription.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
        // toast.error(action.payload.messages)
      })


  },
});

export default setSubscriptionSlice.reducer;
export { setSubscription,getSubscription };
