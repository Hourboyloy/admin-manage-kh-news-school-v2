import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaNewspaper,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa"; // Add new icons
import { AnimatePresence, motion } from "framer-motion";
import { ContextProvider } from "./Helper/Context";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { IsLoggedIn } from "./Auth/Auth";


function App() {
  const [togglenav, setTogglenav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route location

  const handleSetLogin = () => {
    localStorage.setItem("isLogin", "0");
    localStorage.setItem("admin_access_token", "");
    localStorage.setItem("user", JSON.stringify({}));
  };

  const setDefaultIndexofList = () => {
    localStorage.setItem("startData", JSON.stringify(0));
    localStorage.setItem("stopData", JSON.stringify(9));
    localStorage.setItem("index", JSON.stringify(0));
    localStorage.setItem("listIndex", JSON.stringify(1));
  };
  useEffect(() => {
    if (IsLoggedIn() !== "1") {
      navigate("/login");
    }
  }, [navigate]);

  if (IsLoggedIn() !== "1") {
    return <div>Redirecting...</div>;
  }

  const expiresIn = localStorage.getItem("expiresin");
  if (expiresIn && Date.now() >= Number(expiresIn)) {
    localStorage.setItem("isLogin", "0");
    navigate("/login");
    return <div>Session expired, logging out...</div>;
  }

  const handleToggle = () => {
    setTogglenav(!togglenav);
  };

  // Animation Variants
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const pageTransition = { duration: 0.5, ease: "easeInOut" };

  return (
    <ContextProvider>
      <div className="flex min-h-screen bg-[#171B24]">
        {/* Mobile Navigation */}
        <div
          className={`h-[120vh] md:w-6/12 w-7/12 bg-gray-900 bg-opacity-90 fixed xl:hidden top-0 text-white z-30 pt-4 transition-all duration-500 ${
            togglenav ? "left-0" : "-left-full"
          }`}
        >
          <div className="text-xl font-bold text-white px-4">
            Welcome, Admin
          </div>
          <nav className="space-y-4 px-[1px] pt-8 font-semibold md:text-lg *:border-b *:border-gray-500">
            <Link
              onClick={() => {
                handleToggle();
                setDefaultIndexofList();
              }}
              to="/"
              className="focus:outline-none select-none block py-2 px-4 hover:bg-gray-700"
            >
              <FaHome className="inline mr-2" /> Dashboard
            </Link>
            <Link
              onClick={() => {
                handleToggle();
                setDefaultIndexofList();
              }}
              to="/categories"
              className="focus:outline-none select-none block py-2 px-4 rounded hover:bg-gray-700"
            >
              <FaList className="inline mr-2" /> Categories
            </Link>
            <Link
              onClick={() => {
                handleToggle();
                setDefaultIndexofList();
              }}
              to="/news-services"
              className="focus:outline-none select-none block py-2 px-4 rounded hover:bg-gray-700"
            >
              <FaNewspaper className="inline mr-2" /> News Services
            </Link>
            <Link
              to="/login"
              onClick={() => {
                handleSetLogin();
                setDefaultIndexofList();
              }}
              className="focus:outline-none select-none block py-2 px-4 rounded hover:bg-gray-700"
            >
              <FaSignOutAlt className="inline mr-2" /> Logout
            </Link>
          </nav>
        </div>

        {/* Sidebar for Desktop */}
        <div className="hidden xl:block sticky top-0 left-0 h-full">
          <Sidebar
            setDefaultIndexofList={setDefaultIndexofList}
            handleSetLogin={handleSetLogin}
          />
        </div>

        {/* Main Content with Framer Motion */}
        <div className="flex-grow">
          <Header handleToggle={handleToggle} togglenav={togglenav} />
          <main className="z-10 sticky">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="min-h-screen"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
