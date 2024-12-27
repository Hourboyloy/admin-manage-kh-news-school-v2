import React from "react";
import { Link } from "react-router-dom";


const AccountPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSetLogin = () => {
    localStorage.setItem("isLogin", "0");
    localStorage.setItem("admin_access_token", "");
    localStorage.setItem("user", {});
  };

  return (
    <div className="min-h-[90.8vh] px-4 flex items-center justify-center">
      <div className="bg-white bg-opacity-70 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          User Account
        </h1>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Username:</span>
            <span className="text-gray-900 font-semibold">{user.username}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Email:</span>
            <span className="text-gray-900 font-semibold">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Role:</span>
            <span className="text-gray-900 font-semibold capitalize">
              {user.role}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Account Created:</span>
            <span className="text-gray-900 font-semibold">
              {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
        <div className=" flex items-center justify-center space-x-4">
          <Link
            to="/login"
            onClick={handleSetLogin}
            className="mt-6 font-semibold w-full bg-red-700 text-white py-2 rounded-lg focus:outline-none select-none text-center"
          >
            Logout
          </Link>
          {/* <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg focus:outline-none select-none text-center">
            Edit Account
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
