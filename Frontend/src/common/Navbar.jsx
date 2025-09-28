import React, { useState , useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

   // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLoggedIn(!!token);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserLoggedIn(false);
    toast.success("Logout successfully");
    navigate("/login");
  };


  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl">
          <i className="fa-regular fa-handshake text-3xl"></i>
        </Link>

        {/* Search only desktop */}
        <div className="hidden md:flex flex-1 justify-center mx-4">
          <div className="flex items-center bg-white rounded-full px-3 py-1 w-1/2">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none px-2"
            />
            <FaSearch className="text-blue-600" />
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link to="/AddBlog">Add Blog</Link>
          <Link to="/about">About</Link>
          
           {userLoggedIn ? (
            <Link
              to="#"
              onClick={handleLogout}
              
            >
              Logout
            </Link>
          ) : (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-2 space-y-2">
          <div className="flex items-center bg-white rounded-full px-3 py-1">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none px-2"
            />
            <FaSearch className="text-blue-600" />
          </div>

          {userLoggedIn ? (
            <Link
              to="#"
              onClick={handleLogout}
              className="block text-white "
            >
              Logout
            </Link>
          ) : (
            <>
              <Link to="/signup" className="block text-white">
                Signup
              </Link>
              <Link to="/login" className="block text-white">
                Login
              </Link>
            </>
          )}

          <Link to="/AddBlog" className="block text-white">
            Add Blog
          </Link>
          <Link to="/about" className="block text-white">
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
