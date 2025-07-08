import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = () => {
    logOut()
      .then((res) => {
        console.log("User Logged Out", res);
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100 overflow-x-hidden">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* drawer content */}
      <div className="drawer-content flex flex-col w-full">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between p-4 bg-base-200 lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost btn-circle"
          >
            <FaBars />
          </label>
          <h2 className="text-xl font-bold text-[#4C3AFF]">NewsEdge</h2>
          <button onClick={handleThemeToggle} className="btn btn-circle btn-sm">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>

        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* drawer sidebar */}
      <div className="drawer-side">
        {/* This is important to close drawer when clicking outside on mobile */}
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <Sidebar
          handleLogout={handleLogout}
          handleThemeToggle={handleThemeToggle}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
