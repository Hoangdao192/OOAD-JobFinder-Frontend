import Layout from "components/layouts/background/Layout";
import Navbar from "./Navbar";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Dashboard({ children }) {
  return (
    <Layout>
      <div>
        <Navbar />
      </div>
      <div className="flex h-screen">
        <Sidebar />
        {children}
      </div>
    </Layout>
  );
}
export default Dashboard;
