import { Link, NavLink } from "react-router";
import {
  FaChartPie,
  FaUsers,
  FaNewspaper,
  FaPlusCircle,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";

const Sidebar = ({ handleLogout, handleThemeToggle, theme }) => {
  // Close drawer on mobile after clicking a link
  const closeDrawer = () => {
    const drawerToggle = document.getElementById("dashboard-drawer");
    if (drawerToggle) drawerToggle.checked = false;
  };

  const navLinks = [
    {
      path: "/dashboard",
      label: "Statistics",
      icon: <FaChartPie />,
      end: true,
    },
    {
      path: "/dashboard/manage-users",
      label: "Manage Users",
      icon: <FaUsers />,
    },
    {
      path: "/dashboard/manage-articles",
      label: "Manage Articles",
      icon: <FaNewspaper />,
    },
    {
      path: "/dashboard/add-publisher",
      label: "Add Publisher",
      icon: <FaPlusCircle />,
    },
  ];

  return (
    <aside className="w-64 bg-base-200 min-h-screen flex flex-col justify-between shadow-lg">
      {/* Top Title and Theme Toggle */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-600 flex items-center justify-between">
        <Link to='/'><h2 className="text-xl font-bold text-[#4C3AFF]">NewsEdge</h2></Link>
        <button onClick={handleThemeToggle} className="text-xl">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="px-4 py-6 space-y-3">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            onClick={closeDrawer}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-[#4C3AFF]/10 ${
                isActive ? "bg-[#4C3AFF]/20 font-semibold text-[#4C3AFF]" : ""
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Profile & Logout */}
      <div className="px-4 pb-6">
        <div className="border-t border-gray-300 dark:border-gray-600 mb-4"></div>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/dashboard/profile"
            onClick={closeDrawer}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#4C3AFF]/10"
          >
            <FaUserCog className="text-lg" />
            <span>Manage Profile</span>
          </NavLink>

          <button
            onClick={() => {
              closeDrawer();
              handleLogout();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:cursor-pointer hover:bg-red-100 text-red-600 hover:text-red-800 transition"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
