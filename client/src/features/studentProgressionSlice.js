import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

const initialState = {
    loading: false,
    status: null,
    progressionData: {},
    error: null,
    message: null,
};

const setStudentProgression = createAsyncThunk(
    "student/progressionData",
    async (formData, { rejectWithValue }) => {
        const { id, ...rest } = formData; // Extract id separately
        if (!id) {
            return rejectWithValue("Student ID is missing.");
        }

        const baseUrl = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.patch(
                `${baseUrl}/api/v1/progression/${id}`,
                rest, // Send only the fields, without `id`
                {
                    headers: formData instanceof FormData ? {} : { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message || "An error occurred");
        }
    }
);

// CORRECT PROGRESSION ACTIVITY
const updateStudentProgression = createAsyncThunk(
    "student/progressionDataUpdate",
    async (formData, { rejectWithValue }) => {
        const { id, ...rest } = formData; // Extract id separately
        if (!id) {
            return rejectWithValue("Student ID is missing.");
        }

        const baseUrl = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.patch(
                `${baseUrl}/api/v1/progression-update/${id}`,
                rest, // Send only the fields, without `id`
                {
                    headers: formData instanceof FormData ? {} : { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message || "An error occurred");
        }
    }
);

const studentProgressionSlice = createSlice({
    name: "student",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setStudentProgression.pending, (state) => {
                state.status = "pending";
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(setStudentProgression.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.loading = false;
                state.progressionData = action.payload.progressionData || {};
                state.error = null;
                state.message = action.payload.message || "Updated successfully";
                toast.success(action.payload?.message || "Updated successfully");
            })
            .addCase(setStudentProgression.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                state.progressionData = {};
                state.error = action.payload || "Something went wrong";
                state.message = action.payload || "Something went wrong";
                toast.error(action.payload?.message || "Something went wrong");
            })

            // PROGRESSION UPDATE CASE
            .addCase(updateStudentProgression.pending, (state) => {
                state.status = "pending";
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(updateStudentProgression.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.loading = false;
                state.progressionData = action.payload.progressionData || {};
                state.error = null;
                state.message = action.payload.message || "Updated successfully";
                toast.success(action.payload?.message || "Updated successfully");
            })
            .addCase(updateStudentProgression.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                state.progressionData = {};
                state.error = action.payload || "Something went wrong";
                state.message = action.payload || "Something went wrong";
                toast.error(action.payload?.message || "Something went wrong");
            })
    },
});

export default studentProgressionSlice.reducer;
export { setStudentProgression ,updateStudentProgression };
