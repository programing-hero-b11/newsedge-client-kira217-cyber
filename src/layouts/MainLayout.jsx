import React from "react";
import Navbar from "../components/shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
