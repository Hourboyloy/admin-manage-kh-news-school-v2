import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const LoginPage = () => {
  const url = "https://api-news-dot-school.vercel.app";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.post(`${url}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        if (response.data.user?.role !== "admin") {
          // Corrected condition
          setTimeout(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              background: "#171B24", // Setting the background color
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });

            Toast.fire({
              icon: "warning",
              title: "You are not admin",
            });
          }, 1000);
          return;
        }
        setTimeout(() => {
          // alert("Login successfuly");
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Login successfully",
          });
        }, 1000);
      }

      const { user_access_token, admin_access_token, user, expiresin } =
        response.data;
      if (admin_access_token) {
        localStorage.setItem("admin_access_token", admin_access_token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLogin", "1");
        localStorage.setItem("expiresin", expiresin);
        navigate("/");
      } else if (user_access_token) {
        localStorage.setItem("user_access_token", user_access_token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("expiresin", expiresin);
        localStorage.setItem("isLogin", "1");
        navigate("/");
      }
    } catch (error) {
      setTimeout(() => {
        // alert("Login is fialed.Please try again...");
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#171B24", // Setting the background color
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: "error",
          title: "Login failed",
        });
      }, 1000);
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen sticky z-20 px-5 md:px-0">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-7">
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 pb-0.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none transition-all duration-500 outline-none focus:border focus:border-blue-500"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 pb-0.5"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className=" w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none transition-all duration-500 outline-none focus:border focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              className="absolute inset-y-0 top-[40%] focus:outline-none right-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <button
            type="submit"
            className="w-full select-none py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 outline-none focus:outline-none"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-3 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
