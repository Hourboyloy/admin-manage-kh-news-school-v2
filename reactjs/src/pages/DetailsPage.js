import React, { useEffect, useState, useCallback, useContext, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewsDetail from "../components/NewsDetail";
import axios from "axios";
import FullPageLoader from "../components/FullPageLoader";
import { CreateContext } from "../Helper/Context";


function DetailsPage() {
  const { url } = useContext(CreateContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Destructure id from useParams
  const [data, setData] = useState();
  const [isloading, setLoading] = useState(true);
  const [isfound, setfound] = useState(true);
  const handleGetbyID = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/api/getone/${id}`);
      if (res.status === 200) {
        setLoading(false);
        if (res.data.message === "News not found") {
          setfound(false);
        } else {
          setData(res.data.news);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [id]); // Depend on id to re-fetch data when id changes

  useEffect(() => {
    handleGetbyID();
  }, [handleGetbyID]); // Depend on handleGetbyID

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Disable scrolling when loading
  useEffect(() => {
    if (isloading) {
      document.body.classList.add("prevent-scroll"); // Add class to prevent scrolling
    } else {
      document.body.classList.remove("prevent-scroll"); // Ensure scrollbar is removed
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("prevent-scroll");
    };
  }, [isloading]);

  // handle delete
  const handleDelete = async () => {
    const adminToken = localStorage.getItem("admin_access_token");
    setTimeout(async () => {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (userConfirmed) {
        try {
          const response = await axios.delete(
            `${url}/api/remove-news/${id}`, // URL with item ID
            {
              headers: {
                Authorization: `Bearer ${adminToken}`, // Add token to headers
              },
            }
          );

          if (response.status === 200) {
            // handleGetbyID();
            setTimeout(() => {
              alert("deleted item successfully");
              navigate(`/news-services`);
            }, 1000);
          } else {
            setTimeout(() => {
              alert("Failed to delete the item");
            }, 1000);
          }
        } catch (error) {
          setTimeout(() => {
            alert("Error deleting the item");
          }, 1000);
        }
      }
    }, 500);
  };

  const handleUpdateVisibility = async (id, currentVisibility) => {
    const newVisibility = currentVisibility === 1 ? 0 : 1; // Toggle between 1 and 0
    const alertText = `Are you sure you want to ${
      currentVisibility === 1 ? "hide" : "show"
    } this item?`;

    // Delay the confirmation alert by 500ms
    setTimeout(async () => {
      const userConfirmed = window.confirm(alertText);

      if (userConfirmed) {
        try {
          const response = await axios.put(
            `${url}/api/isvisible/${id}`, // Backend endpoint
            { isVisible: newVisibility }, // Payload with new visibility status
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "admin_access_token"
                )}`, // Token in headers
              },
            }
          );

          if (response.status === 200) {
            handleGetbyID();
            setTimeout(() => {
              alert(response.data.message); // Notify success
            }, 1000);
          }
        } catch (error) {
          alert(`Failed to ${currentVisibility === 1 ? "hide" : "show"} item`);
        }
      }
    }, 500); // 500ms delay for the confirmation alert
  };

  return (
    <div className="w-full">
      {isloading ? (
        <FullPageLoader />
      ) : isfound ? (
        <div className="min-h-[90.8vh] mx-auto max-w-[815px] lg:px-0 md:px-8 px-4 flex items-center justify-center">
          <NewsDetail
            news={data}
            handleUpdateVisibility={handleUpdateVisibility}
            isExpanded={isExpanded}
            toggleExpanded={toggleExpanded}
            handleDelete={handleDelete}
            id={id}
          />
        </div>
      ) : (
        <div className="xl:text-4xl lg:text-3xl md:text-2xl text-xl text-white font-bold h-[90vh] flex justify-center items-center">
          Not Found
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
