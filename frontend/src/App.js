import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import LoginPage from './pages/LoginPage';

// Simple helper to check login state via localStorage
const isLoggedIn = () => {
  try {
    return localStorage.getItem('isLoggedIn') === 'true';
  } catch {
    return false;
  }
};

// PUBLIC_INTERFACE
/**
 * ProtectedRoute - Guards routes by checking localStorage 'isLoggedIn'.
 * If not logged in, redirects to /login preserving the intended destination.
 * Wrap protected routes' elements with this component.
 * @param {object} props
 * @param {React.ReactNode} props.children - The element to render when authenticated
 */
function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

// PUBLIC_INTERFACE
/**
 * Main application component that sets up routing and navigation
 * for the Weekly Status Report Dashboard.
 * Uses responsive Layout component with Navbar and Sidebar for navigation.
 * Adds minimal auth flow: /login route and route protection for app routes.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login route: if already logged in, redirect to dashboard/home */}
        <Route
          path="/login"
          element={
            isLoggedIn() ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />

        {/* Protected application routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <SubmitPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <Layout>
                <SubmitPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <Layout>
                <HistoryPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ReportDetailPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminUsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teams"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminTeamsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
