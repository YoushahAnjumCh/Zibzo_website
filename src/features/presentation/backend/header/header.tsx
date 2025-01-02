import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuthentication } from "../../../../hooks/adminAuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { adminAuthData, adminClearAuthData } = useAdminAuthentication();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-white font-bold text-lg">Admin Panel</div>

        {/* Hamburger Menu Button */}
        <button
          className="text-white lg:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0 mt-4 lg:mt-0">
            <li>
              <Link to="/homepage" className="text-white hover:text-gray-300">
                HomePage
              </Link>
            </li>
            <li>
              <Link
                to="/uploadcategory"
                className="text-white hover:text-gray-300"
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                to="/uploadhomebanner"
                className="text-white hover:text-gray-300"
              >
                Main Carousel
              </Link>
            </li>
            <li>
              <Link
                to="/upload_dealday"
                className="text-white hover:text-gray-300"
              >
                Deal of the Day
              </Link>
            </li>
            <li>
              <Link
                to="/upload_offerbanner"
                className="text-white hover:text-gray-300"
              >
                Offer Banner
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="hidden lg:block">
          <a
            onClick={(e) => {
              e.preventDefault();
              adminClearAuthData();
              navigate("/homepage", { replace: true });
            }}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            Logout
          </a>
        </div>
      </div>

      {/* Mobile Logout */}
      {menuOpen && (
        <div className="mt-4 lg:hidden">
          <ul>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  adminClearAuthData();
                  navigate("/homepage", { replace: true });
                }}
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
