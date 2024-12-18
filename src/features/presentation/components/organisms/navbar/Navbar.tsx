import React, { useState } from "react";
import { IoMdSearch, IoIosMenu, IoIosClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import TitleHeading from "../../atoms/title_headings/TitleHeading";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../../redux/store";
import { useAuthentication } from "../../../../../hooks/authContext";
import { useCart } from "../../../../../hooks/cartContext";
import { useAdminAuthentication } from "../../../../../hooks/adminAuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { authData, clearAuthData } = useAuthentication();
  const { adminAuthData } = useAdminAuthentication();

  const { cartCount } = useCart();
  const navigate = useNavigate();

  const MenuLinks = [
    { id: 1, name: "Home", link: "/homepage" },
    adminAuthData
      ? { id: 4, name: "Admin", link: "/upload" }
      : { id: 4, name: "Admin", link: "/adminlogin" },
  ];

  return (
    <div className="bg-white relative z-40">
      <div className="py-2 px-4 flex justify-between items-center">
        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <IoIosClose className="text-3xl" />
            ) : (
              <IoIosMenu className="text-3xl" />
            )}
          </button>
        </div>

        {/* Menu Links - Visible on larger screens */}
        <div className="hidden md:flex justify-center text-center gap-4">
          <ul className="flex gap-3">
            {MenuLinks.map((menu) => (
              <li
                key={menu.id}
                className="hover:text-gray-400 duration-200 cursor-pointer"
                onClick={() => navigate(menu.link)}
              >
                {menu.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <TitleHeading
          level={2}
          title="ZIBZO"
          divClassName="flex justify-center text-center"
          hClassName="md:text-3xl text-base font-bold cursor-pointer"
        />

        {/* Icons (Cart and User Profile) */}
        <div className="flex gap-4 items-center">
          {/* Search Bar */}
          <div className="relative group">
            <input type="text" placeholder="Search" className="search-bar" />
            <IoMdSearch className=" group-hover:text-secondary text-xl text-black absolute  top-1/2  -translate-y-1/2 right-3" />
          </div>
          {/* Cart Icon */}
          <button className="relative p-2">
            <Link to="/cart">
              <FaCartShopping className="text-xl" />
              <div className="absolute top-1 right-1 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center text-xs">
                {cartCount}
              </div>
            </Link>
          </button>

          {/* User Profile Icon with Dropdown */}
          <button
            className="relative p-2"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <FaUserCircle className="text-xl" />
          </button>

          {/* User Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute top-3 right-0 mt-10 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50">
              <p className="text-gray-700 font-bold">{authData?.userName}</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      localStorage.removeItem("authToken");
                      clearAuthData(); // Call the logout function
                      navigate("/", { replace: true });
                    }}
                    className="text-gray-800 cursor-pointer hover:text-gray-600"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 mt-2">
          <ul className="flex flex-col gap-2 p-4">
            {MenuLinks.map((menu) => (
              <li key={menu.id} className="hover:text-gray-400 duration-200">
                <a href={menu.link}>{menu.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
