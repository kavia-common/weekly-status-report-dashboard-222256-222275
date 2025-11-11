import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Navbar component - Top navigation bar with minimalist Soft Mono styling
 * Features a clean, professional appearance with navigation links
 * 
 * @returns {JSX.Element} The navbar component
 */
function Navbar() {
  return (
    <nav className="bg-surface border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-semibold text-text">
              Weekly Report
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/submit"
              className="text-text hover:text-primary transition-colors duration-200 font-medium"
            >
              Submit
            </Link>
            <Link
              to="/history"
              className="text-text hover:text-primary transition-colors duration-200 font-medium"
            >
              History
            </Link>
            <Link
              to="/dashboard"
              className="text-text hover:text-primary transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
          </div>

          {/* User Section (Placeholder) */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
