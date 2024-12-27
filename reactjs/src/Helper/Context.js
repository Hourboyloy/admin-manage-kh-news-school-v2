import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

// Create the context
export const CreateContext = createContext();

// Create a provider component
export const ContextProvider = ({ children }) => {
  // state
  // const url = 'http://localhost:5051';
  const url = "https://api-news-dot-school.vercel.app";
  const [categories, setCategories] = useState([]);
  const [listNews, setListNews] = useState([]);
  const [dataTotalViewsAnalysis, setDataTotalViewsAnalysis] = useState([]);
  // end state

  // useCallback to memoize the functions to prevent unnecessary re-renders
  const handleGetCategories = useCallback(async () => {
    axios
      .get(`${url}/get-categories`)
      .then((response) => {
        if (response.data.status === 200) {
          setCategories(response.data.categories);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []); // Empty dependency array ensures this function is only created once.

  const handleGetDataTotalViewsAnalysis = useCallback(async () => {
    try {
      const res = await axios.get(
        `${url}/views/total-per-12-months`
      );
      if (res.status === 200) {
        localStorage.setItem(
          "dataTotalViewsAnalysis",
          JSON.stringify(res.data)
        );
        setDataTotalViewsAnalysis(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []); // Empty dependency array ensures this function is only created once.

  // useEffect to call the functions
  useEffect(() => {
    handleGetCategories();
    handleGetDataTotalViewsAnalysis();
  }, [handleGetCategories, handleGetDataTotalViewsAnalysis]); // Dependencies are memoized functions

  return (
    <CreateContext.Provider
      value={{
        categories,
        setCategories,
        listNews,
        setListNews,
        dataTotalViewsAnalysis,
        url,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};
