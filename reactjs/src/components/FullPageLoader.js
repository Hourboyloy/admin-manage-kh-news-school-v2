import React, { useState, useEffect } from "react";

const FullPageLoader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    },200); // Delay of 300ms

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (!isVisible) {
    return null; // Return null to avoid rendering the loader immediately
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh)] bg-gray-800">
      <div className="flex flex-col items-center">
        {/* Loading Spinner */}
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-14 w-14 mb-3"></div>
        {/* Loading Text */}
        <p className="text-gray-300 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
