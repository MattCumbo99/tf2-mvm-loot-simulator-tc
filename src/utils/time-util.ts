/**
 * Converts the given hour amount to a "time breakdown" string which provides
 * details on years, months, days, etc.
 *
 * Example: 49 hours = 2 days 1 hour
 *
 * @param totalHours Amount of hours to breakdown.
 * @returns Formatted time string.
 */
export function getDetailedTimeBreakdown(totalHours: number): string {
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  const years = Math.floor(totalDays / 365);
  const remainingDays = totalDays % 365;
  const months = Math.floor(remainingDays / 30);
  const days = remainingDays % 30;

  let yearWord: string;
  if (years === 1) yearWord = "year";
  else yearWord = "years";

  let monthWord: string;
  if (months === 1) monthWord = "month";
  else monthWord = "months";

  let dayWord: string;
  if (days === 1) dayWord = "day";
  else dayWord = "days";

  let hourWord: string;
  if (hours === 1) hourWord = "hour";
  else hourWord = "hours";

  const formattedHours = parseFloat(hours.toFixed(1));

  let details = `${formattedHours} ${hourWord}`;
  if (days > 0) details = `${days} ${dayWord}, ` + details;
  if (months > 0) details = `${months} ${monthWord}, ` + details;
  if (years > 0) details = `${years} ${yearWord}, ` + details;

  return details;
}
