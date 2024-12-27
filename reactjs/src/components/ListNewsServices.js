import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { GoKebabHorizontal } from "react-icons/go";

function ListNewsServices({
  getCurrentItems,
  handleDelete,
  handleUpdateVisibility,
  FecthData,
  currentPage,
  itemsPerPage,
}) {
  return (
    <div>
      <div
        className={`py-5 lg:block hidden bg-[#262D35] text-white border border-gray-700 rounded shadow bg-opacity-70 transition-all duration-300 ${
          FecthData?.length > 0 ? "" : " overflow-hidden w-0 h-0"
        }`}
      >
        <div>
          <div className="grid grid-cols-9 gap-10 font-bold py-3 px-4 text-sm bg-[#374151]">
            <h2>#</h2>
            <h2>Photos</h2>
            <h2 className="col-span-2">Title</h2>
            <h2 className="col-span-2">Description</h2>
            <h2>Category</h2>
            <h2>CreateAt</h2>
            <h2>Action</h2>
          </div>

          <ul className="bg-[#1f242c]">
            {getCurrentItems()?.length > 0 &&
              getCurrentItems()?.map((e, i) => {
                const calculatedIndex = i + 1 + currentPage * itemsPerPage;
                return (
                  <li
                    key={e._id}
                    className="py-4 px-4 grid grid-cols-9 gap-8 items-center border-b border-gray-700 hover:shadow-lg transition-all duration-300"
                  >
                    <p className="font-semibold text-lg text-gray-200">
                      {calculatedIndex}
                    </p>

                    <div className="w-20 h-14 flex items-center justify-center overflow-hidden rounded border border-gray-700">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          e.photosDescription.length > 0 &&
                          e.photosDescription.find(
                            (photoObj) =>
                              photoObj.photo && photoObj.photo !== ""
                          )?.photo
                        }
                        alt=""
                      />
                    </div>

                    <div className="col-span-2">
                      <p className="font-medium text-sm text-gray-300 truncate capitalize">
                        {e.title || "No Title"}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-gray-300 text-sm truncate">
                        {e.photosDescription[0]?.description ||
                          "No Description"}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-gray-300">
                      {e.category || "Uncategorized"}
                    </p>

                    <p className="text-sm text-gray-300">
                      {e.createdAt.split("T")[0]}
                    </p>

                    <div className="relative group w-0">
                      <button className="text-gray-300 hover:text-white outline-none focus:outline-none transition-all duration-300 transform hover:scale-105">
                        <GoKebabHorizontal size={20} />
                      </button>

                      <div className="absolute top-5 -left-2 bg-gray-800 shadow-lg rounded border border-gray-700 p-2 hidden group-hover:block opacity-0 group-hover:opacity-100 flex-col text-sm text-gray-300 z-10 transition-opacity duration-300 ease-in-out">
                        <Link
                          to={`/details/${e._id}`}
                          className="flex items-center gap-2 hover:bg-gray-700 px-2 w-full py-1 rounded outline-none focus:outline-none transition-colors duration-300"
                        >
                          <FaEye className="text-blue-500" />
                          Preview
                        </Link>

                        <button
                          onClick={() => handleDelete(e._id)}
                          className="flex items-center gap-2 hover:bg-gray-700 px-2 w-full py-1 rounded outline-none focus:outline-none transition-colors duration-300"
                        >
                          <MdDelete className="text-red-500" />
                          Delete
                        </button>

                        <Link
                          to={`/edit/${e._id}`}
                          className="flex items-center gap-2 hover:bg-gray-700 px-2 py-1 w-full rounded outline-none focus:outline-none transition-colors duration-300"
                        >
                          <RiPencilFill className="text-green-500" />
                          Edit
                        </Link>

                        <div
                          onClick={() =>
                            handleUpdateVisibility(e._id, e.isVisible)
                          }
                          className="flex items-center gap-2 hover:bg-gray-700 px-2 w-full py-1 rounded outline-none focus:outline-none transition-colors duration-300 cursor-pointer"
                        >
                          {e.isVisible ? (
                            <div className="flex items-center gap-2 outline-none focus:outline-none">
                              <BiSolidHide className="text-red-500" />
                              Hide
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 outline-none focus:outline-none">
                              <FaEye className="text-green-500" />
                              Show
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:hidden lg:grid-cols-3 sm:grid-cols-2 gap-4 pt-2">
        {FecthData?.length > 0 &&
          FecthData?.map((e, i) => (
            <li key={e._id} className="bg-[#2c343d] rounded overflow-hidden">
              <div>
                <Link
                  to={`/details/${e._id}`}
                  className="relative focus:outline-none"
                >
                  <img
                    className="w-full h-56 object-cover"
                    src={
                      e.photosDescription.length > 0 &&
                      e.photosDescription.find(
                        (photoObj) => photoObj.photo && photoObj.photo !== ""
                      )?.photo
                    }
                    alt={e.title}
                  />
                </Link>
              </div>

              <div className="p-4 relative">
                <div>
                  <div className="mb-2">
                    <Link
                      to={`/details/${e._id}`}
                      className="focus:outline-none font-semibold text-white capitalize"
                    >
                      {e.category === "" ? "Null" : e.category}
                    </Link>
                  </div>

                  <div className="text-gray-300 mt-2 truncate text-wrap">
                    {e.title?.length > 100
                      ? `${e.title.slice(0, 140)}...`
                      : e.title}
                  </div>

                  <p className="text-gray-400 text-sm mt-2">
                    {e.createdAt.split("T")[0]}
                  </p>
                </div>

                <div className="text-gray-300 mt-2 flex items-center justify-between">
                  <div className="pt-1">
                    <button
                      onClick={() => handleUpdateVisibility(e._id, e.isVisible)}
                      className="w-full select-none border border-gray-600 shadow focus:outline-none transition-all duration-300 hover:bg-gray-700"
                    >
                      {e.isVisible === 1 ? (
                        <div className="w-full flex justify-start bg-gray-800 px-4 py-1 items-center space-x-1">
                          <BiSolidHide className="text-red-600" />
                          <p>Hide</p>
                        </div>
                      ) : (
                        <div className="w-full flex justify-start bg-gray-800 px-4 py-1 items-center space-x-1">
                          <FaEye className="text-green-600" />
                          <p>Show</p>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ListNewsServices;
