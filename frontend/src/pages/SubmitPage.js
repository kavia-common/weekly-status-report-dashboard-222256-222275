import React, { useState } from 'react';
import ReportForm from '../components/ReportForm';
import { createReport } from '../services/reportService';

// PUBLIC_INTERFACE
/**
 * SubmitPage component - Page for submitting weekly status reports
 * Features a form with validation for accomplishments, goals, blockers, and highlights
 * Includes success/error notifications and form submission handling
 * 
 * @returns {JSX.Element} The submit page component
 */
function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  /**
   * Handle form submission
   * This is a stub that will later call the service layer
   * @param {Object} formData - The submitted form data
   */
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setNotification(null);

    try {
      // TODO: Uncomment when backend is ready
      // const response = await createReport(formData);
      // console.log('Report submitted:', response);
      
      // Simulate API call delay (remove when backend is ready)
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Report submitted (mock):', formData);

      // Show success notification
      setNotification({
        type: 'success',
        message: 'Report submitted successfully! Your weekly status report has been recorded.'
      });

      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);

    } catch (error) {
      console.error('Error submitting report:', error);
      
      // Show error notification
      setNotification({
        type: 'error',
        message: 'Failed to submit report. Please try again or contact support if the issue persists.'
      });

      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          Submit Weekly Status Report
        </h1>
        <p className="text-secondary">
          Share your accomplishments, goals, and any challenges from this week.
          Required fields are marked with <span className="text-error">*</span>
        </p>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            notification.type === 'success'
              ? 'bg-green-50 border-success text-green-800'
              : 'bg-red-50 border-error text-red-800'
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <svg
                  className="h-5 w-5 text-success"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-error"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Report Form Card */}
      <div className="card">
        <ReportForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-semibold text-text mb-2">Tips for Writing Your Report</h3>
        <ul className="text-sm text-secondary space-y-1 list-disc list-inside">
          <li>Be specific and concise in your accomplishments</li>
          <li>Set clear, measurable goals for the upcoming week</li>
          <li>Don't hesitate to mention blockers - they help the team support you</li>
          <li>Use bullet points for better readability</li>
        </ul>
      </div>
    </div>
  );
}

export default SubmitPage;
