import React from "react";

function Layout({ children }) {
  return (
    <div
      className="overflow-auto 
      bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-opacity-100 h-screen
      "
    >
      <div className="bg-gradient-to-r from-slate-300/50 to-slate-400/50 backdrop-brightness-75 overflow-auto min-h-screen">
        {children}
      </div>
    </div>
  );
}
export default Layout;
