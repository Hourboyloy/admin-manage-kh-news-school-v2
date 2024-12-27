import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { FaTimes } from "react-icons/fa"; // Import the remove icon
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Admin_access_token = () => {
  return localStorage.getItem("admin_access_token");
};

const InsertForm = ({ categories, url }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [photosDescriptions, setPhotosDescriptions] = useState([
    { photo: null, description: "", preview: null },
  ]);

  // Handle file change for a specific index
  const handleFileChange = (e, index) => {
    const files = e.target.files;
    const newFile = files && files[0]; // Add a null check here

    if (!newFile) {
      // If no file is selected, exit the function early
      return;
    }

    // Check for duplicate images
    const isDuplicate = photosDescriptions.some(
      (item, i) =>
        item.photo &&
        i !== index &&
        item.photo.name === newFile.name &&
        item.photo.lastModified === newFile.lastModified
    );

    if (isDuplicate) {
      alert("This image is already selected. Please choose a different image.");
      e.target.value = "";
      return;
    }

    // Check file dimensions
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      if (img.height > img.width && index === 0) {
        alert(
          "The image's height is greater than its width. Please select another image."
        );
        e.target.value = ""; // Clear the file input
        return;
      }

      const newPhotosDescriptions = [...photosDescriptions];
      newPhotosDescriptions[index] = {
        ...newPhotosDescriptions[index],
        photo: newFile,
        preview: URL.createObjectURL(newFile),
      };
      setPhotosDescriptions(newPhotosDescriptions);
    };

    img.onerror = () => {
      alert("Failed to load the image. Please select a valid image file.");
    };

    reader.readAsDataURL(newFile);

    // const newPhotosDescriptions = [...photosDescriptions];
    // newPhotosDescriptions[index] = {
    //   ...newPhotosDescriptions[index],
    //   photo: newFile,
    //   preview: URL.createObjectURL(newFile), // This will now work if `newFile` is valid
    // };
    // setPhotosDescriptions(newPhotosDescriptions);
  };

  // Handle description change for a specific index
  const handleDescriptionChange = (e, index) => {
    const value = e.target.value;
    const newPhotosDescriptions = [...photosDescriptions];
    newPhotosDescriptions[index].description = value;
    setPhotosDescriptions(newPhotosDescriptions);
  };

  // Add a new photo-description pair
  const handleAddPair = () => {
    setPhotosDescriptions([
      ...photosDescriptions,
      { photo: null, description: "", preview: null },
    ]);
  };

  const handleRemovePair = (index) => {
    const filterPhotosDescriptions = photosDescriptions.filter(
      (e, i) => i !== index
    );
    setPhotosDescriptions(filterPhotosDescriptions);
  };

  // Handle Remove image and reset input
  const handleRemoveImage = (index) => {
    const newPhotosDescriptions = [...photosDescriptions];
    newPhotosDescriptions[index].photo = null;
    newPhotosDescriptions[index].preview = null;

    // Reset the file input value
    document.getElementById(`fileInput-${index}`).value = "";

    setPhotosDescriptions(newPhotosDescriptions);
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setPhotosDescriptions([{ photo: null, description: "", preview: null }]);
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => (input.value = "")); // Reset all file input elements
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (photosDescriptions.every((p) => !p.description)) {
      setTimeout(() => {
        alert("Descriptions must have at least one");
      }, 500);
      return;
    }

    if (photosDescriptions.every((p) => !p.photo)) {
      setTimeout(() => {
        alert("Photo must have at least one");
      }, 500);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    photosDescriptions.forEach((item, index) => {
      formData.append("photos", item.photo);
      if (!item.photo) {
        formData.append("nullphotos", index);
      }
      // Append the description (if it exists, otherwise an empty string)
      formData.append("description", item.description ? item.description : "");
    });

    try {
      const response = await axios.post(`${url}/api/create-news`, formData, {
        headers: {
          Authorization: `Bearer ${Admin_access_token()}`,
        },
      });

      if (response.data.success) {
        setLoading(false);
        setTimeout(() => {
          alert("News created successfully!");
        }, 2000);

        resetForm();
      }
    } catch (error) {
      console.error("Error creating news:", error);
      setLoading(false);
      setTimeout(() => {
        alert("Failed to create news");
      }, 2000);
    }
  };

  const [uploadingMessage, setUploadingMessage] = useState(".");

  useEffect(() => {
    if (isLoading) {
      let dotsCount = 0;
      const id = setInterval(() => {
        dotsCount = (dotsCount + 1) % 3;
        setUploadingMessage(".".repeat(dotsCount + 1));
      }, 500);

      return () => clearInterval(id);
    } else {
      setUploadingMessage(".");
    }
  }, [isLoading]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-[700px] mx-auto md:p-8 p-4 bg-[#262D35] rounded shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">
        Create News
      </h2>

      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Add a title"
          className="w-full px-3 py-2 border border-gray-700 bg-[#262D35] text-gray-300 rounded focus:outline-none text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">
          Category
        </label>

        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-700 bg-[#262D35] text-gray-300 rounded focus:outline-none text-sm"
        >
          <option>Choose</option>
          {categories?.length > 0 &&
            categories?.map((e, i) => (
              <option key={e + i} value={e.name}>
                {e.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex items-center justify-center pt-4">
        <label className="block text-gray-300 text-xs font-semibold mb-2">
          *You can skip photo or description any one
        </label>
      </div>

      {photosDescriptions.length > 0 &&
        photosDescriptions.map((item, index) => (
          <div key={index} className="mb-4 relative">
            <div className="w-full">
              <label className="block text-gray-300 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={item.description}
                onChange={(e) => handleDescriptionChange(e, index)}
                placeholder="Add a description"
                className="w-full h-36 px-3 py-2 border border-gray-700 bg-[#262D35] text-gray-300 rounded focus:outline-none text-sm"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Photo
              </label>
              <input
                id={`fileInput-${index}`}
                type="file"
                onChange={(e) => handleFileChange(e, index)}
                accept="image/*"
                className="text-gray-300 border border-gray-300 rounded cursor-pointer focus:outline-none hidden w-0 h-0"
              />
              <label
                htmlFor={`fileInput-${index}`}
                className={`border-[#007DB0] bg-[#262D35] text-[#007DB0] cursor-pointer flex items-center justify-center border w-40 px-3 py-2.5 text-sm select-none rounded hover:scale-95 bg-opacity-50 focus:outline-none transition-all ease-in-out duration-300`}
              >
                <FiUpload className="text-lg mr-2 text-[#007DB0]" />
                <span>{item.preview ? "Change" : "Upload"} Photo</span>
              </label>

              {item?.preview && (
                <div className="mt-2 relative overflow-hidden flex items-center justify-center rounded border border-gray-700">
                  <img
                    src={item?.preview}
                    alt={`Preview ${index + 1}`}
                    className="rounded"
                  />
                  {/* Remove Icon */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded p-1.5 hover:bg-red-700"
                  >
                    <FaTimes className="" />
                  </button>
                </div>
              )}
            </div>

            <div
              onClick={() => handleRemovePair(index)}
              className="border border-gray-700 font-semibold mt-4 py-1 text-sm cursor-pointer text-red-600 rounded text-center select-none"
            >
              Remove
            </div>
          </div>
        ))}

      <div className="mb-4 flex items-center justify-center">
        <button
          type="button"
          onClick={handleAddPair} // Uncomment if you want to add more photo-description pairs
          className="py-2 px-10 border border-green-600 text-sm font-semibold bg-[#262D35] opacity-90 rounded hover:scale-95 transition-all duration-200 outline-none select-none focus:outline-none"
        >
          <span className="text-green-600">Add More</span>
        </button>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-gray-400 hover:bg-gray-300 rounded-md text-sm shadow-md transition-all duration-200 outline-none select-none focus:outline-none"
        >
          <FiArrowLeft className="mr-2 text-gray-700" />
          Back
        </button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={isLoading}
          className="w-24 py-2 bg-[#007DB0] transition-all duration-200 text-white text-sm rounded-md shadow-md outline-none select-none focus:outline-none"
        >
          {isLoading ? (
            <div className="text-start pl-5 select-none">
              Submit <span className="text-start">{uploadingMessage}</span>
            </div>
          ) : (
            <p className="select-none">Submit</p>
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default InsertForm;
