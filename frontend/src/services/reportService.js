import apiClient from './api';

/**
 * Report Service
 * Handles all API calls related to weekly status reports
 */

// PUBLIC_INTERFACE
/**
 * Create a new weekly status report
 * @param {Object} reportData - Report data containing accomplishments, goals, blockers, etc.
 * @param {string} reportData.weekEnding - Week ending date (ISO format)
 * @param {string} reportData.accomplishments - Accomplishments text
 * @param {string} reportData.goals - Goals text
 * @param {string} reportData.blockers - Blockers text (optional)
 * @param {string} reportData.highlights - Highlights text (optional)
 * @returns {Promise<Object>} Created report object
 */
export const createReport = async (reportData) => {
  try {
    const response = await apiClient.post('/reports', reportData);
    return response.data;
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Get all reports for the current user
 * @param {Object} params - Query parameters for filtering and pagination
 * @param {number} params.page - Page number (optional)
 * @param {number} params.limit - Items per page (optional)
 * @param {string} params.status - Filter by status (optional)
 * @param {string} params.search - Search query (optional)
 * @returns {Promise<Array>} Array of report objects
 */
export const getReports = async (params = {}) => {
  try {
    const response = await apiClient.get('/reports', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Get a single report by ID
 * @param {string} reportId - The report ID
 * @returns {Promise<Object>} Report object with full details
 */
export const getReportById = async (reportId) => {
  try {
    const response = await apiClient.get(`/reports/${reportId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching report ${reportId}:`, error);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Update an existing report
 * @param {string} reportId - The report ID
 * @param {Object} updateData - Updated report data
 * @returns {Promise<Object>} Updated report object
 */
export const updateReport = async (reportId, updateData) => {
  try {
    const response = await apiClient.put(`/reports/${reportId}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating report ${reportId}:`, error);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Delete a report
 * @param {string} reportId - The report ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteReport = async (reportId) => {
  try {
    const response = await apiClient.delete(`/reports/${reportId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting report ${reportId}:`, error);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Get dashboard summary data
 * Includes metrics and recent activity for the team dashboard
 * @returns {Promise<Object>} Dashboard data with metrics and activity
 * @returns {Object} data.metrics - Aggregate metrics (totalReportsThisWeek, activeTeamMembers, etc.)
 * @returns {Array} data.recentActivity - Recent report submissions and updates
 */
export const getDashboardSummary = async () => {
  try {
    const response = await apiClient.get('/dashboard/summary');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    throw error;
  }
};

// Export all service functions as default object for convenience
export default {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
  getDashboardSummary,
};
