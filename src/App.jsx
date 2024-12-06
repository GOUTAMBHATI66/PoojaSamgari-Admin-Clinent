import React from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/pages/Dashboard";
import CreateProductPage from "./components/admin/pages/CreateProductPage";
import ProductsPage from "./components/admin/pages/ProductsPage";
import Layout from "./components/admin/layout";
import LandingPage from "./components/shared/LandingPage";
``;
const App = () => {
  const authUser = "sdjfsdfj";
  return (
    <Routes>
      <Route
        path="/login"
        element={authUser ? <Navigate to={"/"} /> : <LandingPage />}
      />
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={authUser ? <ProductsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/create"
          element={authUser ? <CreateProductPage /> : <Navigate to="/login" />}
        />
      </Route>
    </Routes>
  );
};

export default App;
