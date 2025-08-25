import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // ⬅️ useLocation
import { menuItems } from "../../config/menuConfig";

export const Sidebar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  // Automatically open menu if current path is in children
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children) {
        const match = item.children.find(
          (child) => child.route === location.pathname
        );
        if (match) {
          setOpenMenu(item.name);
        }
      }
    });
  }, [location.pathname]);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="bg-white shadow-md w-64 h-screen p-4 flex flex-col fixed">
      <nav className="space-y-2 overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-gray-300">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </div>
                  {openMenu === item.name ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {openMenu === item.name && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.route}
                        className={`block w-full text-left p-2 rounded-md text-sm transition ${
                          location.pathname === subItem.route
                            ? "bg-gray-200 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.route || "#"}
                className={`flex items-center space-x-3 p-2 w-full text-left rounded-md transition ${
                  location.pathname === item.route
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
