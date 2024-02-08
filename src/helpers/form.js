export function formatDate(date) {
  const actualDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US").format(actualDate);
  return formattedDate;
}
