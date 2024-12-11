import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MyProvider } from "./components/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Provider store={store}>
        <MyProvider>
          <App />
          <Toaster />
        </MyProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
