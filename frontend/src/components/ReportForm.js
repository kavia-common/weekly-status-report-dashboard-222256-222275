import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

// PUBLIC_INTERFACE
/**
 * ReportForm component - Reusable form for submitting weekly status reports
 * Minimalist Soft Mono themed Tailwind inputs with client-side validation.
 * Fields:
 * - What was worked on / resolutions (required)
 * - blockers (optional)
 * - help needed (optional)
 * - key learnings (optional)
 * - next week’s plan (optional)
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback when form is submitted with valid data
 * @param {Object} props.initialData - Optional initial form data for editing
 * @param {boolean} props.isSubmitting - Optional flag to show loading state
 * @returns {JSX.Element} The report form component
 */
function ReportForm({ onSubmit, initialData = {}, isSubmitting = false }) {
  // Form state mapped to new fields; keep object structure to not break submit behavior
  const [formData, setFormData] = useState({
    workedOn: initialData.workedOn || initialData.accomplishments || '',
    blockers: initialData.blockers || '',
    helpNeeded: initialData.helpNeeded || '',
    learnings: initialData.learnings || initialData.highlights || '',
    nextWeekPlan: initialData.nextWeekPlan || initialData.goals || ''
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
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
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
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true
    }));
    validateField(fieldName, formData[fieldName]);
  };

  /**
   * Validate a single field
   * Only 'workedOn' is required.
   * @param {string} fieldName - Name of the field to validate
   * @param {string} value - Value to validate
   * @returns {string} Error message if invalid, empty string if valid
   */
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'workedOn':
        if (!value.trim()) {
          error = 'This field is required';
        } else if (value.trim().length < 10) {
          error = 'Please provide at least 10 characters';
        }
        break;
      case 'blockers':
      case 'helpNeeded':
      case 'learnings':
      case 'nextWeekPlan':
        // Optional fields - no validation rules
        break;
      default:
        break;
    }

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error
      }));
    }

    return error;
  };

  /**
   * Validate all form fields
   * Only enforce validation on 'workedOn'.
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    // Validate required field
    if (!formData.workedOn.trim()) {
      newErrors.workedOn = 'This field is required';
    } else if (formData.workedOn.trim().length < 10) {
      newErrors.workedOn = 'Please provide at least 10 characters';
    }

    setErrors(newErrors);

    // Mark all fields as touched
    setTouched({
      workedOn: true,
      blockers: true,
      helpNeeded: true,
      learnings: true,
      nextWeekPlan: true
    });

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * Keep submission behavior unchanged (pass formData object).
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
      workedOn: initialData.workedOn || initialData.accomplishments || '',
      blockers: initialData.blockers || '',
      helpNeeded: initialData.helpNeeded || '',
      learnings: initialData.learnings || initialData.highlights || '',
      nextWeekPlan: initialData.nextWeekPlan || initialData.goals || ''
    });
    setErrors({});
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* What was worked on / resolutions - required */}
      <Input
        type="textarea"
        id="workedOn"
        name="workedOn"
        label="What was worked on / resolutions"
        value={formData.workedOn}
        onChange={handleChange}
        onBlur={() => handleBlur('workedOn')}
        rows={6}
        placeholder="Summarize the work completed and resolutions achieved this week..."
        disabled={isSubmitting}
        required
        error={touched.workedOn ? errors.workedOn : ''}
        hint={`${formData.workedOn.length} characters`}
        data-testid="field-worked-on"
      />

      {/* Blockers - optional */}
      <Input
        type="textarea"
        id="blockers"
        name="blockers"
        label="Blockers"
        value={formData.blockers}
        onChange={handleChange}
        onBlur={() => handleBlur('blockers')}
        rows={4}
        placeholder="List any blockers or challenges (optional)"
        disabled={isSubmitting}
        hint={`${formData.blockers.length} characters`}
        data-testid="field-blockers"
      />

      {/* Help needed - optional */}
      <Input
        type="textarea"
        id="helpNeeded"
        name="helpNeeded"
        label="Help needed"
        value={formData.helpNeeded}
        onChange={handleChange}
        onBlur={() => handleBlur('helpNeeded')}
        rows={4}
        placeholder="Describe any help or support you need (optional)"
        disabled={isSubmitting}
        hint={`${formData.helpNeeded.length} characters`}
        data-testid="field-help-needed"
      />

      {/* Key learnings - optional */}
      <Input
        type="textarea"
        id="learnings"
        name="learnings"
        label="Key learnings"
        value={formData.learnings}
        onChange={handleChange}
        onBlur={() => handleBlur('learnings')}
        rows={4}
        placeholder="Share key learnings or insights from this week (optional)"
        disabled={isSubmitting}
        hint={`${formData.learnings.length} characters`}
        data-testid="field-key-learnings"
      />

      {/* Next week’s plan - optional */}
      <Input
        type="textarea"
        id="nextWeekPlan"
        name="nextWeekPlan"
        label="Next week’s plan"
        value={formData.nextWeekPlan}
        onChange={handleChange}
        onBlur={() => handleBlur('nextWeekPlan')}
        rows={5}
        placeholder="Outline your plan and priorities for next week (optional)"
        disabled={isSubmitting}
        hint={`${formData.nextWeekPlan.length} characters`}
        data-testid="field-next-week-plan"
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
