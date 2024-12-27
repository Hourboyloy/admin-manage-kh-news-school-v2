import React from "react";
import { id_bg } from "./ID_BG";

const BackgroundImgServices = ({
  background,
  handleSetImageById,
  handleDeleteImageById,
  handleImageUpload,
  message,
}) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg py-8 px-4 md:px-5 lg:p-8 w-full max-w-5xl text-center">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-800 mb-4">
          Background Images
        </h1>

        {/* Professional "Add Image" Button */}
        <div className="mb-6">
          <label
            htmlFor="upload-image"
            className="cursor-pointer inline-block bg-blue-600 text-white font-semibold px-6 text-sm md:py-3 py-3 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add Background
          </label>
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Display uploaded images */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {background?.length > 0 &&
            background.map((e, index) => (
              <div key={index} className="relative">
                {/* Image preview */}
                <img
                  src={`${e.bgurl}`}
                  alt={`Background ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md border"
                />

                {/* Set as background button */}
                {id_bg() === e._id ? (
                  <button
                    className={`absolute top-2 left-2 bg-green-600 text-white text-sm px-3 py-1 rounded-md focus:outline-none select-none`}
                  >
                    Seted
                  </button>
                ) : e.seted && id_bg() === "" ? (
                  <button
                    className={`absolute top-2 bg-green-600 left-2 text-white text-sm px-3 py-1 rounded-md focus:outline-none select-none`}
                  >
                    Seted
                  </button>
                ) : (
                  <button
                    onClick={() => handleSetImageById(e._id)}
                    className={`absolute top-2 bg-blue-600 left-2 text-white text-sm px-3 py-1 rounded-md focus:outline-none select-none`}
                  >
                    Set Background
                  </button>
                )}

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteImageById(e._id)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-sm px-3 py-1 rounded-md focus:outline-none select-none hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>

        {message !== "" ? (
          <p className="text-center text-red-500">{message}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BackgroundImgServices;
