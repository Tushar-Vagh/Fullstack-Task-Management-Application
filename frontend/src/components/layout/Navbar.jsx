import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  const { logout } = useContext(AuthContext);
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <header
      className="
        bg-white dark:bg-gray-900
        border-b dark:border-gray-700
        px-4 md:px-6 py-3
        flex items-center justify-between
        sticky top-0 z-20
        transition-all
      "
    >
      <div className="flex items-center gap-3">
=        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="
              md:hidden p-2 rounded-lg
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        )}

        <span className="font-semibold text-lg dark:text-white hidden sm:block">
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="
            px-3 py-2 rounded-lg border
            text-sm font-medium
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition
          "
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          onClick={logout}
          className="
            btn-secondary
            rounded-full
            px-4 py-2
            text-sm font-medium
            hover:scale-105 transition
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}
