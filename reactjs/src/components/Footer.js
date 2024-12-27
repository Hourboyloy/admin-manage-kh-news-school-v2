import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-4">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left Section */}
        <div className="text-sm">
          © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </div>

        {/* Right Section */}
        <div className="text-sm flex space-x-4">
          <a
            href="/terms"
            className="hover:text-gray-100 transition duration-200"
          >
            Terms of Service
          </a>
          <a
            href="/privacy"
            className="hover:text-gray-100 transition duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/support"
            className="hover:text-gray-100 transition duration-200"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
