import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

const initialState = {
    loading: false,
    status: null,
    transaction: null,
    error: null,
    message: null,
};

const fetchStudentSingleTransaction = createAsyncThunk(
    "payment/fetchStudentSingleTransaction",
    async ({ id }, { rejectWithValue }) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.get(`${baseUrl}/api/v1/roll-back-payment/${id}`, {
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

const deleteStudentSingleTransaction = createAsyncThunk(
    "payment/deleteStudentSingleTransaction",
    async ({ id }, { rejectWithValue }) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.patch(`${baseUrl}/api/v1/roll-back-payment/${id}`,{id}, {
             
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
)

const studentTransactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStudentSingleTransaction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchStudentSingleTransaction.fulfilled, (state, action) => {
            state.loading = false;
            state.transaction = action.payload.transaction;
            state.status = "success";
        });
        builder.addCase(fetchStudentSingleTransaction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            toast.error(action.payload.message);  
            state.status = "failed";
        });
        builder.addCase(deleteStudentSingleTransaction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteStudentSingleTransaction.fulfilled, (state, action) => {
            state.loading = false;
            state.transaction = action.payload;
            toast.success(action.payload.message);  
            state.status = "success";
        });
        builder.addCase(deleteStudentSingleTransaction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            toast.error(action.payload.message); 
            state.status = "failed";
        });
    },
});

export default studentTransactionSlice.reducer;
export { fetchStudentSingleTransaction ,deleteStudentSingleTransaction };
