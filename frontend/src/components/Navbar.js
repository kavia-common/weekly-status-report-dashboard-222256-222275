import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Navbar component - Top navigation bar with minimalist Soft Mono styling
 * Displays left-aligned logo and site title, and right-aligned user avatar.
 * Navigation links are intentionally omitted to reduce visual clutter.
 * 
 * @returns {JSX.Element} The navbar component
 */
function Navbar() {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <nav className="bg-surface border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand (left) */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-semibold text-text">
              Weekly Report
            </span>
          </Link>

          {/* Right: User avatar/profile popover (links removed per requirement) */}
          <div className="flex items-center">
            <div
              className="relative"
              onMouseEnter={() => setShowPopover(true)}
              onMouseLeave={() => setShowPopover(false)}
              onFocus={() => setShowPopover(true)}
              onBlur={() => setShowPopover(false)}
              tabIndex={0}
              role="button"
              aria-label="User profile"
            >
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-white font-medium text-sm">U</span>
              </div>

              {/* Popover */}
              {showPopover && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
                  <div className="bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-200">
                    <span className="text-text text-sm font-medium whitespace-nowrap">
                      User
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
