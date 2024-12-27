// src/components/Header.js
import React from "react";
import { IoMdClose } from "react-icons/io";

const Header = ({ handleToggle, togglenav }) => {
  const handleSetLogin = () => {
    localStorage.setItem("isLogin", "0");
    localStorage.setItem("admin_access_token", "");
    localStorage.setItem("user", {});
  };

  return (
    <div className="bg-[#0E151D] text-white z-20 inset-0 shadow-lg p-4 flex justify-between items-center sticky top-0 left-0">
      <div className="text-xl font-bold text-white">Welcome, Admin</div>
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-600 focus:outline-none">
          <span className="absolute right-0 top-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405C19.438 15.379 19 14.194 19 13V11a7 7 0 00-14 0v2c0 1.194-.438 2.379-1.595 3.595L3 17h5m7-4v5m-4 0h4"
            ></path>
          </svg>
        </button>

        <div className="relative group">
          <div className="cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                className=""
                src="/assets/photo_user.jpg"
                alt="User Avatar"
              />
            </div>
          </div>

          <div className="absolute right-0 w-48 bg-white border rounded-md shadow-lg py-1 hidden group-hover:block">
            <a
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </a>
            <a
              onClick={handleSetLogin}
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        </div>

        <div className="pr-0">
          {togglenav ? (
            <button
              onClick={handleToggle}
              className=" focus:outline-none select-none xl:hidden w-[24px]"
            >
              <IoMdClose className=" text-2xl" />
            </button>
          ) : (
            <button
              onClick={handleToggle}
              className=" focus:outline-none select-none xl:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
