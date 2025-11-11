import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

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
      <Input
        type="textarea"
        id="accomplishments"
        name="accomplishments"
        label="Accomplishments"
        value={formData.accomplishments}
        onChange={handleChange}
        onBlur={() => handleBlur('accomplishments')}
        rows={5}
        placeholder="List your key accomplishments this week (e.g., completed features, resolved issues, milestones reached)"
        disabled={isSubmitting}
        required
        error={touched.accomplishments ? errors.accomplishments : ''}
        hint={`${formData.accomplishments.length} characters`}
      />

      {/* Goals Field */}
      <Input
        type="textarea"
        id="goals"
        name="goals"
        label="Goals for Next Week"
        value={formData.goals}
        onChange={handleChange}
        onBlur={() => handleBlur('goals')}
        rows={5}
        placeholder="Outline your planned goals and objectives for next week"
        disabled={isSubmitting}
        required
        error={touched.goals ? errors.goals : ''}
        hint={`${formData.goals.length} characters`}
      />

      {/* Blockers Field */}
      <Input
        type="textarea"
        id="blockers"
        name="blockers"
        label="Blockers / Challenges"
        value={formData.blockers}
        onChange={handleChange}
        onBlur={() => handleBlur('blockers')}
        rows={4}
        placeholder="Describe any blockers, challenges, or issues you encountered (optional)"
        disabled={isSubmitting}
        hint={`${formData.blockers.length} characters`}
      />

      {/* Highlights Field */}
      <Input
        type="textarea"
        id="highlights"
        name="highlights"
        label="Highlights / Notes"
        value={formData.highlights}
        onChange={handleChange}
        onBlur={() => handleBlur('highlights')}
        rows={4}
        placeholder="Add any additional highlights, notes, or achievements worth mentioning (optional)"
        disabled={isSubmitting}
        hint={`${formData.highlights.length} characters`}
      />

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Reset
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </div>
    </form>
  );
}

export default ReportForm;
