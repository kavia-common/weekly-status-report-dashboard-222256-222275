import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Sidebar component - Side navigation with collapsible sections
 * Provides navigation to main pages and admin functions
 * Features minimalist Soft Mono styling with active state indicators
 * 
 * @returns {JSX.Element} The sidebar component
 */
function Sidebar() {
  const location = useLocation();
  const [adminExpanded, setAdminExpanded] = useState(false);

  // Helper function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Helper function to check if admin section should be highlighted
  const isAdminActive = () => {
    return location.pathname.startsWith('/admin');
  };

  return (
    <aside className="w-64 bg-surface border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {/* Main Navigation */}
        <nav className="space-y-2">
          <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
            Main Menu
          </h3>

          <Link
            to="/submit"
            className={`block px-4 py-2.5 rounded-lg transition-colors duration-200 ${
              isActive('/submit') || isActive('/')
                ? 'bg-primary text-white'
                : 'text-text hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">📝</span>
              <span className="font-medium">Submit Report</span>
            </div>
          </Link>

          <Link
            to="/history"
            className={`block px-4 py-2.5 rounded-lg transition-colors duration-200 ${
              isActive('/history')
                ? 'bg-primary text-white'
                : 'text-text hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">📚</span>
              <span className="font-medium">History</span>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className={`block px-4 py-2.5 rounded-lg transition-colors duration-200 ${
              isActive('/dashboard')
                ? 'bg-primary text-white'
                : 'text-text hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">📊</span>
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>

          {/* Admin Section */}
          <div className="pt-6">
            <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
              Administration
            </h3>

            <button
              onClick={() => setAdminExpanded(!adminExpanded)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                isAdminActive()
                  ? 'bg-gray-100 text-primary'
                  : 'text-text hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">⚙️</span>
                <span className="font-medium">Admin</span>
              </div>
              <span className={`transform transition-transform duration-200 ${adminExpanded ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {/* Admin Submenu */}
            {adminExpanded && (
              <div className="mt-2 ml-4 space-y-1">
                <Link
                  to="/admin/users"
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    isActive('/admin/users')
                      ? 'bg-primary text-white'
                      : 'text-text hover:bg-gray-100'
                  }`}
                >
                  Users
                </Link>
                <Link
                  to="/admin/teams"
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    isActive('/admin/teams')
                      ? 'bg-primary text-white'
                      : 'text-text hover:bg-gray-100'
                  }`}
                >
                  Teams
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
