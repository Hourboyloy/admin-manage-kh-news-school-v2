import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa"; // Edit and Remove icons
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Admin_access_token = () => {
  return localStorage.getItem("admin_access_token");
};

const EditForm = ({ news, categories, url }) => {

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState(news.title);
  const [category, setCategory] = useState(news.category);
  const [photosDescriptions, setPhotosDescriptions] = useState(
    news.photosDescription
  );

  const [AddphotosDescriptions, setAddPhotosDescriptions] = useState([]);
  const [updatePhoto, setUpdatePhoto] = useState([]);
  const [updateDescriptions, setUpdateDescriptions] = useState([]);
  const [updateIndices, setUpdateIndices] = useState([]);
  const [descriptionUpdateIndex, setDescriptionUpdateIndex] = useState([]);
  const [descriptionRemoveIndex, setDescriptionRemoveIndex] = useState([]);
  const [photoRemoveIndex, setPhotoRemoveIndex] = useState([100]);
  const [removeIndices, setRemoveIndices] = useState([]);

  // Handle file change for a specific index
  // const handleFileChange = (e, index) => {
  //   const files = e.target.files;
  //   const newFile = files && files[0];

  //   if (!newFile) return;

  //   // Check for duplicate images
  //   const isDuplicate = photosDescriptions.some(
  //     (item, i) =>
  //       item.photo &&
  //       i !== index &&
  //       item.photo.name === newFile.name &&
  //       item.photo.lastModified === newFile.lastModified
  //   );

  //   if (isDuplicate) {
  //     alert("This image is already selected. Please choose a different image.");
  //     e.target.value = "";
  //     return;
  //   }

  //   const newPhotosDescriptions = [...photosDescriptions];

  //   newPhotosDescriptions[index] = {
  //     ...newPhotosDescriptions[index],
  //     photo: newFile,
  //     preview: URL.createObjectURL(newFile),
  //   };

  //   setPhotosDescriptions(newPhotosDescriptions);

  //   setUpdatePhoto((prevUpdatePhoto) => {
  //     const updatedPhotos = [...prevUpdatePhoto];
  //     updatedPhotos[index] = newFile; // Store the updated file
  //     return updatedPhotos;
  //   });

  //   setRemoveIndices((prev) => {
  //     // Ensure `prev` is an array
  //     const currentIndices = prev || [];

  //     if (e.target.files) {
  //       // Remove the `index` if files exist
  //       const getIndex = currentIndices.filter((i) => i === index);
  //       setDescriptionRemoveIndex((prev) => [...prev, ...getIndex]);
  //       return currentIndices.filter((i) => i !== index);
  //     }

  //     // If no files, return the current state
  //     return currentIndices;
  //   });

  //   // Update updateIndices state
  //   setUpdateIndices((prevUpdateIndices) => {
  //     if (!prevUpdateIndices.includes(index)) {
  //       return [...prevUpdateIndices, index];
  //     }
  //     return prevUpdateIndices;
  //   });

  //   //remove index that like in photoRemoveIndex
  //   setPhotoRemoveIndex((prev) => prev.filter((i) => i !== index));
  //   setRemoveIndices((prev) => prev.filter((i) => i !== index));
  // };

  const handleFileChange = (e, index) => {
    const files = e.target.files;
    const newFile = files && files[0];

    if (!newFile) return;

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

    // Create an image element to check dimensions
    const img = new Image();
    const objectUrl = URL.createObjectURL(newFile);

    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;

      if (naturalHeight > naturalWidth && index === 0) {
        alert(
          "Image height cannot be greater than width. Please choose another image."
        );
        e.target.value = ""; // Clear the input
        URL.revokeObjectURL(objectUrl); // Free up memory
        return;
      }

      // Update photosDescriptions
      const updatedPhotosDescriptions = [...photosDescriptions];
      updatedPhotosDescriptions[index] = {
        ...updatedPhotosDescriptions[index],
        photo: newFile,
        preview: objectUrl, // Use the same object URL for preview
      };
      setPhotosDescriptions(updatedPhotosDescriptions);

      // Update updatePhoto
      setUpdatePhoto((prevUpdatePhoto) => {
        const updatedPhotos = [...prevUpdatePhoto];
        updatedPhotos[index] = newFile;
        return updatedPhotos;
      });

      // Remove the index from removeIndices and photoRemoveIndex if it exists
      setRemoveIndices((prev) => prev.filter((i) => i !== index));
      setPhotoRemoveIndex((prev) => prev.filter((i) => i !== index));

      // Add the index to updateIndices if not already present
      setUpdateIndices((prevUpdateIndices) => {
        if (!prevUpdateIndices.includes(index)) {
          return [...prevUpdateIndices, index];
        }
        return prevUpdateIndices;
      });
    };

    img.onerror = () => {
      alert("Failed to load image. Please select a valid image file.");
      e.target.value = ""; // Clear the input
      URL.revokeObjectURL(objectUrl); // Free up memory
    };

    img.src = objectUrl; // Trigger the image load
  };

  // Remove image at a specific index
  const handleRemoveImage = (index) => {
    // Update the photoRemoveIndex state to track removed indices
    setPhotoRemoveIndex((prevPhotoRemoveIndex) => {
      if (!prevPhotoRemoveIndex.includes(index)) {
        return [...prevPhotoRemoveIndex, index];
      }
      return prevPhotoRemoveIndex;
    });

    // Filter out the removed index from updateIndices
    setUpdateIndices((prevUpdateIndices) =>
      prevUpdateIndices.filter((i) => i !== index)
    );

    // Filter out the removed index from updatePhoto
    setUpdatePhoto((prevUpdatePhoto) => {
      const updatedPhotos = [...prevUpdatePhoto];
      updatedPhotos[index] = undefined; // Remove photo at the index
      return updatedPhotos;
    });

    // Optionally, update photosDescriptions to clear the photo at this index
    setPhotosDescriptions((prevPhotosDescriptions) => {
      const updatedDescriptions = [...prevPhotosDescriptions];
      updatedDescriptions[index] = {
        ...updatedDescriptions[index],
        photo: null,
        preview: null,
      };
      return updatedDescriptions;
    });
  };

  // Handle description change
  const handleDescriptionChange = (e, index) => {
    const newPhotosDescriptions = [...photosDescriptions];
    newPhotosDescriptions[index] = {
      ...newPhotosDescriptions[index],
      description: e.target.value,
    };

    setPhotosDescriptions(newPhotosDescriptions);

    setUpdateDescriptions((prev) => {
      const updateDescriptions = [...prev];
      updateDescriptions[index] = e.target.value;
      return updateDescriptions;
    });

    setDescriptionUpdateIndex((prev) => {
      if (e.target.value === "") {
        // Remove index if value is empty
        return prev.filter((i) => i !== index);
      } else if (!prev.includes(index)) {
        // Add index if not already present
        return [...prev, index];
      }
      return prev; // No changes
    });

    setDescriptionRemoveIndex((prev) => {
      if (e.target.value === "") {
        if (!prev.includes(index)) return [...prev, index];
      } else if (e.target.value !== "") {
        return prev.filter((i) => i !== index);
      }
      return prev; // No changes
    });

    setRemoveIndices((prev) => {
      // Ensure `prev` is an array
      const currentIndices = prev || [];

      if (e.target.value !== "") {
        // Remove the `index` if files exist
        const getIndex = currentIndices.filter((i) => i === index);
        setPhotoRemoveIndex((prev) => [...prev, ...getIndex]);
        return currentIndices.filter((i) => i !== index);
      }

      // If no files, return the current state
      return currentIndices;
    });
  };

  // Handle input field changes and log them
  const handleInputChange = (e, field) => {
    const value = e.target.value;

    if (field === "title") {
      setTitle(value);
    } else if (field === "category") {
      setCategory(value);
    }
  };

  const handleRemovePhotosDescriptions = useCallback(() => {
    // Step 1: Identify original indices for empty descriptions and photos
    const descriptionIndicesOriginal = photosDescriptions
      ?.map((e, i) => (e.description === "" ? i : null))
      .filter((index) => index !== null);

    const photoIndicesOriginal = photosDescriptions
      ?.map((e, i) => (e.photo === "" ? i : null))
      .filter((index) => index !== null);

    // Step 2: Find common indices
    const IndicesFromOriginal = photoIndicesOriginal.filter((index) =>
      descriptionIndicesOriginal.includes(index)
    );

    const IndicesFromOriginalWithForm1 = descriptionIndicesOriginal.filter(
      (index) => photoRemoveIndex.includes(index)
    );

    const IndicesFromOriginalWithForm2 = photoIndicesOriginal.filter((index) =>
      descriptionRemoveIndex.includes(index)
    );

    const IndicesFromForm = photoRemoveIndex.filter((index) =>
      descriptionRemoveIndex.includes(index)
    );

    // Step 3: Combine all indices and ensure uniqueness
    const combinedIndices = Array.from(
      new Set([
        ...IndicesFromOriginal,
        ...IndicesFromForm,
        ...IndicesFromOriginalWithForm1,
        ...IndicesFromOriginalWithForm2,
      ])
    );
    // Step 4: Exit early if there are no updates
    if (combinedIndices.length === 0) return;

    // Step 5: Only update state if necessary
    setRemoveIndices((prevIndices) => {
      // const newIndices = [...(prevIndices || []), ...combinedIndices];
      // return newIndices.length === prevIndices.length
      //   ? prevIndices
      //   : newIndices;
      const newIndices = [...new Set([...prevIndices, ...combinedIndices])];
      return newIndices.length === prevIndices.length
        ? prevIndices
        : newIndices;
    });

    setPhotoRemoveIndex((prev) => {
      const newPhotoIndices = prev.filter(
        (index) => !combinedIndices.includes(index)
      );
      return newPhotoIndices.length === prev.length ? prev : newPhotoIndices;
    });

    setDescriptionRemoveIndex((prev) => {
      const newDescriptionIndices = prev.filter(
        (index) => !combinedIndices.includes(index)
      );
      return newDescriptionIndices.length === prev.length
        ? prev
        : newDescriptionIndices;
    });
  }, [photosDescriptions, photoRemoveIndex, descriptionRemoveIndex]);

  useEffect(() => {
    if (photoRemoveIndex.length > 0 || descriptionRemoveIndex.length > 0) {
      handleRemovePhotosDescriptions();
    }
  }, [
    photoRemoveIndex,
    descriptionRemoveIndex,
    handleRemovePhotosDescriptions,
  ]);

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

  // state add new description photo

  const handleRemoveAddImage = (index) => {
    const newPhotosDescriptions = [...AddphotosDescriptions];
    newPhotosDescriptions[index].photo = null;
    newPhotosDescriptions[index].preview = null;

    // Reset the file input value
    document.getElementById(`fileInputTwo-${index}`).value = "";

    setAddPhotosDescriptions(newPhotosDescriptions);
  };

  const handleAddNewDescriptionChange = (e, index) => {
    const value = e.target.value;
    const newPhotosDescriptions = [...AddphotosDescriptions];
    newPhotosDescriptions[index].description = value;
    setAddPhotosDescriptions(newPhotosDescriptions);
  };

  // Handle file change for a specific index
  const handleAddNewPhotoFileChange = (e, index) => {
    const files = e.target.files;
    const newFile = files && files[0]; // Add a null check here

    if (!newFile) {
      // If no file is selected, exit the function early
      return;
    }

    // Check for duplicate images
    const isDuplicate = AddphotosDescriptions.some(
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

    const newPhotosDescriptions = [...AddphotosDescriptions];
    newPhotosDescriptions[index] = {
      ...newPhotosDescriptions[index],
      photo: newFile,
      preview: URL.createObjectURL(newFile), // This will now work if `newFile` is valid
    };
    setAddPhotosDescriptions(newPhotosDescriptions);
  };

  // Add a new photo-description pair
  const handleAddPair = () => {
    setAddPhotosDescriptions([
      ...AddphotosDescriptions,
      { photo: null, description: "", preview: null },
    ]);
  };

  const handleRemovePair = (index) => {
    const filterPhotosDescriptions = AddphotosDescriptions.filter(
      (e, i) => i !== index
    );
    setAddPhotosDescriptions(filterPhotosDescriptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (title !== news.title) {
      formData.append("title", title);
    }

    if (category !== news.category) {
      formData.append("category", category);
    }

    if (updateDescriptions.length > 0) {
      const filterUpdateDescriptions = updateDescriptions.filter(
        (item) => item !== "" && item !== undefined
      );
      filterUpdateDescriptions.forEach((description, i) => {
        formData.append(`updateDescription[${i}]`, description);
      });
    }

    if (descriptionUpdateIndex.length > 0) {
      formData.append("descriptionUpdateIndex", descriptionUpdateIndex);
    }

    if (updatePhoto.length > 0) {
      const filterFile = updatePhoto.filter((e) => e !== undefined);
      filterFile.forEach((file) => {
        if (!(file instanceof File)) {
          console.error("Invalid file:", file);
        } else {
          formData.append("updatePhoto", file);
        }
      });
    }

    if (updateIndices.length > 0) {
      formData.append("updateIndices", updateIndices);
    }

    if (photoRemoveIndex.length > 1) {
      const filterSkip100 = await photoRemoveIndex.filter(
        (index) => index !== 100
      );
      formData.append("photoRemoveIndex", filterSkip100);
    }

    if (descriptionRemoveIndex.length > 0) {
      formData.append("descriptionRemoveIndex", descriptionRemoveIndex);
    }

    if (removeIndices?.length > 0) {
      formData.append("removeIndices", removeIndices);
    }

    if (
      AddphotosDescriptions.length > 0 &&
      AddphotosDescriptions.every((p) => p.description || p.photo)
    ) {
      AddphotosDescriptions.forEach((item, index) => {
        if (!item.photo) {
          formData.append("nullphotos", index);
        }
        formData.append("addPhoto", item.photo);
        formData.append("addDescription", item.description);
      });
    }

    if (!formData || formData.entries().next().done) {
      setTimeout(() => {
        alert("No changes to submit");
      }, 2000);
      return; // Exit if formData is empty or undefined
    }

    try {
      setLoading(true);
      const responce = await axios.put(
        `${url}/api/update-news/${news._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Admin_access_token()}`,
          },
        }
      );
      if (responce.status === 200) {
        setLoading(false);
        setTimeout(() => {
          alert("Edited successfuly");
          navigate(`/details/${news._id}`);
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-[700px] mx-auto lg:p-6 md:p-8 p-4 bg-[#262D35]  border border-gray-700 rounded shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">
        Edit News
      </h2>

      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleInputChange(e, "title")}
          required
          placeholder="Add a title"
          className="w-full px-3 py-2.5 bg-[#262D35] text-gray-200 border border-gray-600 rounded focus:outline-none text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">
          Category
        </label>
        <select
          required
          value={category}
          onChange={(e) => handleInputChange(e, "category")}
          className="w-full px-3 py-2.5 bg-[#262D35] text-gray-200 border border-gray-600 rounded focus:outline-none text-sm"
        >
          <option value="">Choose</option>
          {categories?.length > 0 &&
            categories?.map((e, i) => (
              <option key={e + i} value={e.name}>
                {e.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        {photosDescriptions.length > 0 &&
          photosDescriptions?.map((item, index) => (
            <div key={index} className="mb-4 relative space-y-1">
              <div className="w-full">
                <label className="block text-gray-300 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) => handleDescriptionChange(e, index)}
                  placeholder="Add a description"
                  className="w-full h-36 px-3 py-2.5 bg-[#262D35] text-gray-200 border border-gray-600 rounded focus:outline-none text-sm"
                ></textarea>
              </div>

              {item.photo !== null && item.photo !== "" ? (
                <div className="w-full rounded overflow-hidden border border-gray-700 flex items-center justify-center relative">
                  {/* Check if item.photo is a File object */}
                  <div>
                    {item.photo && item.photo instanceof File ? (
                      <img
                        className="rounded-md"
                        src={URL.createObjectURL(item.photo)}
                        alt={`Preview ${index}`}
                      />
                    ) : (
                      item.photo && (
                        <img
                          className="w-full rounded shadow-md"
                          src={item.photo}
                          alt={`Preview ${index}`} // If it's not a file, assume it's a URL
                        />
                      )
                    )}
                    {/* Buttons positioned on top of the image */}
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-white bg-red-600 rounded-full p-2"
                      >
                        <FaTrashAlt />
                      </button>
                      <input
                        id={`file-upload-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, index)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`file-upload-${index}`}
                        className="text-white bg-[#007DB0] rounded-full p-2 cursor-pointer"
                      >
                        <FaEdit />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    id={`file-upload-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, index)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className={`border-[#007DB0] cursor-pointer flex items-center justify-center border w-48 px-3 py-2.5 text-sm select-none rounded bg-[#262D35] hover:scale-95 bg-opacity-50 focus:outline-none transition duration-300 ease-in-out`}
                  >
                    <FiUpload className="text-lg mr-2 text-[#007DB0]" />
                    <span className="text-[#007DB0]">
                      Upload For Edit Photo
                    </span>
                  </label>
                </div>
              )}
            </div>
          ))}
      </div>

      {AddphotosDescriptions?.length > 0 &&
        AddphotosDescriptions.map((item, index) => (
          <div key={index} className="mb-4 relative">
            <div className="w-full">
              <label className="block text-gray-300 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={item?.description}
                onChange={(e) => handleAddNewDescriptionChange(e, index)}
                placeholder="Add a description"
                className="w-full h-36 px-3 py-2.5 bg-[#262D35] text-gray-200 border border-gray-600 rounded focus:outline-none text-sm"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Photo
              </label>
              <input
                id={`fileInputTwo-${index}`}
                type="file"
                onChange={(e) => handleAddNewPhotoFileChange(e, index)}
                accept="image/*"
                className="text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none hidden w-0 h-0"
              />
              <label
                htmlFor={`fileInputTwo-${index}`}
                className={`border-[#007DB0] cursor-pointer flex items-center justify-center border w-40 px-3 py-2.5 text-sm select-none rounded bg-[#262D35] hover:scale-95  text-green-600 bg-opacity-50 focus:outline-none transition duration-300 ease-in-out`}
              >
                <FiUpload className="text-lg mr-2 text-[#007DB0]" />
                <span>{item.preview ? "Change" : "Upload"} Photo</span>
              </label>

              {item?.preview && (
                <div className="mt-2 relative overflow-hidden flex items-center justify-center rounded">
                  <img
                    src={item?.preview}
                    alt={`Preview ${index + 1}`}
                    className="rounded shadow-md"
                  />
                  {/* Remove Icon */}
                  <button
                    type="button"
                    onClick={() => handleRemoveAddImage(index)}
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

export default EditForm;
