import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/pages/DashboardPage";
import CreateProductPage from "./components/admin/pages/CreateProductPage";
import ProductsPage from "./components/admin/pages/ProductsPage";
import Layout from "./components/admin/layout";
import LandingPage from "./components/shared/LandingPage";
import OrderPage from "./components/admin/pages/OrderPage";
import ProtectedRoute from "./components/admin/component/ProtectedRoute";
import useDynamicTitle from "./hooks/useDynamicTitle";
import Home from "./components/client/home/Home";
import EditProduct from "./components/admin/pages/EditProduct";
import CheckoutPage from "./components/client/Checkout/CheckoutPage";
import ProfilePage from "./components/client/profile/ProfilePage";

const App = () => {
  useDynamicTitle();
  return (
    <Routes>
      <Route path="/login" element={<LandingPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<Layout />}>
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute adminOnly>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute adminOnly>
              <CreateProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly>
              <OrderPage />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* client routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
