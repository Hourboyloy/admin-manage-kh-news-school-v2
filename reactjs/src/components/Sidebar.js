// // src/components/Sidebar.js
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Sidebar = ({ handleSetLogin, setDefaultIndexofList }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div
//       className={`bg-gray-900 bg-opacity-80 text-white min-h-[99.8vh] overflow-hidden ${
//         isOpen ? "w-64" : "w-16"
//       } transition-width duration-300`}
//     >
//       <div className="flex justify-between items-center p-4 pl-8">
//         <h1 className={`${isOpen ? "block" : "hidden"} text-xl font-bold`}>
//           News
//         </h1>
//         <button
//           onClick={toggleSidebar}
//           className="focus:outline-none select-none"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             ></path>
//           </svg>
//         </button>
//       </div>
//       {isOpen ? (
//         <nav className="space-y-4 p-4 text-nowrap">
//           <Link
//             onClick={setDefaultIndexofList}
//             to="/"
//             className="block py-2 px-4 rounded hover:bg-gray-700 focus:outline-none select-none"
//           >
//             Dashboard
//           </Link>

//           <Link
//             onClick={setDefaultIndexofList}
//             to="/news-services"
//             className="block py-2 px-4 rounded hover:bg-gray-700 focus:outline-none select-none"
//           >
//             News Services
//           </Link>
//           <Link
//             onClick={setDefaultIndexofList}
//             to="/categories"
//             className="block py-2 px-4 rounded hover:bg-gray-700 focus:outline-none select-none"
//           >
//             Categories
//           </Link>

//           <Link
//             onClick={setDefaultIndexofList}
//             to="/background"
//             className="block py-2 px-4 rounded hover:bg-gray-700 focus:outline-none select-none"
//           >
//             Background
//           </Link>

//           <Link
//             to="/login"
//             onClick={() => {
//               setDefaultIndexofList();
//               handleSetLogin();
//             }}
//             className="block py-2 px-4 rounded hover:bg-gray-700 focus:outline-none select-none"
//           >
//             Logout
//           </Link>
//         </nav>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default Sidebar;



// src/components/Sidebar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaNewspaper, FaList, FaSignOutAlt } from "react-icons/fa"; // Add new icons

const Sidebar = ({ handleSetLogin, setDefaultIndexofList }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // Get current path from the location

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      // className={`bg-gray-900 bg-opacity-80 text-white min-h-[99.8vh] overflow-hidden ${isOpen ? "w-64" : "w-16"} transition-width duration-300`}
      className={`bg-[#0E151D] text-white min-h-[99.8vh] overflow-hidden ${
        isOpen ? "w-64" : "w-16"
      } transition-width duration-300`}
    >
      <div className="flex justify-between items-center p-4 pl-8">
        <h1 className={`${isOpen ? "block" : "hidden"} text-xl font-bold`}>
          News
        </h1>
        <button
          onClick={toggleSidebar}
          className="focus:outline-none select-none"
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
      </div>
      {isOpen ? (
        <nav className="space-y-4 p-4 text-nowrap">
          {/* Dashboard link with dynamic active class */}
          <Link
            to="/"
            onClick={setDefaultIndexofList}
            className={`block py-2 px-4 rounded hover:bg-[#007DB0] focus:outline-none select-none ${
              location.pathname === "/" ? "bg-[#007DB0]" : ""
            }`}
            // className={`block py-2 px-4 rounded hover:bg-gray-700 focus:outline-none select-none ${
            //   location.pathname === "/" ? "bg-gray-700" : ""
            // }`}
          >
            <FaHome className="inline mr-2" /> Dashboard
          </Link>

          {/* News Services link with dynamic active class */}
          <Link
            to="/news-services"
            onClick={setDefaultIndexofList}
            className={`block py-2 px-4 rounded hover:bg-[#007DB0] focus:outline-none select-none ${
              location.pathname === "/news-services" ? "bg-[#007DB0]" : ""
            }`}
          >
            <FaNewspaper className="inline mr-2" /> News Services
          </Link>

          {/* Categories link with dynamic active class */}
          <Link
            to="/categories"
            onClick={setDefaultIndexofList}
            className={`block py-2 px-4 rounded hover:bg-[#007DB0] focus:outline-none select-none ${
              location.pathname === "/categories" ? "bg-[#007DB0]" : ""
            }`}
          >
            <FaList className="inline mr-2" /> Categories
          </Link>

          {/* Logout link with dynamic active class */}
          <Link
            to="/login"
            onClick={() => {
              setDefaultIndexofList();
              handleSetLogin();
            }}
            className={`block py-2 px-4 rounded hover:bg-[#007DB0] focus:outline-none select-none ${
              location.pathname === "/login" ? "bg-[#007DB0]" : ""
            }`}
          >
            <FaSignOutAlt className="inline mr-2" /> Logout
          </Link>
        </nav>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;


