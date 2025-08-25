import { Bell, Mail, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(null); // "messages", "notifications", "user"

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center relative">
      {/* Left Side */}
      <div className="flex items-center space-x-3">
        <div className="text-green-500 font-bold text-xl">DMS</div>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6 relative">
        {/* Messages */}
        <div className="relative">
          <button
            className="relative text-gray-600 hover:text-gray-800"
            onClick={() => toggleMenu("messages")}
          >
            <Mail size={22} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          {openMenu === "messages" && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
              <div className="p-3 font-semibold border-b">Messages</div>
              <ul>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">New order from John</li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">Server downtime alert</li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">Meeting at 3 PM</li>
              </ul>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative text-gray-600 hover:text-gray-800"
            onClick={() => toggleMenu("notifications")}
          >
            <Bell size={22} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              5
            </span>
          </button>
          {openMenu === "notifications" && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
              <div className="p-3 font-semibold border-b">Notifications</div>
              <ul>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">System update available</li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">New comment on project</li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">Invoice #456 paid</li>
              </ul>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/32"
            alt="User"
            className="w-8 h-8 rounded-full border cursor-pointer"
            onClick={() => toggleMenu("user")}
          />
          {openMenu === "user" && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <ul>
                <li className="flex items-center space-x-2 p-3 hover:bg-gray-100 cursor-pointer">
                  <User size={18} /> <span>Profile</span>
                </li>
                <li className="flex items-center space-x-2 p-3 hover:bg-gray-100 cursor-pointer">
                  <Settings size={18} /> <span>Settings</span>
                </li>
                <li className="flex items-center space-x-2 p-3 hover:bg-gray-100 cursor-pointer text-red-500">
                  <LogOut size={18} /> <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
