import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
const [cart, setCart]=useState(0)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left-side navigation links */}
        <div className="flex items-center">
          <div className="text-white text-2xl font-bold">
            <a href="/">Home</a>
          </div>
          <div className="ml-4 text-white">
            <a href="/shop">Shop</a>
          </div>
          <div className="ml-4 text-white">
            <a href="/contact">Contact Us</a>
          </div>
        </div>

        {/* Right-side navigation elements */}
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg px-2 py-1"
            />
            <button className="ml-2 bg-blue-700 text-white px-2 py-1 rounded-lg">
              Search
            </button>
          </div>

          {/* User Account */}
          <div className="ml-4 text-white hidden md:block">
            <a href="/login">Login</a>
          </div>
          <div className="ml-4 text-white hidden md:block">
            <a href="/profile">Profile</a>
          </div>

          {/* Cart */}
          <div className="ml-4 text-white">
            <a href="/cart" className="md:hidden">
              <i className="fas fa-shopping-cart"></i>
            </a>
            <a href="/cart" className="hidden md:block">
              Cart
            </a>
            <span className="ml-1 bg-red-500 text-white font-semibold rounded-full px-2 py-1">
              {cart}
            </span>
          </div>

          {/* Wishlist */}
          <div className="ml-4 text-white">
            <a href="/wishlist">
              <i className="far fa-heart"></i>
            </a>
          </div>

          {/* Notifications */}
          <div className="ml-4 text-white">
            <a href="/notifications">
              <i className="far fa-bell"></i>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
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
        <div className="md:hidden bg-blue-500">
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
    </nav>
  );
}

export default Navbar;
