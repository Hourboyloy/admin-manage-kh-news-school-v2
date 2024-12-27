import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import NewsServicesPage from "./pages/NewsServicesPage";
import InsertPage from "./pages/InsertPage";
import DetailsPage from "./pages/DetailsPage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./AuthLayout";
import AccountPage from "./pages/AccountPage";
import ScrollToTop from "./components/ScrollToTop";
import CategoryPage from "./pages/CategoryPage";
import BackgroundPage from "./pages/BackgroundPage";

const AppRoutes = () => {
  const location = useLocation(); // Get current location for animation

  return (
    <AnimatePresence mode="wait">
      {" "}
      {/* Wrap routes with AnimatePresence */}
      <Routes location={location} key={location.pathname}>
        <Route element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="/news-services" element={<NewsServicesPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/upload" element={<InsertPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/background" element={<BackgroundPage />} />
        </Route>
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
