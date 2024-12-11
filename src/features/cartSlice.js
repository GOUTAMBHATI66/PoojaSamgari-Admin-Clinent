import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch cart details
export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    const productIds = Object.keys(cart);

    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/api/store/products/cart`, productIds);
    return response.data?.data?.map((product) => ({
      ...product,
      quantity: cart[product.id],
    }));
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [], // Cart products with details
    status: "idle", // API fetch status
    error: null, // API error state
  },
  reducers: {
    addItem: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.products.find((p) => p.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.products.push({ id, quantity });
      }
      updateLocalStorage(state.products);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((p) => p.id !== id);
      updateLocalStorage(state.products);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.products.find((p) => p.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      updateLocalStorage(state.products);
    },
    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Helper function to sync localStorage
const updateLocalStorage = (products) => {
  const cart = products.reduce((acc, product) => {
    acc[product.id] = product.quantity;
    return acc;
  }, {});
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Export actions and reducer
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
