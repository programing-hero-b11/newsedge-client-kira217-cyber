import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";
import { BiUserCircle, BiCreditCard } from "react-icons/bi"
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
    <div
      className={`fixed top-0 left-0 w-full z-50 shadow ${
        theme === "light" ? "bg-white" : "bg-[#1D232A] text-white"
      }`}
    >
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
                <div className="dropdown dropdown-end">
                  {/* Profile Image Button */}
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-[#4C3AFF] overflow-hidden">
                      <img
                        src={user?.photoURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Dropdown Content */}
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 hover:bg-gray-100 px-2 py-2 rounded-md transition"
                      >
                        <BiUserCircle className="text-lg" />
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/payment-history"
                        className="flex items-center gap-2 hover:bg-gray-100 px-2 py-2 rounded-md transition"
                      >
                        <BiCreditCard className="text-lg" />
                        <span>Payment History</span>
                      </Link>
                    </li>
                  </ul>
                </div>
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
