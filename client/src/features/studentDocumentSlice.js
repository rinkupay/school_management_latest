import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    status: null,
    studentDocument: {},
    error: null,
    message: null,
    };

    const fetchStudentDocument = createAsyncThunk(  
        "student/fetchStudentDocument",
        async (id, { rejectWithValue }) => {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            try {
              const response = await axios.get(`${baseUrl}/api/v1/student-documents/${id}`,{withCredentials:true});
              return response.data;
            } catch (error) {
              return rejectWithValue(error.response ? error.response.data : error.message);
            }
          }
        );


        const studentDocumentSlice = createSlice({
          name: "document",
          initialState,
          reducers: {},
          extraReducers: (builder) => {
            builder
              .addCase(fetchStudentDocument.pending, (state) => {
                state.status = "pending";
                state.loading = true;
                state.error = null;
                state.message = null;
              })
              .addCase(fetchStudentDocument.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.loading = false;
                state.studentDocument = action.payload.documents;
                state.error = null;
                state.message = action.payload.message;
              })
              .addCase(fetchStudentDocument.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload.message;
              });
          },
        });
        
        export default studentDocumentSlice.reducer;
        export { fetchStudentDocument };