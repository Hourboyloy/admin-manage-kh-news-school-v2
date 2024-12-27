import React, { useEffect, useState, useContext } from "react";
import { CreateContext } from "../Helper/Context";
import InsertForm from "../components/InsertForm";
function InsertPage() {
  const { categories, url } = useContext(CreateContext);
  const [lengDiscription, setLengDiscription] = useState(0);
  useEffect(() => {
    setLengDiscription(5000);
  }, []);

  const handleLength = (getValLeng) => {
    let MaxLeng = 5000;
    MaxLeng = MaxLeng - getValLeng;
    setLengDiscription(MaxLeng);
  };

  return (
    <div className="min-h-[91vh] lg:p-6 md:p-8 p-4 flex flex-col justify-center">
      <InsertForm
        categories={categories}
        lengDiscription={lengDiscription}
        handleLength={handleLength}
        url={url}
      />
    </div>
  );
}

export default InsertPage;
