import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import placeholder pages
import SubmitPage from './pages/SubmitPage';
import HistoryPage from './pages/HistoryPage';
import ReportDetailPage from './pages/ReportDetailPage';
import DashboardPage from './pages/DashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminTeamsPage from './pages/AdminTeamsPage';

// PUBLIC_INTERFACE
/**
 * Main application component that sets up routing and navigation
 * for the Weekly Status Report Dashboard.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        {/* Temporary Navigation Bar */}
        <nav className="bg-surface shadow-md p-4">
          <div className="container mx-auto flex gap-4 flex-wrap">
            <Link to="/submit" className="text-primary hover:text-secondary font-medium transition-colors">
              Submit Report
            </Link>
            <Link to="/history" className="text-primary hover:text-secondary font-medium transition-colors">
              History
            </Link>
            <Link to="/dashboard" className="text-primary hover:text-secondary font-medium transition-colors">
              Dashboard
            </Link>
            <Link to="/admin/users" className="text-primary hover:text-secondary font-medium transition-colors">
              Admin: Users
            </Link>
            <Link to="/admin/teams" className="text-primary hover:text-secondary font-medium transition-colors">
              Admin: Teams
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<ReportDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/teams" element={<AdminTeamsPage />} />
          <Route path="/" element={<SubmitPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
