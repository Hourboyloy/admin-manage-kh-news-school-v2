import axios from "axios";
import React, { useEffect, useState } from "react";
import BackgroundImgServices from "../components/BackgroundImgServices";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import { id_bg } from "../components/ID_BG";

function BackgroundPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [background, setBG] = useState([]); // Initialize as an empty array

  const handleFetchDataBG = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5051/background-getAll"
      );
      if (response.status === 200) {
        setIsLoading(false);
        setBG(response.data.reverse());
      }
    } catch (error) {
      setMessage("Failed to fetch background images. Please try again.");
      setIsLoading(false);
    } finally {
    }
  };

  useEffect(() => {
    handleFetchDataBG();
  }, []);

  // Disable scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("prevent-scroll"); // Add class to prevent scrolling
    } else {
      document.body.classList.remove("prevent-scroll"); // Ensure scrollbar is removed
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("prevent-scroll");
    };
  }, [isLoading]);

  useEffect(() => {
    if (background && background.length > 0) {
      const selectedBackground = background.filter((e) => e.seted);
      if (selectedBackground.length > 0) {
        localStorage.setItem(
          "background",
          JSON.stringify(selectedBackground[0]) // Storing the first matching element
        );
      } else {
        localStorage.setItem(
          "background",
          JSON.stringify({
            _id: "67038645acf47da05c70387",
            bgurl:
              "https://res.cloudinary.com/doathl3dp/image/upload/v1728284228/duvozzy3fejlwdnnqpy3",
            seted: false,
            cloadinary_id: "duvozzy3fejlwdnnqpy3",
            createdAt: "2023-10-07T06:57:09.062Z",
            __v: 0,
          })
        );
      }
    }
  }, [background]);

  const handleSetImageById = async (imageId) => {
    try {
      const adminToken = localStorage.getItem("admin_access_token");
      const responseSetbg = await axios.put(
        `http://localhost:5051/set-bg/${imageId}`,
        {}, // Assuming no body data is needed; modify if required
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      if (responseSetbg.data.message === "set background successfuly") {
        alert("Background set successfully");
        // handleFetchDataBG();
        localStorage.setItem(
          "background",
          JSON.stringify(responseSetbg.data.updatedDocument)
        );
        navigate("/background");
      }
    } catch (error) {
      alert("Error retrieving image");
      console.error(error);
    }
  };

  const handleDeleteImageById = async (imageId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5051/background-remove/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Image deleted successfully");
        if (imageId === id_bg()) {
          localStorage.setItem(
            "background",
            JSON.stringify({
              _id: "67038645acf47da05c70387",
              bgurl:
                "https://res.cloudinary.com/doathl3dp/image/upload/v1728284228/duvozzy3fejlwdnnqpy3",
              seted: false,
              cloadinary_id: "duvozzy3fejlwdnnqpy3",
              createdAt: "2023-10-07T06:57:09.062Z",
              __v: 0,
            })
          );
          navigate("/background");
        }

        handleFetchDataBG();
      }
    } catch (error) {
      alert("Error deleting image");
      console.error(error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("bgurl", file);

    try {
      const response = await axios.post(
        "http://localhost:5051/upload-bg",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Image uploaded successfully");
        handleFetchDataBG(); // Refresh data after upload
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      alert("Error uploading image");
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div className="p-4 md:p-6">
          <BackgroundImgServices
            background={background}
            handleSetImageById={handleSetImageById}
            handleDeleteImageById={handleDeleteImageById}
            handleImageUpload={handleImageUpload}
            message={message}
          />
        </div>
      )}
    </div>
  );
}

export default BackgroundPage;
