import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

// PUBLIC_INTERFACE
/**
 * ReportCard component - Displays a summary card for a weekly status report
 * Features Soft Mono minimalist styling with hover effects
 * Used in History page for displaying report list/grid
 * 
 * @param {Object} props - Component props
 * @param {Object} props.report - Report data object
 * @param {string} props.report.id - Report unique identifier
 * @param {string} props.report.weekEnding - ISO date string for week ending
 * @param {string} props.report.accomplishments - Brief accomplishments text
 * @param {string} props.report.goals - Brief goals text
 * @param {string} props.report.blockers - Brief blockers text (optional)
 * @param {string} props.report.status - Report status (draft, submitted, reviewed)
 * @param {string} props.report.submittedAt - ISO date string for submission time
 * @param {string} props.viewMode - Display mode: 'grid' or 'list' (default: 'grid')
 * @returns {JSX.Element} The report card component
 */
function ReportCard({ report, viewMode = 'grid' }) {
  // Format dates for display
  const weekEndingDate = report.weekEnding 
    ? format(new Date(report.weekEnding), 'MMM dd, yyyy')
    : 'N/A';
  
  const submittedDate = report.submittedAt
    ? format(new Date(report.submittedAt), 'MMM dd, yyyy h:mm a')
    : 'Not submitted';

  // Get status badge styling
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

  // Truncate text for preview
  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'N/A';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Grid view card
  if (viewMode === 'grid') {
    return (
      <Link
        to={`/history/${report.id}`}
        className="card hover:shadow-lg transition-shadow duration-300 block group"
      >
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
              Week Ending {weekEndingDate}
            </h3>
            <p className="text-xs text-secondary mt-1">
              Submitted: {submittedDate}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
            {report.status ? report.status.charAt(0).toUpperCase() + report.status.slice(1) : 'Unknown'}
          </span>
        </div>

        {/* Card Content */}
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-text mb-1">Accomplishments</h4>
            <p className="text-sm text-secondary line-clamp-3">
              {truncateText(report.accomplishments)}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-text mb-1">Goals</h4>
            <p className="text-sm text-secondary line-clamp-2">
              {truncateText(report.goals, 80)}
            </p>
          </div>

          {report.blockers && (
            <div className="pt-2 border-t border-gray-100">
              <h4 className="text-sm font-medium text-error mb-1">Blockers</h4>
              <p className="text-sm text-secondary line-clamp-2">
                {truncateText(report.blockers, 80)}
              </p>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-secondary">
            Report ID: {report.id}
          </span>
          <span className="text-sm text-primary group-hover:underline">
            View Details →
          </span>
        </div>
      </Link>
    );
  }

  // List view card
  return (
    <Link
      to={`/history/${report.id}`}
      className="card hover:shadow-lg transition-shadow duration-300 block group"
    >
      <div className="flex items-start justify-between">
        {/* Left Section - Main Content */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
              Week Ending {weekEndingDate}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
              {report.status ? report.status.charAt(0).toUpperCase() + report.status.slice(1) : 'Unknown'}
            </span>
          </div>
          
          <p className="text-xs text-secondary mb-3">
            Submitted: {submittedDate}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-text mb-1">Accomplishments</h4>
              <p className="text-sm text-secondary line-clamp-2">
                {truncateText(report.accomplishments)}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text mb-1">Goals</h4>
              <p className="text-sm text-secondary line-clamp-2">
                {truncateText(report.goals)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Action */}
        <div className="flex-shrink-0">
          <span className="text-sm text-primary group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ReportCard;
