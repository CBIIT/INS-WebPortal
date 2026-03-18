/**
 * Formats semicolon-separated values by ensuring consistent spacing.
 * Converts "Value1;Value2" or "Value1;  Value2" to "Value1; Value2"
 *
 * @param {string} str - The string to format
 * @returns {string} - The formatted string with consistent spacing after semicolons
 */
const formatSemicolonSeparatedString = (str) => {
  if (!str) return '';
  return str.split(';').map((item) => item.trim()).join('; ');
};

export default formatSemicolonSeparatedString;
