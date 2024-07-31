export function formatDateAndTime(dateStr: string, timeStr = '12:00') {
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