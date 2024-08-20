import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="bg-[#1a1a1a] text-white py-6 px-6 flex items-center justify-between">
        <p>&copy; 2024 NetStar. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
