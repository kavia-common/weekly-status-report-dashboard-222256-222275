import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// PUBLIC_INTERFACE
/**
 * Layout component - Main application layout wrapper
 * Combines Navbar, Sidebar, and content area with responsive design
 * Applies Minimalist Soft Mono theme styling
 * 
 * Responsive behavior:
 * - Sidebar is hidden on small screens and available as an off-canvas drawer.
 * - Navbar shows a mobile layout with a menu toggle to open the sidebar.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in the content area
 * @returns {JSX.Element} The layout component
 */
function Layout({ children }) {
  // Track mobile sidebar drawer visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar onMenuClick={openSidebar} />

      {/* Mobile Off-Canvas Sidebar */}
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-gray-200 transform transition-transform duration-300 ease-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation sidebar"
      >
        <div className="h-full overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="font-semibold text-text">Weekly Report</span>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md text-text hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close sidebar"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* Sidebar content; close on navigate */}
          <Sidebar onNavigate={closeSidebar} className="h-[calc(100%-56px)]" />
        </div>
      </aside>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation - visible on md and larger */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
