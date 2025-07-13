import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import "./Navbar.css";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import useStatus from "../../../hooks/useStatus";

const Navbar = () => {
  const { user, logOut, setThemeController } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [userStatus, isStatusLoading] = useStatus();
  const navigate = useNavigate();
  console.log(user);

  const [theme, setTheme] = useState("light");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeController(newTheme);
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
  if (isStatusLoading) return <Loading></Loading>;

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-articles">All Articles</NavLink>
      </li>
      <li>
        <NavLink to="/add-article">Add Articles</NavLink>
      </li>
      <li>
        <NavLink to="/subscription">Subscription</NavLink>
      </li>
      <>
        {user && (
          <>
            <li>
              <NavLink to="/my-articles">My Articles</NavLink>
            </li>
          </>
        )}
      </>
      {(userStatus === "premium" || role === "admin") && (
        <>
          <li>
            <NavLink to="/premium-articles">Premium Articles</NavLink>
          </li>
        </>
      )}
      {role === "admin" && (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
      {user?.email && (
        <li className="lg:hidden">
          <button onClick={handleLogout} className="flex items-center gap-2 ">
            <MdOutlineLogout />
            Logout
          </button>
        </li>
      )}
    </>
  );

  const drawerBgClass =
    theme === "light" ? "bg-white " : "bg-gray-900 text-white";

  if (isRoleLoading) return <Loading></Loading>;

  return (
    <div className="sticky top-0 z-50">
      <div className="drawer drawer-end">
        <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
        <div className="navbar max-w-7xl mx-auto px-4">
          {/* Navbar Start */}
          <div className="navbar-start">
            <Link to="/" className="text-lg font-bold text-[#4C3AFF]">
              NewsEdge
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-3 font-medium">
              {navLinks}
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end gap-2">
            <button
              onClick={handleThemeToggle}
              className="hover:cursor-pointer"
            >
              {theme === "light" ? (
                <FaMoon size={20} />
              ) : (
                <FaSun color="white" size={20} />
              )}
            </button>

            {user?.email && (
              <>
                <Link to="/profile" title="My Profile">
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-[#4C3AFF]"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden hover:cursor-pointer lg:flex items-center gap-1 text-[#4C3AFF]"
                >
                  <MdOutlineLogout className="text-xl" />
                  Logout
                </button>
              </>
            )}

            {!user?.email && (
              <>
                <Link
                  to="/login"
                  className="btn btn-sm bg-[#4C3AFF] text-white hover:brightness-110"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm bg-[#4C3AFF] text-white hover:brightness-110"
                >
                  Register
                </Link>
              </>
            )}

            {/* Drawer toggle button for mobile */}
            <label htmlFor="nav-drawer" className="btn p-0 btn-ghost lg:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="drawer-side z-50 ">
          <label htmlFor="nav-drawer" className="drawer-overlay"></label>
          <ul
            className={`menu p-4 w-64 ${drawerBgClass} min-h-full font-medium space-y-2`}
          >
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
