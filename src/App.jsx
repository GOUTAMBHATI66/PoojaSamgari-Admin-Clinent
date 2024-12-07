import React from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/pages/Dashboard";
import CreateProductPage from "./components/admin/pages/CreateProductPage";
import ProductsPage from "./components/admin/pages/ProductsPage";
import Layout from "./components/admin/layout";
import LandingPage from "./components/shared/LandingPage";
import OrderPage from "./components/admin/pages/OrderPage";
import ProtectedRoute from "./components/admin/component/ProtectedRoute";
``;
const App = () => {
  const authUser = "sskakla";
  return (
    <Routes>
      <Route
        path="/login"
        element={authUser ? <Navigate to={"/"} /> : <LandingPage />}
      />

      {/* Admin Routes */}
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={authUser ? 
          <ProtectedRoute adminOnly>
            <Dashboard />
          </ProtectedRoute>
          : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={authUser ? 
            <ProtectedRoute adminOnly>
            <ProductsPage /> 
          </ProtectedRoute>
          :  <Navigate to="/login" />}
        />
        <Route
          path="/products/create"
          element={authUser ?
            <ProtectedRoute adminOnly>
            <CreateProductPage />
          </ProtectedRoute>
          : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={authUser ? 
            <ProtectedRoute adminOnly>
            <OrderPage />
          </ProtectedRoute>
           : <Navigate to="/login" />}
        />
      </Route>
    </Routes>
  );
};

export default App;
