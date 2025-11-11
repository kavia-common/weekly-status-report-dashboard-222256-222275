import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
/**
 * AdminUsersPage component - User management interface for administrators
 * Features:
 * - User list table with search and filtering
 * - Status indicators (active, inactive)
 * - Role management display
 * - Action buttons for user operations
 * - Minimalist Soft Mono styling
 * - Mock data with TODO to connect to user service
 * 
 * @returns {JSX.Element} The admin users page component
 */
function AdminUsersPage() {
  // State for users data
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'

  /**
   * Load users data
   * TODO: Replace with actual API call to userService
   */
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // TODO: Replace with: const data = await userService.getUsers();
        const mockUsers = [
          {
            id: 'USR-001',
            name: 'John Doe',
            email: 'john.doe@company.com',
            role: 'Admin',
            team: 'Engineering Team Alpha',
            status: 'active',
            lastActive: '2024-01-26T14:30:00Z',
            reportsSubmitted: 24
          },
          {
            id: 'USR-002',
            name: 'Jane Smith',
            email: 'jane.smith@company.com',
            role: 'Team Lead',
            team: 'Engineering Team Alpha',
            status: 'active',
            lastActive: '2024-01-26T13:15:00Z',
            reportsSubmitted: 22
          },
          {
            id: 'USR-003',
            name: 'Mike Johnson',
            email: 'mike.johnson@company.com',
            role: 'Developer',
            team: 'Engineering Team Beta',
            status: 'active',
            lastActive: '2024-01-26T11:45:00Z',
            reportsSubmitted: 20
          },
          {
            id: 'USR-004',
            name: 'Sarah Williams',
            email: 'sarah.williams@company.com',
            role: 'Developer',
            team: 'Engineering Team Alpha',
            status: 'active',
            lastActive: '2024-01-26T10:20:00Z',
            reportsSubmitted: 23
          },
          {
            id: 'USR-005',
            name: 'Tom Davis',
            email: 'tom.davis@company.com',
            role: 'Developer',
            team: 'Engineering Team Beta',
            status: 'active',
            lastActive: '2024-01-26T09:00:00Z',
            reportsSubmitted: 19
          },
          {
            id: 'USR-006',
            name: 'Emily Brown',
            email: 'emily.brown@company.com',
            role: 'Team Lead',
            team: 'Engineering Team Alpha',
            status: 'inactive',
            lastActive: '2024-01-15T17:30:00Z',
            reportsSubmitted: 18
          },
          {
            id: 'USR-007',
            name: 'Chris Wilson',
            email: 'chris.wilson@company.com',
            role: 'Developer',
            team: 'Engineering Team Beta',
            status: 'active',
            lastActive: '2024-01-25T16:10:00Z',
            reportsSubmitted: 21
          },
          {
            id: 'USR-008',
            name: 'Lisa Anderson',
            email: 'lisa.anderson@company.com',
            role: 'Developer',
            team: 'Engineering Team Alpha',
            status: 'inactive',
            lastActive: '2024-01-10T12:00:00Z',
            reportsSubmitted: 15
          }
        ];

        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error('Error loading users:', error);
        // TODO: Add error handling UI
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  /**
   * Filter users based on search query and status filter
   */
  useEffect(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.team.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, statusFilter, users]);

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
   * Get role badge styling
   */
  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-primary bg-opacity-10 text-primary';
      case 'Team Lead':
        return 'bg-purple-100 text-purple-700';
      case 'Developer':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-secondary bg-opacity-10 text-secondary';
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
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
            <p className="text-secondary">Loading users...</p>
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
          User Management
        </h1>
        <p className="text-secondary">
          Manage user accounts, roles, and permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-secondary mb-1">Total Users</p>
          <p className="text-3xl font-bold text-text">{users.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary mb-1">Active Users</p>
          <p className="text-3xl font-bold text-success">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary mb-1">Inactive Users</p>
          <p className="text-3xl font-bold text-secondary">
            {users.filter(u => u.status === 'inactive').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-secondary mb-1">Admins</p>
          <p className="text-3xl font-bold text-primary">
            {users.filter(u => u.role === 'Admin').length}
          </p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="card mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, team, or role..."
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

          {/* Filter and Action Controls */}
          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field w-40"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Add User Button */}
            <button className="btn-primary flex items-center space-x-2">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-secondary">
            Showing <span className="font-medium text-text">{filteredUsers.length}</span> of{' '}
            <span className="font-medium text-text">{users.length}</span> users
            {searchQuery && ` matching "${searchQuery}"`}
            {statusFilter !== 'all' && ` with status "${statusFilter}"`}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Reports
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
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
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <p className="font-medium">No users found</p>
                      {searchQuery || statusFilter !== 'all' ? (
                        <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                      ) : (
                        <p className="text-sm mt-1">No users available</p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text">{user.name}</div>
                          <div className="text-sm text-secondary">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text">{user.team}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text">{user.reportsSubmitted}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary">{formatDate(user.lastActive)}</div>
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
                ))
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
              Currently displaying mock data. This will be replaced with actual API calls to the userService layer.
              Add User, Edit, and Delete actions are placeholders for future implementation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersPage;
