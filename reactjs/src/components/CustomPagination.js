import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CustomPagination = ({ totalItems=500, pageSize=10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / pageSize);

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Render the pagination buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-full transition-colors ${
            currentPage === i
              ? "bg-yellow-500 text-white font-semibold"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center py-6 space-x-2">
      {/* Prev button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-4 py-2 rounded-full transition-colors ${
          currentPage === 1
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>

      {/* Render Page Numbers */}
      {renderPageNumbers()}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-4 py-2 rounded-full transition-colors ${
          currentPage === totalPages
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default CustomPagination;
