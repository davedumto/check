import { parse, formatISO } from "date-fns";

/**
 * Converts a date string in the format "17th June, 1999: 8:12 PM" to ISO 8601 format
 * @param dateString - Date string in the format "DDth MMMM, YYYY: HH:mm A"
 * @returns ISO 8601 formatted date string or null if parsing fails
 */
export const convertToISODate = (dateString: string): string | null => {
  try {
    // First, clean up the input string
    // Remove 'st', 'nd', 'rd', 'th' from the day
    const cleanDateString = dateString.replace(/(st|nd|rd|th)/, "");

    // Parse the date string using date-fns
    const parsedDate = parse(
      cleanDateString,
      "dd MMMM yyyy: h:mm a",
      new Date()
    );

    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      return null;
    }

    // Convert to ISO format
    return formatISO(parsedDate);
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};

// Example usage:
// const dateString = "17th June, 1999: 8:12 PM";
// const isoDate = convertToISODate(dateString);
// console.log(isoDate); // Output: "1999-06-17T20:12:00.000Z"
