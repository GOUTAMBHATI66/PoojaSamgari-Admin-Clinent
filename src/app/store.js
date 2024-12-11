import { configureStore } from '@reduxjs/toolkit';
import allproductsSlice from '../features/allproductsSlice'
import productdetailSlice from '../features/productdetailSlice'
import cartSlice from '../features/cartSlice'
const store = configureStore({
  reducer: {
    allproductsSlice:allproductsSlice,
    productdetailSlice:productdetailSlice,
    cartSlice:cartSlice,
  },
});

export default store;
