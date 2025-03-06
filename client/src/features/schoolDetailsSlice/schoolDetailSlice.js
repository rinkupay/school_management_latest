import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast'; 

const initialState = {
  loading: false,
  status: null,
  schoolDetails:{},
  error: null,
  message: null,
};


// SAVE SCHOOL DETAILS
const saveSchoolName = createAsyncThunk(
  "school/saveSchoolName",
  async ({ schoolDetails}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    try {
     

      const response = await axios.post(`${baseUrl}/api/v1/create-school-details`,{schoolDetails}, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// GET SCHOOL DETAILS
const fetchSchoolDetails = createAsyncThunk(
  "school/fetchSchoolDetails",
  async (_, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.get(`${baseUrl}/api/v1/get-school-details`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }     
);


//  GET SCHOOL DETAILS
const setSchoolSession = createAsyncThunk(
  "school/setSchoolSession",
  async ({sessionDetails}, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.post(`${baseUrl}/api/v1/create-school-session`,{sessionDetails}, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }     
);

const schoolDetailSlice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    // SAVE SCHOOL DETAILS
      .addCase(saveSchoolName.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(saveSchoolName.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.schoolDetails = action.payload.schoolDetail;
        state.error = null;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(saveSchoolName.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
       
        state.error = action.payload || "Something went wrong";
        state.message = action.payload?.message || "Failed to fetch data";
        toast.error(action.payload?.message || "Failed to fetch data");
      })

    //   GET SCHOOL DETAILS
    .addCase(fetchSchoolDetails.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchSchoolDetails.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.schoolDetails = action.payload.schoolDetails || {
          schoolName: "",
          schoolAddress: "",
          sessionDetails: { startDate: "", endDate: "" },
        };
        state.error = null;
        state.message = null;
        
      })
      .addCase(fetchSchoolDetails.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
       
        state.error = action.payload || "Something went wrong";
        state.message = action.payload?.message || "Failed to fetch data";
        toast.error(action.payload?.message || "Failed to fetch data");
      })


      //   SET SCHOOL SESSION
    .addCase(setSchoolSession.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(setSchoolSession.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.schoolDetails = action.payload.schoolDetails;
        state.error = null;
        state.message = null;
        toast.success(action.payload.message);
        
      })
      .addCase(setSchoolSession.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
       
        state.error = action.payload || "Something went wrong";
        state.message = action.payload?.message || "Failed to fetch data";
        toast.error(action.payload?.message || "Failed to fetch data");
      })
  },
});

export default schoolDetailSlice.reducer;
export { saveSchoolName ,fetchSchoolDetails,setSchoolSession};
