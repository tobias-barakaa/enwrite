import React from "react";
import Header from "./Header";
import "./DashboardMain.css";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const DashboardMain: React.FC = () => {
  return (
    <div className="dashboard-content">
      {/* Header Section */}
      <Header />
      
      {/* Main Content */}
      <div className="dashboard-main">
<Outlet />        
      </div>
      <Footer />
    </div>
  );
};

export default DashboardMain;



