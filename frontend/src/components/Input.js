import React from 'react';

// PUBLIC_INTERFACE
/**
 * Input component - Reusable input field with support for text, textarea, labels, hints, and validation
 * Supports text input, textarea, labels, error states, hints, and accessibility features
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Input type: 'text', 'email', 'password', 'number', 'textarea' (default: 'text')
 * @param {string} props.name - Input name attribute
 * @param {string} props.id - Input id attribute
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler function
 * @param {Function} props.onBlur - Blur handler function
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.label - Label text
 * @param {string} props.hint - Hint text displayed below input
 * @param {string} props.error - Error message to display
 * @param {boolean} props.required - Whether field is required (default: false)
 * @param {boolean} props.disabled - Whether input is disabled (default: false)
 * @param {number} props.rows - Number of rows for textarea (default: 4)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.fullWidth - Whether input should take full width (default: true)
 * @returns {JSX.Element} The input component
 */
function Input({
  type = 'text',
  name,
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  hint,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  fullWidth = true,
  ...rest
}) {
  // Generate unique ID if not provided
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;

  // Base input styles
  const baseInputStyles = 'px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200';

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // State-based styles
  const stateStyles = error
    ? 'border-error focus:ring-error focus:border-error'
    : 'border-gray-300 focus:ring-primary focus:border-transparent';

  // Disabled styles
  const disabledStyles = disabled
    ? 'bg-gray-100 cursor-not-allowed opacity-60'
    : 'bg-white';

  // Combine input styles
  const inputClasses = `
    ${baseInputStyles}
    ${widthStyles}
    ${stateStyles}
    ${disabledStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Render textarea or input
  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...rest}
        />
      );
    }

    return (
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...rest}
      />
    );
  };

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text mb-2"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Input or Textarea */}
      {renderInput()}

      {/* Error Message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-error text-sm mt-1 flex items-start"
          role="alert"
        >
          <svg
            className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Hint Text */}
      {hint && !error && (
        <p
          id={`${inputId}-hint`}
          className="text-xs text-secondary mt-1"
        >
          {hint}
        </p>
      )}
    </div>
  );
}

export default Input;
