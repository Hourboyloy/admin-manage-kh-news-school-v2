import React, { useContext } from "react";
import MonthlyViewsTrend from "../components/MonthlyViewsTrend";
import { CreateContext } from "../Helper/Context";

const Dashboard = () => {
  const { dataTotalViewsAnalysis } = useContext(CreateContext);
  return (
    <div className="container mx-auto md:p-6 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-md text-center">
          <h3 className="md:text-lg font-medium">Total Users</h3>
          <p className="lg:text-2xl md:text-xl text-lg font-bold">10</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md text-center">
          <h3 className="md:text-lg font-medium">Total Views in 12 Months</h3>
          <p className="lg:text-2xl md:text-xl text-lg font-bold">
            {dataTotalViewsAnalysis?.totalViewsLast12Months ?dataTotalViewsAnalysis?.totalViewsLast12Months:"N/A"}
          </p>
        </div>
      </div>

      <div>
        <MonthlyViewsTrend dataTotalViewsAnalysis={dataTotalViewsAnalysis} />
      </div>
    </div>
  );
};

export default Dashboard;
