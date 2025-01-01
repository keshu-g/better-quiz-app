import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 rounded-lg m-2">
      <div className="flex justify-center space-x-6">
        <Link
          to="/"
          className="text-gray-300 hover:text-white transition duration-300"
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Header;
