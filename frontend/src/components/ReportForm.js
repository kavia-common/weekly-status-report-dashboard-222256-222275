import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * ReportForm component - Reusable form for submitting weekly status reports
 * Features Tailwind-styled inputs with client-side validation for:
 * - Accomplishments (required)
 * - Goals (required)
 * - Blockers (optional)
 * - Highlights (optional)
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback function when form is submitted with valid data
 * @param {Object} props.initialData - Optional initial form data for editing
 * @param {boolean} props.isSubmitting - Optional flag to show loading state
 * @returns {JSX.Element} The report form component
 */
function ReportForm({ onSubmit, initialData = {}, isSubmitting = false }) {
  // Form state
  const [formData, setFormData] = useState({
    accomplishments: initialData.accomplishments || '',
    goals: initialData.goals || '',
    blockers: initialData.blockers || '',
    highlights: initialData.highlights || ''
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Touch state to track which fields have been interacted with
  const [touched, setTouched] = useState({});

  /**
   * Handle input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Handle field blur to mark as touched
   * @param {string} fieldName - Name of the field
   */
  const handleBlur = (fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
    validateField(fieldName, formData[fieldName]);
  };

  /**
   * Validate a single field
   * @param {string} fieldName - Name of the field to validate
   * @param {string} value - Value to validate
   * @returns {string} Error message if invalid, empty string if valid
   */
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'accomplishments':
        if (!value.trim()) {
          error = 'Accomplishments are required';
        } else if (value.trim().length < 10) {
          error = 'Please provide at least 10 characters';
        }
        break;
      case 'goals':
        if (!value.trim()) {
          error = 'Goals are required';
        } else if (value.trim().length < 10) {
          error = 'Please provide at least 10 characters';
        }
        break;
      case 'blockers':
        // Optional field - no validation
        break;
      case 'highlights':
        // Optional field - no validation
        break;
      default:
        break;
    }

    if (error) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }

    return error;
  };

  /**
   * Validate all form fields
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    // Validate accomplishments
    if (!formData.accomplishments.trim()) {
      newErrors.accomplishments = 'Accomplishments are required';
    } else if (formData.accomplishments.trim().length < 10) {
      newErrors.accomplishments = 'Please provide at least 10 characters';
    }

    // Validate goals
    if (!formData.goals.trim()) {
      newErrors.goals = 'Goals are required';
    } else if (formData.goals.trim().length < 10) {
      newErrors.goals = 'Please provide at least 10 characters';
    }

    setErrors(newErrors);

    // Mark all fields as touched
    setTouched({
      accomplishments: true,
      goals: true,
      blockers: true,
      highlights: true
    });

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, call the onSubmit callback
      onSubmit(formData);
    }
  };

  /**
   * Reset form to initial state
   */
  const handleReset = () => {
    setFormData({
      accomplishments: initialData.accomplishments || '',
      goals: initialData.goals || '',
      blockers: initialData.blockers || '',
      highlights: initialData.highlights || ''
    });
    setErrors({});
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Accomplishments Field */}
      <div>
        <label htmlFor="accomplishments" className="form-label">
          Accomplishments <span className="text-error">*</span>
        </label>
        <textarea
          id="accomplishments"
          name="accomplishments"
          value={formData.accomplishments}
          onChange={handleChange}
          onBlur={() => handleBlur('accomplishments')}
          rows="5"
          className={`textarea-field ${
            touched.accomplishments && errors.accomplishments
              ? 'border-error focus:ring-error'
              : ''
          }`}
          placeholder="List your key accomplishments this week (e.g., completed features, resolved issues, milestones reached)"
          disabled={isSubmitting}
        />
        {touched.accomplishments && errors.accomplishments && (
          <p className="error-message">{errors.accomplishments}</p>
        )}
        <p className="text-xs text-secondary mt-1">
          {formData.accomplishments.length} characters
        </p>
      </div>

      {/* Goals Field */}
      <div>
        <label htmlFor="goals" className="form-label">
          Goals for Next Week <span className="text-error">*</span>
        </label>
        <textarea
          id="goals"
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          onBlur={() => handleBlur('goals')}
          rows="5"
          className={`textarea-field ${
            touched.goals && errors.goals
              ? 'border-error focus:ring-error'
              : ''
          }`}
          placeholder="Outline your planned goals and objectives for next week"
          disabled={isSubmitting}
        />
        {touched.goals && errors.goals && (
          <p className="error-message">{errors.goals}</p>
        )}
        <p className="text-xs text-secondary mt-1">
          {formData.goals.length} characters
        </p>
      </div>

      {/* Blockers Field */}
      <div>
        <label htmlFor="blockers" className="form-label">
          Blockers / Challenges
        </label>
        <textarea
          id="blockers"
          name="blockers"
          value={formData.blockers}
          onChange={handleChange}
          onBlur={() => handleBlur('blockers')}
          rows="4"
          className="textarea-field"
          placeholder="Describe any blockers, challenges, or issues you encountered (optional)"
          disabled={isSubmitting}
        />
        <p className="text-xs text-secondary mt-1">
          {formData.blockers.length} characters
        </p>
      </div>

      {/* Highlights Field */}
      <div>
        <label htmlFor="highlights" className="form-label">
          Highlights / Notes
        </label>
        <textarea
          id="highlights"
          name="highlights"
          value={formData.highlights}
          onChange={handleChange}
          onBlur={() => handleBlur('highlights')}
          rows="4"
          className="textarea-field"
          placeholder="Add any additional highlights, notes, or achievements worth mentioning (optional)"
          disabled={isSubmitting}
        />
        <p className="text-xs text-secondary mt-1">
          {formData.highlights.length} characters
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2.5 text-text hover:text-primary transition-colors duration-200 font-medium"
          disabled={isSubmitting}
        >
          Reset
        </button>

        <button
          type="submit"
          className="btn-primary px-8 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5"
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
              <span>Submitting...</span>
            </span>
          ) : (
            'Submit Report'
          )}
        </button>
      </div>
    </form>
  );
}

export default ReportForm;
