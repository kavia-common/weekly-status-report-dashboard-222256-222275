import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

// PUBLIC_INTERFACE
/**
 * DashboardPage component - Team dashboard with aggregate metrics and activity overview
 * Features:
 * - Responsive grid of metric cards showing key statistics
 * - Recent activity feed with team report submissions
 * - Chart placeholders for data visualization
 * - Minimalist Soft Mono styling with clean layout
 * - Mock data with TODO to connect to dashboard service
 * 
 * @returns {JSX.Element} The dashboard page component
 */
function DashboardPage() {
  // State for dashboard data
  const [metrics, setMetrics] = useState({
    totalReportsThisWeek: 0,
    activeTeamMembers: 0,
    onTrackPercentage: 0,
    blockersCount: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load dashboard data
   * TODO: Replace with actual API call to dashboardService
   */
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // TODO: Replace with: const data = await dashboardService.getDashboardData();
        // Mock metrics data
        const mockMetrics = {
          totalReportsThisWeek: 24,
          activeTeamMembers: 28,
          onTrackPercentage: 87,
          blockersCount: 5
        };

        // Mock recent activity data
        const mockActivity = [
          {
            id: 1,
            userName: 'Sarah Williams',
            action: 'submitted',
            reportId: 'RPT-045',
            weekEnding: '2024-01-26',
            timestamp: '2024-01-26T14:30:00Z',
            hasBlockers: false
          },
          {
            id: 2,
            userName: 'John Doe',
            action: 'submitted',
            reportId: 'RPT-044',
            weekEnding: '2024-01-26',
            timestamp: '2024-01-26T13:15:00Z',
            hasBlockers: true
          },
          {
            id: 3,
            userName: 'Emily Brown',
            action: 'submitted',
            reportId: 'RPT-043',
            weekEnding: '2024-01-26',
            timestamp: '2024-01-26T11:45:00Z',
            hasBlockers: false
          },
          {
            id: 4,
            userName: 'Mike Johnson',
            action: 'updated',
            reportId: 'RPT-042',
            weekEnding: '2024-01-19',
            timestamp: '2024-01-26T10:20:00Z',
            hasBlockers: false
          },
          {
            id: 5,
            userName: 'Tom Davis',
            action: 'submitted',
            reportId: 'RPT-041',
            weekEnding: '2024-01-26',
            timestamp: '2024-01-26T09:00:00Z',
            hasBlockers: true
          },
          {
            id: 6,
            userName: 'Jane Smith',
            action: 'submitted',
            reportId: 'RPT-040',
            weekEnding: '2024-01-26',
            timestamp: '2024-01-25T17:30:00Z',
            hasBlockers: false
          },
          {
            id: 7,
            userName: 'Chris Wilson',
            action: 'submitted',
            reportId: 'RPT-039',
            weekEnding: '2024-01-26',
            timestamp: '2024-01-25T16:10:00Z',
            hasBlockers: false
          }
        ];

        setMetrics(mockMetrics);
        setRecentActivity(mockActivity);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // TODO: Add error handling UI
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  /**
   * Format timestamp for display
   */
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      return format(date, 'MMM dd, yyyy h:mm a');
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <svg
              className="animate-spin h-10 w-10 text-primary mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-secondary">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          Team Dashboard
        </h1>
        <p className="text-secondary">
          Overview of team activity and key metrics for this week
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Reports This Week Card */}
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-shrink-0 w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-text mb-1">
              {metrics.totalReportsThisWeek}
            </p>
            <p className="text-sm text-secondary">
              Reports This Week
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-success flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              +12% from last week
            </p>
          </div>
        </div>

        {/* Active Team Members Card */}
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-shrink-0 w-12 h-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-text mb-1">
              {metrics.activeTeamMembers}
            </p>
            <p className="text-sm text-secondary">
              Active Team Members
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-secondary">
              Total team size: 30
            </p>
          </div>
        </div>

        {/* On-Track Percentage Card */}
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-shrink-0 w-12 h-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-text mb-1">
              {metrics.onTrackPercentage}%
            </p>
            <p className="text-sm text-secondary">
              On Track
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.onTrackPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Blockers Count Card */}
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-shrink-0 w-12 h-12 bg-error bg-opacity-10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-error"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-text mb-1">
              {metrics.blockersCount}
            </p>
            <p className="text-sm text-secondary">
              Active Blockers
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-error flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Needs attention
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - 2/3 width */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-text">
                  Recent Activity
                </h2>
                <p className="text-sm text-secondary mt-1">
                  Latest team report submissions and updates
                </p>
              </div>
              <Link
                to="/history"
                className="text-sm text-primary hover:text-gray-800 font-medium transition-colors"
              >
                View All →
              </Link>
            </div>

            {/* Activity Feed */}
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-4 pb-4 ${
                    index !== recentActivity.length - 1
                      ? 'border-b border-gray-200'
                      : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {activity.userName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-text">
                          <span className="font-medium">{activity.userName}</span>
                          {' '}
                          <span className="text-secondary">
                            {activity.action === 'submitted' ? 'submitted' : 'updated'}
                          </span>
                          {' '}
                          <Link
                            to={`/history/${activity.reportId}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {activity.reportId}
                          </Link>
                        </p>
                        <p className="text-xs text-secondary mt-1">
                          Week ending {format(new Date(activity.weekEnding), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        {activity.hasBlockers && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error bg-opacity-10 text-error">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            Blocker
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-secondary mt-2">
                      {formatTimestamp(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <Link
                to="/history"
                className="inline-flex items-center px-6 py-2 bg-gray-100 hover:bg-gray-200 text-text rounded-lg transition-colors duration-200 font-medium"
              >
                View All Reports
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Chart Placeholders - 1/3 width */}
        <div className="lg:col-span-1 space-y-6">
          {/* Weekly Trend Chart Placeholder */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text mb-4">
              Weekly Trend
            </h3>
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center p-6">
                <svg
                  className="w-12 h-12 text-secondary mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-sm text-secondary font-medium">
                  Chart Placeholder
                </p>
                <p className="text-xs text-secondary mt-1">
                  Report submission trends
                </p>
              </div>
            </div>
          </div>

          {/* Team Activity Chart Placeholder */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text mb-4">
              Team Activity
            </h3>
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center p-6">
                <svg
                  className="w-12 h-12 text-secondary mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
                <p className="text-sm text-secondary font-medium">
                  Chart Placeholder
                </p>
                <p className="text-xs text-secondary mt-1">
                  Activity distribution
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Chart Section - Full Width */}
      <div className="mt-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text">
                Report Submission Timeline
              </h2>
              <p className="text-sm text-secondary mt-1">
                Weekly report submissions over the past 8 weeks
              </p>
            </div>
            <select className="input-field w-40">
              <option value="8weeks">Last 8 Weeks</option>
              <option value="12weeks">Last 12 Weeks</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center p-6">
              <svg
                className="w-16 h-16 text-secondary mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <p className="text-base text-secondary font-medium mb-2">
                Timeline Chart Placeholder
              </p>
              <p className="text-sm text-secondary">
                Historical submission data will be visualized here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TODO Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <svg
            className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-text mb-1">Development Notice</h4>
            <p className="text-sm text-secondary">
              Currently displaying mock data. This will be replaced with actual API calls to the dashboardService layer.
              Chart placeholders will be replaced with interactive visualizations using a charting library (e.g., Chart.js, Recharts).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
