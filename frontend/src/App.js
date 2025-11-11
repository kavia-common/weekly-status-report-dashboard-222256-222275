import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Layout component
import Layout from './components/Layout';

// Import page components
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
 * Uses responsive Layout component with Navbar and Sidebar for navigation.
 */
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<ReportDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/teams" element={<AdminTeamsPage />} />
          <Route path="/" element={<SubmitPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
