import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// PUBLIC_INTERFACE
/**
 * Layout component - Main application layout wrapper
 * Combines Navbar, Sidebar, and content area with responsive design
 * Applies Minimalist Soft Mono theme styling
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in the content area
 * @returns {JSX.Element} The layout component
 */
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar />

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
