import Layout from "components/layouts/background/Layout";
import Navbar from "./Navbar";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Dashboard({ children }) {
  return (
    <div className="bg-[#f7f7f7]">
      <div>
        <Navbar />
      </div>
      <div className="flex h-screen">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
export default Dashboard;
