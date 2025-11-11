import React, { useState, useEffect } from 'react';
import { Button } from '../components';

// PUBLIC_INTERFACE
/**
 * AdminTeamsPage component - Team management interface for administrators
 * Features:
 * - Team list table with search and filtering
 * - Member count and team lead information
 * - Status indicators
 * - Action buttons for team operations
 * - Minimalist Soft Mono styling
 * - Mock data with TODO to connect to team service
 * 
 * @returns {JSX.Element} The admin teams page component
 */
function AdminTeamsPage() {
  // State for teams data
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Load teams data
   * TODO: Replace with actual API call to teamService
   */
  useEffect(() => {
    const loadTeams = async () => {
      setIsLoading(true);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // TODO: Replace with: const data = await teamService.getTeams();
        const mockTeams = [
          {
            id: 'TEAM-001',
            name: 'Engineering Team Alpha',
            description: 'Core platform development and infrastructure',
            teamLead: {
              id: 'USR-002',
              name: 'Jane Smith',
              email: 'jane.smith@company.com'
            },
            memberCount: 12,
            activeMembers: 11,
            reportsThisWeek: 10,
            status: 'active',
            createdAt: '2023-06-15T10:00:00Z'
          },
          {
            id: 'TEAM-002',
            name: 'Engineering Team Beta',
            description: 'Feature development and product enhancements',
            teamLead: {
              id: 'USR-009',
              name: 'Robert Taylor',
              email: 'robert.taylor@company.com'
            },
            memberCount: 10,
            activeMembers: 10,
            reportsThisWeek: 9,
            status: 'active',
            createdAt: '2023-06-20T10:00:00Z'
          },
          {
            id: 'TEAM-003',
            name: 'QA & Testing Team',
            description: 'Quality assurance and automated testing',
            teamLead: {
              id: 'USR-015',
              name: 'Amanda Martinez',
              email: 'amanda.martinez@company.com'
            },
            memberCount: 6,
            activeMembers: 5,
            reportsThisWeek: 5,
            status: 'active',
            createdAt: '2023-07-01T10:00:00Z'
          },
          {
            id: 'TEAM-004',
            name: 'DevOps Team',
            description: 'Infrastructure, deployment, and operations',
            teamLead: {
              id: 'USR-018',
              name: 'David Chen',
              email: 'david.chen@company.com'
            },
            memberCount: 5,
            activeMembers: 5,
            reportsThisWeek: 4,
            status: 'active',
            createdAt: '2023-07-15T10:00:00Z'
          },
          {
            id: 'TEAM-005',
            name: 'Product Design Team',
            description: 'UI/UX design and user research',
            teamLead: {
              id: 'USR-021',
              name: 'Michelle Garcia',
              email: 'michelle.garcia@company.com'
            },
            memberCount: 4,
            activeMembers: 4,
            reportsThisWeek: 4,
            status: 'active',
            createdAt: '2023-08-01T10:00:00Z'
          },
          {
            id: 'TEAM-006',
            name: 'Data Analytics Team',
            description: 'Data science, analytics, and business intelligence',
            teamLead: {
              id: 'USR-024',
              name: 'Kevin Brown',
              email: 'kevin.brown@company.com'
            },
            memberCount: 3,
            activeMembers: 2,
            reportsThisWeek: 2,
            status: 'inactive',
            createdAt: '2023-09-01T10:00:00Z'
          }
        ];

        setTeams(mockTeams);
        setFilteredTeams(mockTeams);
      } catch (error) {
        console.error('Error loading teams:', error);
        // TODO: Add error handling UI
      } finally {
        setIsLoading(false);
      }
    };

    loadTeams();
  }, []);

  /**
   * Filter teams based on search query
   */
  useEffect(() => {
    let filtered = [...teams];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(query) ||
        team.description.toLowerCase().includes(query) ||
        team.teamLead.name.toLowerCase().includes(query) ||
        team.id.toLowerCase().includes(query)
      );
    }

    setFilteredTeams(filtered);
  }, [searchQuery, teams]);

  /**
   * Get status badge styling
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success bg-opacity-10 text-success';
      case 'inactive':
        return 'bg-secondary bg-opacity-10 text-secondary';
      default:
        return 'bg-secondary bg-opacity-10 text-secondary';
    }
  };

  /**
   * Calculate team health percentage
   */
  const getTeamHealthPercentage = (team) => {
    if (team.memberCount === 0) return 0;
    return Math.round((team.reportsThisWeek / team.activeMembers) * 100);
  };

  /**
   * Get health indicator styling
   */
  const getHealthIndicator = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-error';
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
            <p className="text-secondary">Loading teams...</p>
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
          Team Management
        </h1>
        <p className="text-secondary">
          Manage teams, assign members, and track team activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-secondary mb-1">Total Teams</p>
          <p className="text-3xl font-bold text-text">{teams.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary mb-1">Active Teams</p>
          <p className="text-3xl font-bold text-success">
            {teams.filter(t => t.status === 'active').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary mb-1">Total Members</p>
          <p className="text-3xl font-bold text-primary">
            {teams.reduce((sum, team) => sum + team.memberCount, 0)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary mb-1">Reports This Week</p>
          <p className="text-3xl font-bold text-text">
            {teams.reduce((sum, team) => sum + team.reportsThisWeek, 0)}
          </p>
        </div>
      </div>

      {/* Search and Action Controls */}
      <div className="card mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, description, or team lead..."
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

          {/* Add Team Button */}
          <div className="flex items-center space-x-4">
            <Button variant="primary">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Team</span>
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-secondary">
            Showing <span className="font-medium text-text">{filteredTeams.length}</span> of{' '}
            <span className="font-medium text-text">{teams.length}</span> teams
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </div>

      {/* Teams Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Team Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Reports This Week
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-secondary">
                      <svg
                        className="w-12 h-12 mx-auto mb-3 text-secondary"
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
                      <p className="font-medium">No teams found</p>
                      {searchQuery ? (
                        <p className="text-sm mt-1">Try adjusting your search criteria</p>
                      ) : (
                        <p className="text-sm mt-1">No teams available</p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTeams.map((team) => {
                  const healthPercentage = getTeamHealthPercentage(team);
                  return (
                    <tr key={team.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
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
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-text">{team.name}</div>
                            <div className="text-sm text-secondary mt-1 max-w-md">{team.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text">{team.teamLead.name}</div>
                        <div className="text-sm text-secondary">{team.teamLead.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text">
                          {team.activeMembers} / {team.memberCount}
                        </div>
                        <div className="text-xs text-secondary">active members</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-text mr-2">
                            {team.reportsThisWeek} / {team.activeMembers}
                          </div>
                          <div className={`text-sm font-medium ${getHealthIndicator(healthPercentage)}`}>
                            {healthPercentage}%
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full ${
                              healthPercentage >= 80 ? 'bg-success' :
                              healthPercentage >= 50 ? 'bg-yellow-500' :
                              'bg-error'
                            }`}
                            style={{ width: `${healthPercentage}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(team.status)}`}>
                          {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-gray-800 transition-colors mr-3">
                          Edit
                        </button>
                        <button className="text-error hover:text-red-600 transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
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
              Currently displaying mock data. This will be replaced with actual API calls to the teamService layer.
              Add Team, Edit, and Delete actions are placeholders for future implementation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTeamsPage;
