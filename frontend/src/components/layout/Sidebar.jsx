import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside
      className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white dark:bg-gray-900
        border-r dark:border-gray-800
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div className="h-14 flex items-center px-5 border-b dark:border-gray-800">
        <span className="font-bold text-lg dark:text-white">
          TaskApp
        </span>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink
          to="/dashboard"
          onClick={closeSidebar}
          className="block px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          onClick={closeSidebar}
          className="block px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800"
        >
          Tasks
        </NavLink>

        <NavLink
          to="/profile"
          onClick={closeSidebar}
          className="block px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800"
        >
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
