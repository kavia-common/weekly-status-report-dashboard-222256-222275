import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

// PUBLIC_INTERFACE
/**
 * Formats a date string or Date object into a human-readable format.
 * @param {string|Date} date - The date to format
 * @param {string} formatStr - The format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date string or 'Invalid date' if parsing fails
 */
export function formatDate(date, formatStr = 'MMM dd, yyyy') {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid date';
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

// PUBLIC_INTERFACE
/**
 * Formats a date as a relative time string (e.g., '2 hours ago', '3 days ago').
 * @param {string|Date} date - The date to format
 * @param {object} options - Options for formatDistanceToNow
 * @returns {string} Relative time string or 'Invalid date' if parsing fails
 */
export function formatRelative(date, options = { addSuffix: true }) {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid date';
    return formatDistanceToNow(dateObj, options);
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return 'Invalid date';
  }
}

// PUBLIC_INTERFACE
/**
 * Formats a date with time in a standard format.
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date and time string
 */
export function formatDateTime(date) {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
}

// PUBLIC_INTERFACE
/**
 * Formats a date for display in forms (YYYY-MM-DD).
 * @param {string|Date} date - The date to format
 * @returns {string} Date string in ISO format (YYYY-MM-DD)
 */
export function formatDateForInput(date) {
  return formatDate(date, 'yyyy-MM-dd');
}

// PUBLIC_INTERFACE
/**
 * Checks if a date string or Date object is valid.
 * @param {string|Date} date - The date to validate
 * @returns {boolean} True if the date is valid, false otherwise
 */
export function isValidDate(date) {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj);
  } catch (error) {
    return false;
  }
}
