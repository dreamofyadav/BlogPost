import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center">
        
        {/* About Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-2">Our Blog</h2>
          <p className="text-gray-200 max-w-xs">
            Sharing knowledge, experiences, and insights on technology, lifestyle, travel, food, and more. Stay updated with our latest posts.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-gray-300 transition" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300 transition" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>About</Link>
            </li>
            <li>
              <Link to="/addblog" className="hover:text-gray-300 transition" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >Add Blog</Link>
            </li>
          </ul>
        </div>

        {/* Social media  Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright footer*/}
      <div className="bg-blue-700 text-gray-200 text-center py-4 mt-6">
        &copy;Akku {new Date().getFullYear()} Our Blog. All rights reserved.
      </div>
    </footer>
  );
}
