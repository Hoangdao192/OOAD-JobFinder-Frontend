import Layout from "components/layouts/background/Layout";
import Navbar from "./Navbar";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Dashboard({ children }) {
  const handlePostJob = () => {};
  const handleCV = () => {};

  return (
    <Layout>
      <div>
        <Navbar handlePostJob={handlePostJob} handleCV={handleCV} />
      </div>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </Layout>
  );
}
export default Dashboard;
