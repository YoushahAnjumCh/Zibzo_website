import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuthentication } from "../../../../hooks/adminAuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { adminAuthData, adminClearAuthData } = useAdminAuthentication();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between">
        <div className="container mx-auto flex items-center  gap-5">
          <button
            className="text-white lg:hidden"
            aria-label="Toggle navigation"
            onClick={() =>
              document.getElementById("navbarNav")?.classList.toggle("hidden")
            }
          ></button>
          <div id="navbarNav" className="lg:flex space-x-4 items-center">
            <ul className="flex space-x-4">
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
            </ul>
          </div>
        </div>

        <div>
          <ul>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  adminClearAuthData(); // Call the logout function
                  navigate("/homepage", { replace: true });
                }}
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
