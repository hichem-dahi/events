/**
 * Formats a date and time into a structured object with readable parts.
 *
 * This function takes a date string and an optional time string, parses them into a `Date` object,
 * and formats the date and time into a structured object using `Intl.DateTimeFormat`. The object includes
 * components of the date and time such as the weekday, day, month, year, and time (hour).
 *
 * **Parameters**:
 * - `dateStr` (string): The date in the format `YYYY-MM-DD` (e.g., "2024-07-20").
 * - `timeStr` (string, optional): The time in the format `HH:mm` (e.g., "19:00"). Defaults to "12:00".
 *
 * **Returns**:
 * - An object containing formatted parts of the date and time:
 *   - `weekday`: Short name for the day of the week (e.g., "Wed").
 *   - `day`: Two-digit day (e.g., "20").
 *   - `month`: Full month name (e.g., "July").
 *   - `year`: Four-digit year (e.g., "2024").
 *   - `hour`: Numeric hour in 12-hour format (e.g., "8 PM").
 */
export function formatDateAndTime(dateStr: string, timeStr: string) {
  const date = new Date(`${dateStr}T${timeStr}:00`); // YYYY-MM-DDTHH:mm:ss

  // Define options for Intl.DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',   // Short name for the day of the week (e.g., "Wed")
    day: '2-digit',     // Two-digit day (e.g., "14")
    month: 'long',      // Full month name (e.g., "July")
    year: 'numeric',    // Four-digit year (e.g., "2024")
    hour: 'numeric',    // Numeric hour (e.g., "8 PM")
    hour12: true        // Use 12-hour clock and show AM/PM
  };

  // Format the date using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  // Convert parts to an object for easier manipulation
  const dateParts = parts.reduce((acc: Record<string, string>, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});

  return dateParts
}