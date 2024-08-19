export const todayDate = () => {
  //// генерирует вот такую дату 11 августа 2024
  const currentDate = new Date();

  const day = String(currentDate.getDate());
  const month = currentDate.toLocaleString("ru-RU", { month: "long" });
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year}`;
};

export const transformDate = (oldDate) => {
  //// 18.08.2024 => 18 август 2024 года
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const [day, month, year] = oldDate?.split(".");
  const monthName = months?.[parseInt(month, 10) - 1];

  return `${parseInt(day, 10)} ${monthName} ${year} года`;
};
