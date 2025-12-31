import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Master = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#EFEEEE] dark:bg-[#292D32] transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Master;