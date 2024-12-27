// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const NewsDetail = ({ id, news, handleDelete, handleUpdateVisibility }) => {
//   const navigate = useNavigate();
//   if (!news) return null;

//   // const khmerMonths = [
//   //   "មករា",
//   //   "កម្ភះ",
//   //   "មីនា",
//   //   "មេសា",
//   //   "ឧសភា",
//   //   "មិថុនា",
//   //   "កក្កដា",
//   //   "សីហា",
//   //   "កញ្ញា",
//   //   "តុលា",
//   //   "វិច្ឆិកា",
//   //   "ធ្នូ",
//   // ];
//   const khmerMonths = [
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10",
//     "11",
//     "12",
//   ];

//   const formatDate = (date) => {
//     const day = String(new Date(date).getDate()).padStart(2, "0");
//     const monthIndex = new Date(date).getMonth();
//     const year = new Date(date).getFullYear();
//     const khmerMonth = khmerMonths[monthIndex];
//     return `${day} ${khmerMonth} ${year}`;
//   };

//   const formatTime = (date) => {
//     const time = new Date(date);
//     let hours = time.getHours();
//     const minutes = String(time.getMinutes()).padStart(2, "0");
//     const period = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;
//     return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
//   };

//   return (
//     <div className="min-h-screen w-full py-10 flex items-center">
//       <div className="w-full bg-white shadow-lg rounded p-10 space-y-8">
//         {/* Header Section */}
//         <div className="border-b border-gray-300 pb-2.5 mb-6">
//           <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
//             {news.category}
//           </p>
//           <h1 className="text-2xl font-semibold text-gray-800 mt-2">
//             {news.title}
//           </h1>
//         </div>

//         {/* Date and Time Information */}
//         <div className="text-sm text-gray-500 space-y-2 mb-8">
//           <p className="flex items-center">
//             <span className="mr-1">📅</span> Posted on:{" "}
//             {formatDate(news.createdAt)} at {formatTime(news.createdAt)}
//           </p>
//           {news.updatedAt > news.createdAt && (
//             <p className="flex items-center">
//               <span className="mr-1">🕒</span> Updated on:{" "}
//               {formatDate(news.updatedAt)} at {formatTime(news.updatedAt)}
//             </p>
//           )}
//         </div>

//         {/* Photos and Descriptions */}
//         <div className="space-y-6">
//           <ul className="space-y-6">
//             {news.photosDescription?.length > 0 &&
//               news.photosDescription.map((item, index) => (
//                 <li key={index} className="">
//                   <p className="text-gray-700 leading-relaxed">
//                     {item?.description &&
//                       (() => {
//                         const parts = [];
//                         let buffer = "";
//                         let count = 0;

//                         // Loop through each character in the description
//                         for (let char of item.description) {
//                           buffer += char; // Add character to buffer
//                           if (char === "." || char === "។") {
//                             count++; // Increment count if it's "." or "។"
//                           }
//                           if (count === 2) {
//                             parts.push(buffer); // Push the buffer to parts when count is 2
//                             buffer = ""; // Reset buffer
//                             count = 0; // Reset count
//                           }
//                         }

//                         // Add any remaining text in the buffer
//                         if (buffer) {
//                           parts.push(buffer);
//                         }

//                         // Render the parts with <br /> between them
//                         return parts.map((line, index) => (
//                           <React.Fragment key={index}>
//                             {line}
//                             <br />
//                             <br />
//                           </React.Fragment>
//                         ));
//                       })()}
//                   </p>

//                   {item?.photo !== "" && (
//                     <div className="w-full flex items-center justify-center">
//                       <img
//                         src={item?.photo}
//                         alt={`file${index}`}
//                         className="w-auto object-cover rounded-md"
//                       />
//                     </div>
//                   )}
//                 </li>
//               ))}
//           </ul>
//         </div>

//         {/* Buttons: Back, Edit, and Delete */}
//         <div className="flex justify-end mt-8 space-x-3">
//           {/* Back Button */}
//           <button
//             onClick={() => navigate(`/news-services`)}
//             className="flex items-center bg-gradient-to-br from-blue-600 to-blue-400 text-white py-2 px-4 rounded-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none shadow-md shadow-blue-400/40"
//           >
//             <FaArrowLeft className="mr-2" /> Go Back
//           </button>

//           {/* Edit Button */}
//           <button
//             onClick={() => navigate(`/edit/${id}`)}
//             className="flex items-center bg-gradient-to-br from-green-600 to-green-400 text-white py-2 px-4 rounded-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none shadow-md shadow-green-400/40"
//           >
//             <FaEdit className="mr-2" /> Edit
//           </button>

//           {/* Delete Button */}
//           <button
//             onClick={handleDelete}
//             className="flex items-center bg-gradient-to-br from-red-600 to-red-400 text-white py-2 px-4 rounded-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none shadow-md shadow-red-400/40"
//           >
//             <FaTrash className="mr-2" /> Delete
//           </button>

//           {/* Toggle Visibility Button */}
//           <button
//             onClick={() => handleUpdateVisibility(id, news.isVisible)}
//             className="flex items-center bg-gradient-to-br from-gray-600 to-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none shadow-md shadow-gray-400/40"
//           >
//             {news.isVisible ? (
//               <FaEyeSlash className="mr-2" />
//             ) : (
//               <FaEye className="mr-2" />
//             )}
//             {news.isVisible ? "Hide" : "Show"} Card
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsDetail;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NewsDetail = ({ id, news, handleDelete, handleUpdateVisibility }) => {
  const navigate = useNavigate();
  if (!news) return null;

  const khmerMonths = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const formatDate = (date) => {
    const day = String(new Date(date).getDate()).padStart(2, "0");
    const monthIndex = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const khmerMonth = khmerMonths[monthIndex];
    return `${day} ${khmerMonth} ${year}`;
  };

  const formatTime = (date) => {
    const time = new Date(date);
    let hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
  };

  return (
    <div className="min-h-screen w-full py-10 flex items-center">
      <div className="w-full max-w-4xl mx-auto bg-[#262D35] shadow-lg rounded md:p-10 p-4 space-y-8">
        {/* Header Section */}
        <div className="border-b border-gray-700 pb-2.5 mb-6">
          <p className="text-sm text-gray-300 uppercase tracking-widest">
            {news.category}
          </p>
          <h1 className="lg:text-xl md:text-lg text-gray-300 mt-2">
            {news.title}
          </h1>
        </div>

        {/* Date and Time Information */}
        <div className="text-sm text-gray-400 space-y-2 mb-8">
          <p className="flex items-center">
            <span className="mr-1">📅</span> Posted on:{" "}
            {formatDate(news.createdAt)} at {formatTime(news.createdAt)}
          </p>
          {news.updatedAt > news.createdAt && (
            <p className="flex items-center">
              <span className="mr-1">🕒</span> Updated on:{" "}
              {formatDate(news.updatedAt)} at {formatTime(news.updatedAt)}
            </p>
          )}
        </div>

        {/* Photos and Descriptions */}
        <div className="space-y-6">
          <ul className="space-y-6">
            {news.photosDescription?.length > 0 &&
              news.photosDescription.map((item, index) => (
                <li key={index} className="text-gray-300">
                  <div className="leading-relaxed">
                    {item?.description &&
                      (() => {
                        const parts = [];
                        let buffer = "";
                        let count = 0;

                        // Loop through each character in the description
                        for (let char of item.description) {
                          buffer += char; // Add character to buffer
                          if (char === "." || char === "។") {
                            count++; // Increment count if it's "." or "។"
                          }
                          if (count === 2) {
                            parts.push(buffer); // Push the buffer to parts when count is 2
                            buffer = ""; // Reset buffer
                            count = 0; // Reset count
                          }
                        }

                        // Add any remaining text in the buffer
                        if (buffer) {
                          parts.push(buffer);
                        }

                        // Render the parts with <br /> between them
                        return parts.map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <div className="pt-2"></div>
                          </React.Fragment>
                        ));
                      })()}
                  </div>

                  {item?.photo !== "" && (
                    <div className="w-full flex items-center justify-center mt-4">
                      <img
                        src={item?.photo}
                        alt={`file${index}`}
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>

        {/* Buttons: Back, Edit, Delete, Toggle Visibility */}
        <div className="flex flex-wrap md:justify-end mt-8 md:space-x-3 *:flex-nowrap md:*:m-0 *:mr-1 *:mb-1">
          <button
            onClick={() => navigate(`/news-services`)}
            className="flex items-center bg-gradient-to-br from-blue-600 to-blue-400 text-white py-2 px-4 rounded-lg hover:scale-105 focus:outline-none shadow-md"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="flex items-center bg-gradient-to-br from-green-600 to-green-400 text-white py-2 px-4 rounded-lg hover:scale-105 focus:outline-none shadow-md"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center bg-gradient-to-br from-red-600 to-red-400 text-white py-2 px-4 rounded-lg hover:scale-105 focus:outline-none shadow-md"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
          <button
            onClick={() => handleUpdateVisibility(id, news.isVisible)}
            className="flex items-center bg-gradient-to-br from-gray-600 to-gray-400 text-white py-2 px-4 rounded-lg hover:scale-105 focus:outline-none shadow-md"
          >
            {news.isVisible ? (
              <FaEyeSlash className="mr-2" />
            ) : (
              <FaEye className="mr-2" />
            )}
            {news.isVisible ? "Hide" : "Show"} Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
