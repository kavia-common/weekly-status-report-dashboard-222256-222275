import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Navbar component - Top navigation bar with minimalist Soft Mono styling
 * Desktop: left-aligned logo/title and right avatar.
 * Mobile: left menu toggle for sidebar, centered logo/title, right avatar.
 * 
 * @param {Object} props
 * @param {Function} [props.onMenuClick] - Callback to open the mobile sidebar drawer
 * @returns {JSX.Element} The navbar component
 */
function Navbar({ onMenuClick }) {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('isLoggedIn');
    } catch (e) {
      // noop
    }
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-surface border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Mobile layout */}
        <div className="flex items-center justify-between md:hidden">
          {/* Left: Menu toggle */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-text hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open sidebar menu"
          >
            {/* Hamburger icon */}
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Center: Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-lg font-semibold text-text">
              Weekly Report
            </span>
          </Link>

          {/* Right: Avatar */}
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
            <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white font-medium text-sm">U</span>
            </div>
            {showPopover && (
              <div className="absolute top-full right-0 mt-2 z-50">
                <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200 w-48">
                  <div className="mb-2">
                    <span className="text-text text-sm font-medium whitespace-nowrap">
                      User
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button
                      type="button"
                      data-testid="role-btn-employee"
                      className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm text-text hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                      onClick={() => {}}
                    >
                      Employee
                    </button>
                    <button
                      type="button"
                      data-testid="role-btn-manager"
                      className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm text-text hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                      onClick={() => {}}
                    >
                      Manager
                    </button>
                    <button
                      type="button"
                      data-testid="role-btn-admin"
                      className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm text-text hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                      onClick={() => {}}
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      data-testid="logout-button"
                      className="w-full inline-flex items-center justify-center rounded-md bg-error text-white px-3 py-2 text-sm hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 transition-colors"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left: Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-semibold text-text">
              Weekly Report
            </span>
          </Link>

          {/* Right: Avatar */}
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
            {showPopover && (
              <div className="absolute top-full right-0 mt-2 z-50">
                <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200 w-48">
                  <div className="mb-2">
                    <span className="text-text text-sm font-medium whitespace-nowrap">
                      User
                    </span>
                  </div>
                  <div className="space-y-2">
                      <button
                        type="button"
                        data-testid="role-btn-employee"
                        className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm text-text hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                        onClick={() => {}}
                      >
                        Employee
                      </button>
                      <button
                        type="button"
                        data-testid="role-btn-manager"
                        className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm text-text hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                        onClick={() => {}}
                      >
                        Manager
                      </button>
                      <button
                        type="button"
                        data-testid="role-btn-admin"
                        className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm text-text hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                        onClick={() => {}}
                      >
                        Admin
                      </button>
                      <button
                        type="button"
                        data-testid="logout-button"
                        className="w-full inline-flex items-center justify-center rounded-md bg-error text-white px-3 py-2 text-sm hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 transition-colors"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
