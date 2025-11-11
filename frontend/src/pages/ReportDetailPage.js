import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';

// PUBLIC_INTERFACE
/**
 * ReportDetailPage component - Displays detailed view of a single weekly status report
 * Features:
 * - Report title with week ending date
 * - Report metadata (status, submission date, report ID)
 * - Detailed sections for accomplishments, goals, blockers, and highlights
 * - AI Summary placeholder panel
 * - Back navigation button
 * - Responsive Soft Mono minimalist styling
 * - Mock data loading by ID with TODO to replace with reportService
 * 
 * @returns {JSX.Element} The report detail page component
 */
function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for report data
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load report data by ID
   * TODO: Replace with actual API call to reportService.getReportById(id)
   */
  useEffect(() => {
    const loadReport = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));

        // TODO: Replace with: const data = await reportService.getReportById(id);
        // Mock data based on the same data structure from HistoryPage
        const mockReports = {
          'RPT-001': {
            id: 'RPT-001',
            weekEnding: '2024-01-19',
            accomplishments: 'Completed the authentication module implementation with OAuth2 integration. Fixed 15 critical bugs in the payment gateway. Deployed hotfix for production issue affecting 5% of users.\n\n• Implemented OAuth2 authentication flow with Google and GitHub providers\n• Resolved critical payment processing bug that was causing transaction failures\n• Deployed emergency hotfix to production with zero downtime\n• Conducted thorough testing of the authentication module across all supported browsers\n• Documented the OAuth2 integration process for future reference',
            goals: 'Start working on the new dashboard redesign. Complete code review for team members. Write comprehensive unit tests for the authentication module.\n\n• Begin implementation of the new dashboard UI based on latest designs\n• Review and provide feedback on 5 pending pull requests\n• Achieve 90% test coverage for authentication module\n• Set up automated testing pipeline for the new dashboard\n• Coordinate with design team for final dashboard mockups',
            blockers: 'Waiting for design team to finalize the new dashboard mockups. Need access to staging environment for testing.\n\n• Dashboard design approval delayed by 3 days\n• Staging environment credentials not yet provisioned\n• Third-party OAuth provider rate limiting causing test failures',
            highlights: 'Successfully resolved a high-priority security vulnerability discovered during code review. The fix was deployed to production within 4 hours of discovery, preventing potential data exposure. Received commendation from the security team for quick response and thorough remediation.',
            status: 'submitted',
            submittedAt: '2024-01-19T17:30:00Z',
            submittedBy: 'John Doe',
            teamName: 'Engineering Team Alpha'
          },
          'RPT-002': {
            id: 'RPT-002',
            weekEnding: '2024-01-12',
            accomplishments: 'Refactored the user management system to improve performance by 40%. Implemented caching layer for frequently accessed data. Conducted training session for junior developers.\n\n• Optimized database queries reducing response time from 200ms to 120ms\n• Implemented Redis caching for user profile data\n• Led 2-hour training session on best practices for React hooks\n• Migrated legacy user authentication code to new OAuth system\n• Updated API documentation with new endpoints',
            goals: 'Optimize database queries for the reporting module. Review and merge pending pull requests. Update documentation for the new API endpoints.\n\n• Reduce reporting module query time by at least 30%\n• Clear the PR backlog (currently 8 pending reviews)\n• Complete comprehensive API documentation update\n• Set up performance monitoring for critical endpoints\n• Plan next quarter\'s technical debt reduction initiatives',
            blockers: '',
            highlights: 'Performance improvements resulted in significant load time reduction. User dashboard now loads 40% faster, improving the experience for over 10,000 daily active users. This optimization eliminated the need for immediate infrastructure scaling.',
            status: 'reviewed',
            submittedAt: '2024-01-12T16:45:00Z',
            submittedBy: 'Jane Smith',
            teamName: 'Engineering Team Alpha'
          },
          'RPT-003': {
            id: 'RPT-003',
            weekEnding: '2024-01-05',
            accomplishments: 'Designed and implemented the notification service with email and SMS support. Integrated third-party analytics tool. Participated in architecture review meetings.\n\n• Built scalable notification service handling 10,000+ messages per day\n• Integrated SendGrid for email and Twilio for SMS notifications\n• Added Google Analytics 4 tracking to all user-facing pages\n• Contributed to architecture discussions for the new microservices platform\n• Created comprehensive service documentation',
            goals: 'Add push notification support to the notification service. Write integration tests. Create API documentation.\n\n• Implement Firebase Cloud Messaging for push notifications\n• Achieve 80% test coverage for notification service\n• Complete OpenAPI specification for all notification endpoints\n• Set up monitoring and alerting for notification failures\n• Conduct load testing to ensure service scalability',
            blockers: 'Third-party SMS provider experiencing downtime issues.\n\n• Twilio API showing intermittent 503 errors\n• SMS delivery delayed by up to 15 minutes during peak hours\n• Need to implement fallback SMS provider for redundancy',
            highlights: 'Notification service now supports multi-channel delivery with automatic failover. The service successfully handled Black Friday traffic with 99.8% delivery rate and average delivery time of 2.3 seconds.',
            status: 'submitted',
            submittedAt: '2024-01-05T18:00:00Z',
            submittedBy: 'Mike Johnson',
            teamName: 'Engineering Team Beta'
          },
          'RPT-004': {
            id: 'RPT-004',
            weekEnding: '2023-12-29',
            accomplishments: 'Completed year-end code cleanup and technical debt reduction. Updated all dependencies to latest stable versions. Improved test coverage from 65% to 82%.\n\n• Removed 5,000+ lines of deprecated code\n• Updated 23 npm packages to latest stable versions\n• Added 45 new unit tests and 12 integration tests\n• Resolved 18 security vulnerabilities identified by npm audit\n• Refactored legacy jQuery code to modern React patterns',
            goals: 'Plan Q1 2024 roadmap items. Set up CI/CD pipeline improvements. Conduct performance audit.\n\n• Define Q1 technical initiatives and priorities\n• Implement automated security scanning in CI pipeline\n• Reduce build time by optimizing Docker layers\n• Complete performance audit of top 10 user journeys\n• Set up automated dependency update workflow',
            blockers: '',
            highlights: 'Achieved highest test coverage milestone for the project (82%). This represents a 17 percentage point increase from the beginning of Q4, significantly improving code reliability and reducing production bugs by 35%.',
            status: 'reviewed',
            submittedAt: '2023-12-29T15:20:00Z',
            submittedBy: 'Sarah Williams',
            teamName: 'Engineering Team Alpha'
          },
          'RPT-005': {
            id: 'RPT-005',
            weekEnding: '2023-12-22',
            accomplishments: 'Implemented real-time chat feature using WebSockets. Fixed critical security vulnerability in file upload system. Completed holiday deployment freeze preparations.\n\n• Built WebSocket-based chat system supporting 1,000 concurrent users\n• Implemented proper file type validation and sanitization\n• Prepared rollback procedures for all critical services\n• Updated on-call documentation and runbooks\n• Conducted security audit of file upload functionality',
            goals: 'Monitor production systems during holiday period. Prepare rollback plans for critical services. Update on-call documentation.\n\n• Maintain 99.9% uptime during holiday season\n• Document all rollback procedures for critical services\n• Update incident response playbooks\n• Set up enhanced monitoring alerts for holiday period\n• Ensure team has access to all necessary tools and credentials',
            blockers: 'Limited team availability during holiday season.\n\n• Only 2 engineers available for on-call rotation\n• Delayed response time expected for non-critical issues\n• External dependencies may have reduced support',
            highlights: 'Successfully launched real-time chat with 99.9% uptime. The feature has been adopted by over 60% of active users within the first week, significantly improving team collaboration and reducing email volume by 25%.',
            status: 'submitted',
            submittedAt: '2023-12-22T14:10:00Z',
            submittedBy: 'Tom Davis',
            teamName: 'Engineering Team Beta'
          },
          'RPT-006': {
            id: 'RPT-006',
            weekEnding: '2023-12-15',
            accomplishments: 'Built and deployed the new reporting dashboard with interactive charts. Optimized API response times by implementing GraphQL. Mentored two interns on best practices.\n\n• Created 8 interactive Chart.js visualizations for the dashboard\n• Reduced API calls by 60% using GraphQL query optimization\n• Conducted weekly mentoring sessions with interns\n• Implemented data export functionality (CSV and Excel)\n• Deployed dashboard to production with A/B testing',
            goals: 'Add export functionality to reporting dashboard. Implement data filtering options. Create user guide documentation.\n\n• Support export of dashboard data in multiple formats\n• Add date range and team filtering to all charts\n• Write comprehensive user documentation with screenshots\n• Collect user feedback on dashboard usability\n• Plan phase 2 enhancements based on analytics',
            blockers: '',
            highlights: 'Dashboard received positive feedback from stakeholders with an average satisfaction score of 4.7/5. The interactive visualizations have reduced time spent on manual report generation by 15 hours per week across the organization.',
            status: 'reviewed',
            submittedAt: '2023-12-15T17:55:00Z',
            submittedBy: 'Emily Brown',
            teamName: 'Engineering Team Alpha'
          },
          'RPT-007': {
            id: 'RPT-007',
            weekEnding: '2024-01-26',
            accomplishments: 'Work in progress on the mobile app redesign. Drafted technical specification for the new feature. Attended conference on cloud architecture.\n\n• Created wireframes for 12 mobile app screens\n• Wrote 20-page technical specification document\n• Attended AWS re:Invent conference sessions\n• Gathered requirements from product team\n• Set up development environment for mobile testing',
            goals: 'Complete the mobile app redesign mockups. Get approval for technical spec. Share learnings from conference with the team.\n\n• Finalize all mobile UI designs with product approval\n• Present technical specification to architecture review board\n• Prepare conference learnings presentation for team\n• Begin implementation of mobile app redesign\n• Create project timeline and milestones',
            blockers: 'Waiting for stakeholder feedback on redesign proposal.\n\n• Product team has not reviewed the wireframes yet\n• Budget approval pending for mobile app hosting\n• Need to coordinate with iOS and Android teams',
            highlights: '',
            status: 'draft',
            submittedAt: '2024-01-26T10:00:00Z',
            submittedBy: 'Chris Wilson',
            teamName: 'Engineering Team Beta'
          }
        };

        const reportData = mockReports[id];

        if (!reportData) {
          setError('Report not found');
          setReport(null);
        } else {
          setReport(reportData);
        }
      } catch (err) {
        console.error('Error loading report:', err);
        setError('Failed to load report. Please try again.');
        setReport(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadReport();
    }
  }, [id]);

  /**
   * Get status badge styling based on report status
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-success text-white';
      case 'draft':
        return 'bg-secondary text-white';
      case 'reviewed':
        return 'bg-primary text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    navigate('/history');
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
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
            <p className="text-secondary">Loading report details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !report) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="card text-center py-12">
          <div className="max-w-md mx-auto">
            <svg
              className="w-16 h-16 text-error mx-auto mb-4"
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
            <h3 className="text-xl font-semibold text-text mb-2">Report Not Found</h3>
            <p className="text-secondary mb-6">
              {error || `The report with ID "${id}" could not be found.`}
            </p>
            <button onClick={handleBack} className="btn-primary">
              ← Back to History
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format dates
  const weekEndingDate = report.weekEnding
    ? format(new Date(report.weekEnding), 'MMMM dd, yyyy')
    : 'N/A';

  const submittedDate = report.submittedAt
    ? format(new Date(report.submittedAt), 'MMMM dd, yyyy \'at\' h:mm a')
    : 'Not submitted';

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Navigation */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-primary hover:text-gray-800 transition-colors duration-200"
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
          <span className="font-medium">Back to History</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-text mb-2">
              Weekly Status Report
            </h1>
            <p className="text-xl text-secondary">
              Week Ending: {weekEndingDate}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadge(
              report.status
            )}`}
          >
            {report.status
              ? report.status.charAt(0).toUpperCase() + report.status.slice(1)
              : 'Unknown'}
          </span>
        </div>

        {/* Report Metadata */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">
                Report ID
              </p>
              <p className="text-sm text-text font-mono">{report.id}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">
                Submitted
              </p>
              <p className="text-sm text-text">{submittedDate}</p>
            </div>
            {report.submittedBy && (
              <div>
                <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">
                  Submitted By
                </p>
                <p className="text-sm text-text">{report.submittedBy}</p>
              </div>
            )}
          </div>
          {report.teamName && (
            <div className="mt-4">
              <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">
                Team
              </p>
              <p className="text-sm text-text">{report.teamName}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Report Sections (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Accomplishments Section */}
          <div className="card">
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-success bg-opacity-10 rounded-lg flex items-center justify-center">
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
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-text">Accomplishments</h2>
                <p className="text-sm text-secondary">Key achievements this week</p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-text whitespace-pre-line leading-relaxed">
                {report.accomplishments}
              </p>
            </div>
          </div>

          {/* Goals Section */}
          <div className="card">
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-text">Goals for Next Week</h2>
                <p className="text-sm text-secondary">Planned objectives and targets</p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-text whitespace-pre-line leading-relaxed">
                {report.goals}
              </p>
            </div>
          </div>

          {/* Blockers Section */}
          {report.blockers && (
            <div className="card border-l-4 border-error">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-error bg-opacity-10 rounded-lg flex items-center justify-center">
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
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-text">Blockers & Challenges</h2>
                  <p className="text-sm text-secondary">Issues requiring attention</p>
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-text whitespace-pre-line leading-relaxed">
                  {report.blockers}
                </p>
              </div>
            </div>
          )}

          {/* Highlights Section */}
          {report.highlights && (
            <div className="card bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-text">Highlights & Notes</h2>
                  <p className="text-sm text-secondary">Additional achievements worth mentioning</p>
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-text whitespace-pre-line leading-relaxed">
                  {report.highlights}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - AI Summary Panel (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="card bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-dashed border-purple-200 sticky top-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text">AI Summary</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-white bg-opacity-60 rounded-lg p-4 border border-purple-100">
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-purple-300 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <p className="text-sm text-secondary font-medium mb-2">
                      AI-Powered Summary
                    </p>
                    <p className="text-xs text-secondary">
                      Coming soon
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-secondary space-y-2">
                <p className="font-medium text-text">What to expect:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Key accomplishments summary</li>
                  <li>Priority goals identification</li>
                  <li>Risk assessment from blockers</li>
                  <li>Sentiment analysis</li>
                  <li>Actionable insights</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-purple-200">
                <button
                  disabled
                  className="w-full px-4 py-2 bg-purple-200 text-purple-400 rounded-lg font-medium text-sm cursor-not-allowed"
                >
                  Generate Summary
                </button>
                <p className="text-xs text-center text-secondary mt-2">
                  Feature in development
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-between card">
        <Link to="/history" className="text-primary hover:text-gray-800 font-medium transition-colors">
          ← Back to All Reports
        </Link>
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2 border border-gray-300 text-text rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Export PDF
          </button>
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
            Share Report
          </button>
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
              Currently displaying mock data loaded by report ID. This will be replaced with actual
              API calls to <code className="px-1 py-0.5 bg-gray-200 rounded text-xs">reportService.getReportById(id)</code>.
              Export PDF, Share Report, and AI Summary features are placeholders for future implementation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetailPage;
