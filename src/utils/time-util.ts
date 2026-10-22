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

  let details = `${hours.toFixed(1)} ${hourWord}`;
  if (days > 0) details = `${days} ${dayWord}, ` + details;
  if (months > 0) details = `${months} ${monthWord}, ` + details;
  if (years > 0) details = `${years} ${yearWord}, ` + details;

  return details;
}
