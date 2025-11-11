import React, { useState, useEffect } from 'react';
import ReportCard from '../components/ReportCard';

// PUBLIC_INTERFACE
/**
 * HistoryPage component - Displays a searchable, filterable list of weekly status reports
 * Features:
 * - Search input with client-side filtering
 * - Grid/List view toggle
 * - Status filter dropdown
 * - Pagination placeholder
 * - Mock data with TODO to connect to reportService
 * - Responsive layout with Soft Mono styling
 * 
 * @returns {JSX.Element} The history page component
 */
function HistoryPage() {
  // View mode state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'submitted', 'draft', 'reviewed'

  // Reports data state
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state (placeholder for now)
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 9;

  /**
   * Load mock report data
   * TODO: Replace with actual API call to reportService
   */
  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // TODO: Replace with: const data = await reportService.getReports();
        const mockData = [
          {
            id: 'RPT-001',
            weekEnding: '2024-01-19',
            accomplishments: 'Completed the authentication module implementation with OAuth2 integration. Fixed 15 critical bugs in the payment gateway. Deployed hotfix for production issue affecting 5% of users.',
            goals: 'Start working on the new dashboard redesign. Complete code review for team members. Write comprehensive unit tests for the authentication module.',
            blockers: 'Waiting for design team to finalize the new dashboard mockups. Need access to staging environment for testing.',
            highlights: 'Successfully resolved a high-priority security vulnerability.',
            status: 'submitted',
            submittedAt: '2024-01-19T17:30:00Z'
          },
          {
            id: 'RPT-002',
            weekEnding: '2024-01-12',
            accomplishments: 'Refactored the user management system to improve performance by 40%. Implemented caching layer for frequently accessed data. Conducted training session for junior developers.',
            goals: 'Optimize database queries for the reporting module. Review and merge pending pull requests. Update documentation for the new API endpoints.',
            blockers: '',
            highlights: 'Performance improvements resulted in significant load time reduction.',
            status: 'reviewed',
            submittedAt: '2024-01-12T16:45:00Z'
          },
          {
            id: 'RPT-003',
            weekEnding: '2024-01-05',
            accomplishments: 'Designed and implemented the notification service with email and SMS support. Integrated third-party analytics tool. Participated in architecture review meetings.',
            goals: 'Add push notification support to the notification service. Write integration tests. Create API documentation.',
            blockers: 'Third-party SMS provider experiencing downtime issues.',
            highlights: 'Notification service now supports multi-channel delivery.',
            status: 'submitted',
            submittedAt: '2024-01-05T18:00:00Z'
          },
          {
            id: 'RPT-004',
            weekEnding: '2023-12-29',
            accomplishments: 'Completed year-end code cleanup and technical debt reduction. Updated all dependencies to latest stable versions. Improved test coverage from 65% to 82%.',
            goals: 'Plan Q1 2024 roadmap items. Set up CI/CD pipeline improvements. Conduct performance audit.',
            blockers: '',
            highlights: 'Achieved highest test coverage milestone for the project.',
            status: 'reviewed',
            submittedAt: '2023-12-29T15:20:00Z'
          },
          {
            id: 'RPT-005',
            weekEnding: '2023-12-22',
            accomplishments: 'Implemented real-time chat feature using WebSockets. Fixed critical security vulnerability in file upload system. Completed holiday deployment freeze preparations.',
            goals: 'Monitor production systems during holiday period. Prepare rollback plans for critical services. Update on-call documentation.',
            blockers: 'Limited team availability during holiday season.',
            highlights: 'Successfully launched real-time chat with 99.9% uptime.',
            status: 'submitted',
            submittedAt: '2023-12-22T14:10:00Z'
          },
          {
            id: 'RPT-006',
            weekEnding: '2023-12-15',
            accomplishments: 'Built and deployed the new reporting dashboard with interactive charts. Optimized API response times by implementing GraphQL. Mentored two interns on best practices.',
            goals: 'Add export functionality to reporting dashboard. Implement data filtering options. Create user guide documentation.',
            blockers: '',
            highlights: 'Dashboard received positive feedback from stakeholders.',
            status: 'reviewed',
            submittedAt: '2023-12-15T17:55:00Z'
          },
          {
            id: 'RPT-007',
            weekEnding: '2024-01-26',
            accomplishments: 'Work in progress on the mobile app redesign. Drafted technical specification for the new feature. Attended conference on cloud architecture.',
            goals: 'Complete the mobile app redesign mockups. Get approval for technical spec. Share learnings from conference with the team.',
            blockers: 'Waiting for stakeholder feedback on redesign proposal.',
            highlights: '',
            status: 'draft',
            submittedAt: '2024-01-26T10:00:00Z'
          }
        ];

        setReports(mockData);
        setFilteredReports(mockData);
      } catch (error) {
        console.error('Error loading reports:', error);
        // TODO: Add error handling UI
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, []);

  /**
   * Filter reports based on search query and status filter
   */
  useEffect(() => {
    let filtered = [...reports];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(report => 
        report.accomplishments.toLowerCase().includes(query) ||
        report.goals.toLowerCase().includes(query) ||
        report.blockers.toLowerCase().includes(query) ||
        report.weekEnding.includes(query) ||
        report.id.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    setFilteredReports(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, statusFilter, reports]);

  /**
   * Calculate pagination
   */
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  /**
   * Handle page change
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          Report History
        </h1>
        <p className="text-secondary">
          View and search through your submitted weekly status reports
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="card mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reports by content, date, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-text"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter and View Controls */}
          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field w-40"
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="reviewed">Reviewed</option>
              <option value="draft">Draft</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-secondary hover:text-text'
                }`}
                title="Grid view"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-secondary hover:text-text'
                }`}
                title="List view"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-secondary">
            Showing <span className="font-medium text-text">{currentReports.length}</span> of{' '}
            <span className="font-medium text-text">{filteredReports.length}</span> reports
            {searchQuery && ` matching "${searchQuery}"`}
            {statusFilter !== 'all' && ` with status "${statusFilter}"`}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
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
            <p className="text-secondary">Loading reports...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredReports.length === 0 && (
        <div className="card text-center py-12">
          <div className="max-w-md mx-auto">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-text mb-2">No reports found</h3>
            <p className="text-secondary mb-6">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t submitted any reports yet'}
            </p>
            {(searchQuery || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Reports Grid/List */}
      {!isLoading && currentReports.length > 0 && (
        <>
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {currentReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Pagination Controls (Placeholder) */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center">
              <div className="card inline-flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-text hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                      pageNum === currentPage
                        ? 'bg-primary text-white'
                        : 'text-text hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-text hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* TODO Notice */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
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
              Currently displaying mock data. This will be replaced with actual API calls to the reportService layer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
