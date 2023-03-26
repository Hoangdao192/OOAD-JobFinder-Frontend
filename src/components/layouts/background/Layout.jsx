import React from "react";

function Layout({ children }) {
  return (
    <div
      className="overflow-auto
      bg-[url('https://preview.colorlib.com/theme/joblisting/img/header-bg.jpg.webp')] bg-cover bg-opacity-100 h-screen"
    >
      <div className="bg-gradient-to-r from-background_color/90 to-background_color_hover backdrop-brightness-75 overflow-auto min-h-screen">
        {children}
      </div>
    </div>
  );
}
export default Layout;
