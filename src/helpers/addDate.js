export function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Месяцы начинаются с 0
  const year = date.getFullYear();

  return `${day < 10 ? "0" : ""}${day}.${
    month < 10 ? "0" : ""
  }${month}.${year}`;
}

export function calculateDates() {
  const currentDateObject = new Date();
  const twoWeeksLater = new Date(currentDateObject);
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

  const oneMonthLater = new Date(currentDateObject);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

  const formattedTwoWeeksLater = formatDate(twoWeeksLater);
  const formattedOneMonthLater = formatDate(oneMonthLater);

  return { formattedTwoWeeksLater, formattedOneMonthLater };
}
