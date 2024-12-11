import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching data
export const fetchallproductsSlice = createAsyncThunk(
  'allproductsSlice/fetchallproductsSlice',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/store/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'Error fetching data');
    }
  }
);

// Slice definition
const allproductsSlice = createSlice({
  name: 'allproductsSlice',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchallproductsSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchallproductsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchallproductsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: dataActions } = allproductsSlice;
export default allproductsSlice.reducer;
