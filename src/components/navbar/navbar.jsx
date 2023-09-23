import { useState } from "react";
import logo from "./logo.png";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-around items-center">
        <div className=" flex justify-normal">
          <h1 className="text-white text-2xl mr-1">VEE-MART</h1>
          <img src={logo} alt="logo" className="w-5" />
        </div>

        {/* Right-side navigation elements */}
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-lg pl-10 pr-2 py-1" // Adjust padding for icon
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i className="fas fa-search text-gray-500 cursor-pointer"></i>{" "}
                {/* Font Awesome search icon */}
              </span>
              <button className="ml-2 bg-blue-700 text-white px-2 py-1 rounded-lg">
                Search
              </button>
            </div>
          </div>

          {/* User Account */}
          <button className="hidden lg:block ml-4  text-white px-2 py-1 bg-gray-500 rounded-lg ">
            <a href="/login">
              <i className="fas fa-user mr-1"></i>Account
            </a>
          </button>
          <button className=" hidden lg:block relative ml-4 hover:bg-gray-500 ">
            <div className="border rounded-lg pl-10  pr-2 py-1 text-white">
              Help
            </div>

            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i className="fas fa-question text-white cursor-pointer"></i>{" "}
              {/* Font Awesome search icon */}
            </span>
          </button>

          {/* Cart */}
          <div className="text-white">
            <i className="fas fa-user lg:invisible"></i>
          </div>
          <div className="ml-4 text-white">
            <a href="/cart" className="lg:hidden">
              <i className="fas fa-shopping-cart"></i>
            </a>
            <a
              href="/cart"
              className="hidden lg:block fas fa-shopping-cart"
            ></a>
            <span className="ml-1 bg-red-500 text-white font-semibold rounded-full px-2 py-1">
              {cart}
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden ml-1">
            <button
              onClick={toggleMenu}
              className="text-white text-xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-blue-500">
          <div className="container mx-auto">
            <div className="text-white py-2">
              <a href="/cart" className="block py-2">
                Cart
              </a>
              <a href="/wishlist" className="block py-2">
                Wishlist
              </a>
              <a href="/notifications" className="block py-2">
                Notifications
              </a>
              <a href="/login" className="block py-2">
                Login
              </a>
              <a href="/profile" className="block py-2">
                Profile
              </a>
            </div>
          </div>
        </div>
      )}
    {/* <SearchBar  ></SearchBar> */}
    </nav>
  );
}

export default Navbar;
