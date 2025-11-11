import React from 'react';

// PUBLIC_INTERFACE
/**
 * Button component - Reusable button with multiple variants, sizes, and states
 * Supports primary, secondary, danger variants with loading and disabled states
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant: 'primary', 'secondary', 'danger' (default: 'primary')
 * @param {string} props.size - Button size: 'sm', 'md', 'lg' (default: 'md')
 * @param {boolean} props.loading - Whether button is in loading state (default: false)
 * @param {boolean} props.disabled - Whether button is disabled (default: false)
 * @param {string} props.type - Button type: 'button', 'submit', 'reset' (default: 'button')
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.fullWidth - Whether button should take full width (default: false)
 * @returns {JSX.Element} The button component
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  fullWidth = false,
  ...rest
}) {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-gray-600 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-secondary text-white hover:bg-gray-400 focus:ring-secondary disabled:bg-gray-300 disabled:cursor-not-allowed',
    danger: 'bg-error text-white hover:bg-red-600 focus:ring-error disabled:bg-red-300 disabled:cursor-not-allowed'
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Loading styles
  const loadingStyles = loading ? 'opacity-75 cursor-wait' : '';

  // Combine all styles
  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    ${widthStyles}
    ${loadingStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-5 w-5"
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
      )}
      {children}
    </button>
  );
}

export default Button;
