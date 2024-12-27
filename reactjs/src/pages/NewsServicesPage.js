import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FullPageLoader from "../components/FullPageLoader";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import ListNewsServices from "../components/ListNewsServices";
import { CreateContext } from "../Helper/Context";


const NewsServicesPage = () => {
  const { url } = useContext(CreateContext);
  const [FecthData, setFecthData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("currentPage")) || 0
  );

  const [toggleCardsCategories, setToggleCardsCategories] = useState(true);

  // Fetch data from API
  const handleFetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/admin-get-all`);
      if (response.data.status === 200) {
        setIsLoading(false);
        const fetchedData = response.data.listNews.reverse();
        setFecthData(fetchedData);
        localStorage.setItem("newsData", JSON.stringify(fetchedData));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data from localStorage or fetch it from API
  useEffect(() => {
    const storedData = localStorage.getItem("newsData");
    if (storedData) {
      setFecthData(JSON.parse(storedData));
      setIsLoading(false);
    }
    handleFetchData();
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("prevent-scroll");
    } else {
      document.body.classList.remove("prevent-scroll");
    }

    return () => {
      document.body.classList.remove("prevent-scroll");
    };
  }, [isLoading]);

  // clear current page to localStorage before the page unloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("currentPage", 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentPage]);

  // Handle Delete
  const handleDelete = async (itemId) => {
    const adminToken = localStorage.getItem("admin_access_token");
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (userConfirmed) {
      try {
        const response = await axios.delete(
          `${url}/api/remove-news/${itemId}`,
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        );

        if (response.status === 200) {
          const updatedData = FecthData.filter((item) => item._id !== itemId);
          setFecthData(updatedData);
          localStorage.setItem("newsData", JSON.stringify(updatedData));
          alert("Deleted item successfully");
        } else {
          alert("Failed to delete the item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Error deleting the item");
      }
    }
  };

  // Handle Visibility Update
  const handleUpdateVisibility = async (id, currentVisibility) => {
    const newVisibility = currentVisibility === 1 ? 0 : 1;
    const alertText = `Are you sure you want to ${
      currentVisibility === 1 ? "hide" : "show"
    } this item?`;

    const userConfirmed = window.confirm(alertText);

    if (userConfirmed) {
      try {
        const response = await axios.put(
          `${url}/api/isvisible/${id}`,
          { isVisible: newVisibility },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "admin_access_token"
              )}`,
            },
          }
        );

        if (response.status === 200) {
          const updatedData = FecthData.map((item) =>
            item._id === id ? { ...item, isVisible: newVisibility } : item
          );
          setFecthData(updatedData);
          localStorage.setItem("newsData", JSON.stringify(updatedData));
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error updating visibility:", error);
        alert("Failed to update visibility");
      }
    }
  };

  const itemsPerPage = 10;
  const totalItems = FecthData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNum) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNum);
    setToggleCardsCategories(true);
    localStorage.setItem("currentPage", pageNum);
  };

  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return FecthData.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div className="overflow-hidden min-h-screen pb-20">
          <div className="py-6 px-4 md:p-6 max-w-[1180px] mx-auto">
            <div className="md:pl-0 overflow-hidden md:overflow-visible z-10 md:h-auto h-10 top-24 w-full md:w-auto md:flex items-center justify-between pr-2 pb-5">
              <div className="flex items-center space-x-2 text-sm md:text-base">
                <p className="font-bold text-white">
                  All News, {FecthData?.length} Results
                </p>
                <Link
                  to={`/upload`}
                  className="focus:outline-none select-none bg-[#14A4E3] text-white font-semibold rounded md:px-2.5 px-2.5 py-1 flex items-center justify-center space-x-1"
                >
                  <FaPlusCircle className="text-sm" /> <span>Add</span>
                </Link>
              </div>

              <div className=" lg:block hidden">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  toggleCardsCategories={toggleCardsCategories}
                />
              </div>
            </div>

            <ListNewsServices
              getCurrentItems={getCurrentItems}
              handleDelete={handleDelete}
              handleUpdateVisibility={handleUpdateVisibility}
              FecthData={FecthData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default NewsServicesPage;

// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import FullPageLoader from "../components/FullPageLoader";
// import { FaPlusCircle } from "react-icons/fa";
// import { FaEye } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { RiPencilFill } from "react-icons/ri";
// import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
// import { Link } from "react-router-dom";
// // import { FaThumbsUp, FaThumbsDown, FaCommentDots } from "react-icons/fa";
// import { BiSolidHide } from "react-icons/bi";
// import { GoKebabHorizontal } from "react-icons/go";
// import MyPagination from "../components/MyPagination";

// const NewsServicesPage = () => {
// const [FecthData, setFecthData] = useState([]);
// const [isLoading, setIsLoading] = useState(false);
// const [DataPagenation, setDataPagenation] = useState([]);

// const [index, setIndex] = useState(() => {
//   return JSON.parse(localStorage.getItem("index")) || 0; // Initialize from localStorage
// });

// const [startData, setStartData] = useState(() => {
//   return JSON.parse(localStorage.getItem("startData")) || 0; // Initialize from localStorage
// });

// const [stopData, setStopData] = useState(() => {
//   return JSON.parse(localStorage.getItem("stopData")) || 9; // Initialize from localStorage
// });

// const [listIndex, setListIndex] = useState(() => {
//   return JSON.parse(localStorage.getItem("listIndex")) || 1; // Initialize from localStorage
// });

// useEffect(() => {
//   localStorage.setItem("startData", JSON.stringify(startData));
//   localStorage.setItem("stopData", JSON.stringify(stopData));
//   localStorage.setItem("index", JSON.stringify(index));
//   localStorage.setItem("listIndex", JSON.stringify(listIndex));
// }, [startData, stopData, index, listIndex]);

// useEffect(() => {
//   const handleBeforeUnload = (event) => {
//     const newStartData = 0;
//     const newStopData = 9;
//     const newIndex = 0;
//     const newListIndex = 1;
//     localStorage.setItem("startData", JSON.stringify(newStartData));
//     localStorage.setItem("stopData", JSON.stringify(newStopData));
//     localStorage.setItem("index", JSON.stringify(newIndex));
//     localStorage.setItem("listIndex", JSON.stringify(newListIndex));
//   };
//   window.addEventListener("beforeunload", handleBeforeUnload);
//   return () => {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, []);

//   const handleFetchData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5051/api/admin-get-all"
//       );
//       if (response.data.status === 200) {
//         setIsLoading(true);
//         setFecthData(response.data.listNews.reverse());
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     handleFetchData();
//   }, []); // Fetch data only once

//   const handleNext = () => {
//     setStartData((prev) => prev + 10);
//     setStopData((prev) => prev + 10);
//     setIndex((prev) => prev + 10);
//     setListIndex((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     setStartData((prev) => prev - 10);
//     setStopData((prev) => prev - 10);
//     setIndex((prev) => prev - 10);
//     setListIndex((prev) => prev - 1);
//   };

//   const handlePagenation = useCallback(() => {
//     let data = [];
//     FecthData.forEach((e, i) => {
//       if (i >= startData && i <= stopData) {
//         data.push(e);
//       }
//     });
//     setDataPagenation(data);
//   }, [FecthData, startData, stopData]);

//   // Disable scrolling when loading
//   useEffect(() => {
//     if (isLoading) {
//       document.body.classList.remove("prevent-scroll"); // Ensure scrollbar is removed
//     } else {
//       document.body.classList.add("prevent-scroll"); // Add class to prevent scrolling
//     }

//     // Cleanup on unmount
//     return () => {
//       document.body.classList.remove("prevent-scroll");
//     };
//   }, [isLoading]);

//   useEffect(() => {
//     handlePagenation();
//   }, [handlePagenation]); // Add handlePagenation as dependency

//   // delete items

//   const handleDelete = async (itemId) => {
//     const adminToken = localStorage.getItem("admin_access_token");
//     setTimeout(async () => {
//       const userConfirmed = window.confirm(
//         "Are you sure you want to delete this item?"
//       );
//       if (userConfirmed) {
//         try {
//           const response = await axios.delete(
//             `http://localhost:5051/api/remove-news/${itemId}`, // URL with item ID
//             {
//               headers: {
//                 Authorization: `Bearer ${adminToken}`, // Add token to headers
//               },
//             }
//           );

//           if (response.status === 200) {
//             handleFetchData();
//             setTimeout(() => {
//               alert("deleted item successfully");
//             }, 1000);
//           } else {
//             setTimeout(() => {
//               alert("Failed to delete the item");
//             }, 1000);
//           }
//         } catch (error) {
//           setTimeout(() => {
//             alert("Error deleting the item");
//           }, 1000);
//         }
//       }
//     }, 500);
//   };

//   const handleUpdateVisibility = async (id, currentVisibility) => {
//     const newVisibility = currentVisibility === 1 ? 0 : 1; // Toggle between 1 and 0
//     const alertText = `Are you sure you want to ${
//       currentVisibility === 1 ? "hide" : "show"
//     } this item?`;

//     // Delay the confirmation alert by 500ms
//     setTimeout(async () => {
//       const userConfirmed = window.confirm(alertText);

//       if (userConfirmed) {
//         try {
//           const response = await axios.put(
//             `http://localhost:5051/api/isvisible/${id}`, // Backend endpoint
//             { isVisible: newVisibility }, // Payload with new visibility status
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem(
//                   "admin_access_token"
//                 )}`, // Token in headers
//               },
//             }
//           );

//           if (response.status === 200) {
//             handleFetchData(); // Refresh data
//             setTimeout(() => {
//               alert(response.data.message); // Notify success
//             }, 1000);
//           }
//         } catch (error) {
//           alert(`Failed to ${currentVisibility === 1 ? "hide" : "show"} item`);
//         }
//       }
//     }, 500); // 500ms delay for the confirmation alert
//   };

//   return (
//     <div>
//       <div>
//         <MyPagination/>
//       </div>
//       {isLoading ? (
//         <div className="overflow-hidden min-h-screen">
//           <div className="py-6 px-4 md:p-6 max-w-[1180px] mx-auto">
//             <div className="md:pl-0 overflow-hidden md:overflow-visible z-10 md:h-auto h-10 top-24 w-full md:w-auto md:flex items-center justify-between pr-2 pb-5">
//               <div className="flex items-center space-x-2 text-sm md:text-base">
//                 <p className="font-bold text-white">
//                   All News, {FecthData?.length} Results
//                 </p>
//                 <Link
//                   to={`/upload`}
//                   className="focus:outline-none select-none bg-[#14A4E3] text-white font-semibold rounded md:px-2.5 px-2.5 py-1 flex items-center justify-center space-x-1"
//                 >
//                   <FaPlusCircle className="text-sm" /> <span>Add</span>
//                 </Link>
//               </div>

//               <div
//                 className={`lg:flex hidden items-center space-x-3 text-xl ${
//                   FecthData?.length > 0 ? "" : "overflow-hidden w-0 h-0"
//                 }`}
//               >
//                 {startData > 0 ? (
//                   <button
//                     onClick={handlePrev}
//                     className="bg-gray-300 md:h-[36px] md:w-[36px] h-[32px] w-[32px] flex items-center justify-center rounded-full text-gray-500 transition-all duration-300 focus:outline-none select-none"
//                   >
//                     <IoIosArrowBack />
//                   </button>
//                 ) : (
//                   <button className="bg-gray-200 md:h-[36px] md:w-[36px] h-[32px] w-[32px] flex items-center justify-center rounded-full text-gray-500 transition-all duration-300 focus:outline-none select-none">
//                     <IoIosArrowBack />
//                   </button>
//                 )}
//                 <button className="md:text-base text-sm bg-white focus:outline-none select-none cursor-text md:px-2 px-1.5 py-1 rounded font-semibold">
//                   {listIndex}
//                 </button>

//                 {stopData < FecthData?.length - 1 ? (
//                   <button
//                     onClick={handleNext}
//                     className="bg-gray-300 md:h-[36px] md:w-[36px] h-[32px] w-[32px] flex items-center justify-center rounded-full text-gray-500 transition-all duration-300 focus:outline-none select-none"
//                   >
//                     <IoIosArrowForward />
//                   </button>
//                 ) : (
//                   <button className="bg-gray-200 md:h-[36px] md:w-[36px] h-[32px] w-[32px] flex items-center justify-center rounded-full text-gray-500 transition-all duration-300 focus:outline-none select-none">
//                     <IoIosArrowForward />
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div
//               className={`py-5 lg:block hidden bg-[#262D35] text-white border border-gray-700 rounded shadow bg-opacity-70 transition-all duration-300 ${
//                 FecthData?.length > 0 ? "" : " overflow-hidden w-0 h-0"
//               }`}
//             >
//               <div>
//                 <div className="grid grid-cols-9 gap-10 font-bold py-3 px-4 text-sm bg-[#374151]">
//                   <h2>#</h2>
//                   <h2>Photos</h2>
//                   <h2 className="col-span-2">Title</h2>
//                   <h2 className="col-span-2">Description</h2>
//                   <h2>Category</h2>
//                   <h2>CreateAt</h2>
//                   <h2>Action</h2>
//                 </div>

//                 <ul className="bg-[#1f242c]">
//                   {DataPagenation?.length > 0 &&
//                     DataPagenation.map((e, i) => (
//                       <li
//                         key={e._id}
//                         className="py-4 px-4 grid grid-cols-9 gap-8 items-center border-b border-gray-700 hover:shadow-lg transition-all duration-300"
//                       >
//                         <p className="font-semibold text-lg text-gray-200">
//                           {i + 1 + index}
//                         </p>

//                         <div className="w-20 h-14 flex items-center justify-center overflow-hidden rounded border border-gray-700">
//                           <img
//                             className="w-full h-full object-cover"
//                             src={
//                               e.photosDescription.length > 0 &&
//                               e.photosDescription.find(
//                                 (photoObj) =>
//                                   photoObj.photo && photoObj.photo !== ""
//                               )?.photo
//                             }
//                             alt=""
//                           />
//                         </div>

//                         <div className="col-span-2">
//                           <p className="font-medium text-gray-300 truncate capitalize">
//                             {e.title || "No Title"}
//                           </p>
//                         </div>

//                         <div className="col-span-2">
//                           <p className="text-gray-300 text-sm truncate">
//                             {e.photosDescription[0]?.description ||
//                               "No Description"}
//                           </p>
//                         </div>

//                         <p className="text-sm font-semibold text-gray-300">
//                           {e.category || "Uncategorized"}
//                         </p>

//                         <p className="text-sm text-gray-300">
//                           {e.createdAt.split("T")[0]}
//                         </p>

//                         <div className="relative group w-0">
//                           <button className="text-gray-300 hover:text-white outline-none focus:outline-none transition-all duration-300 transform hover:scale-105">
//                             <GoKebabHorizontal size={20} />
//                           </button>

//                           <div className="absolute top-5 -left-2 bg-gray-800 shadow-lg rounded border border-gray-700 p-2 hidden group-hover:block opacity-0 group-hover:opacity-100 flex-col text-sm text-gray-300 z-10 transition-opacity duration-300 ease-in-out">
//                             <Link
//                               to={`/details/${e._id}`}
//                               className="flex items-center gap-2 hover:bg-gray-700 px-2 w-full py-1 rounded outline-none focus:outline-none transition-colors duration-300"
//                             >
//                               <FaEye className="text-blue-500" />
//                               Preview
//                             </Link>

//                             <button
//                               onClick={() => handleDelete(e._id)}
//                               className="flex items-center gap-2 hover:bg-gray-700 px-2 w-full py-1 rounded outline-none focus:outline-none transition-colors duration-300"
//                             >
//                               <MdDelete className="text-red-500" />
//                               Delete
//                             </button>

//                             <Link
//                               to={`/edit/${e._id}`}
//                               className="flex items-center gap-2 hover:bg-gray-700 px-2 py-1 w-full rounded outline-none focus:outline-none transition-colors duration-300"
//                             >
//                               <RiPencilFill className="text-green-500" />
//                               Edit
//                             </Link>

//                             <div
//                               onClick={() =>
//                                 handleUpdateVisibility(e._id, e.isVisible)
//                               }
//                               className="flex items-center gap-2 hover:bg-gray-700 px-2 w-full py-1 rounded outline-none focus:outline-none transition-colors duration-300 cursor-pointer"
//                             >
//                               {e.isVisible ? (
//                                 <div className="flex items-center gap-2 outline-none focus:outline-none">
//                                   <BiSolidHide className="text-red-500" />
//                                   Hide
//                                 </div>
//                               ) : (
//                                 <div className="flex items-center gap-2 outline-none focus:outline-none">
//                                   <FaEye className="text-green-500" />
//                                   Show
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//             </div>

//             <ul className="grid grid-cols-1 md:grid-cols-2 lg:hidden lg:grid-cols-3 sm:grid-cols-2 gap-4 pt-2">
//               {FecthData?.length > 0 &&
//                 FecthData?.map((e, i) => (
//                   <li
//                     key={e._id}
//                     className="bg-[#2c343d] rounded overflow-hidden"
//                   >
//                     <div>
//                       <Link
//                         to={`/details/${e._id}`}
//                         className="relative focus:outline-none"
//                       >
//                         <img
//                           className="w-full h-56 object-cover"
//                           src={
//                             e.photosDescription.length > 0 &&
//                             e.photosDescription.find(
//                               (photoObj) =>
//                                 photoObj.photo && photoObj.photo !== ""
//                             )?.photo
//                           }
//                           alt={e.title}
//                         />
//                       </Link>
//                     </div>

//                     <div className="p-4 relative">
//                       <div>
//                         <div className="mb-2">
//                           <Link
//                             to={`/details/${e._id}`}
//                             className="focus:outline-none font-semibold text-white capitalize"
//                           >
//                             {e.category === "" ? "Null" : e.category}
//                           </Link>
//                         </div>

//                         <div className="text-gray-300 mt-2 truncate text-wrap">
//                           {e.title?.length > 100
//                             ? `${e.title.slice(0, 140)}...`
//                             : e.title}
//                         </div>

//                         <p className="text-gray-400 text-sm mt-2">
//                           {e.createdAt.split("T")[0]}
//                         </p>
//                       </div>

//                       <div className="text-gray-300 mt-2 flex items-center justify-between">
//                         <div className="pt-1">
//                           <button
//                             onClick={() =>
//                               handleUpdateVisibility(e._id, e.isVisible)
//                             }
//                             className="w-full select-none border border-gray-600 shadow focus:outline-none transition-all duration-300 hover:bg-gray-700"
//                           >
//                             {e.isVisible === 1 ? (
//                               <div className="w-full flex justify-start bg-gray-800 px-4 py-1 items-center space-x-1">
//                                 <BiSolidHide className="text-red-600" />
//                                 <p>Hide</p>
//                               </div>
//                             ) : (
//                               <div className="w-full flex justify-start bg-gray-800 px-4 py-1 items-center space-x-1">
//                                 <FaEye className="text-green-600" />
//                                 <p>Show</p>
//                               </div>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <FullPageLoader />
//       )}
//     </div>
//   );
// };

// export default NewsServicesPage;
