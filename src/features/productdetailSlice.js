import AxiosBase from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching data
export const fetchproductdetailSlice = createAsyncThunk(
  "productdetailSlice/fetchproductdetailSlice",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await AxiosBase.get(`/api/store/products/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error fetching data");
    }
  }
);

// Slice definition
const productdetailSlice = createSlice({
  name: "productdetailSlice",
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
      .addCase(fetchproductdetailSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductdetailSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchproductdetailSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: dataActions } = productdetailSlice;
export default productdetailSlice.reducer;
