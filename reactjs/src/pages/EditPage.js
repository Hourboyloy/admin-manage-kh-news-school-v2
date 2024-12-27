import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import EditForm from "../components/EditForm";
import { useParams } from "react-router-dom";
import { CreateContext } from "../Helper/Context";
import FullPageLoader from "../components/FullPageLoader";

function EditPage() {
  const { categories,url } = useContext(CreateContext);
  const { id } = useParams();
  const [lengDiscription, setLengDiscription] = useState(0);
  const [isfound, setfound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const handleGetbyID = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/api/getone/${id}`);
      if (res.status === 200) {
        setIsLoading(false);
        if (res.data.message === "News not found") {
          setfound(false);
          setLengDiscription(5000);
        } else {
          setData(res.data.news);
          setLengDiscription(5000 - res.data.news.description?.length);
        }
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  }, [id]);

  useEffect(() => {
    handleGetbyID();
  }, [handleGetbyID]);

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

  const handleLength = (getValLeng) => {
    let MaxLeng = 5000;
    MaxLeng = MaxLeng - getValLeng;
    setLengDiscription(MaxLeng);
  };

  return (
    <div className="">
      {isLoading ? (
        <FullPageLoader />
      ) : isfound ? (
        <div className="py-9 lg:p-6 md:p-8 p-4">
          <EditForm
            newsId={id}
            handleLength={handleLength}
            lengDiscription={lengDiscription}
            news={data}
            categories={categories}
            url={url}
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

export default EditPage;
