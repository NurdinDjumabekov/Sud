export const todayDate = () => {
  //// генерирует вот такую дату 11 августа 2024
  const currentDate = new Date();

  const day = String(currentDate.getDate());
  const month = currentDate.toLocaleString("ru-RU", { month: "long" });
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year}`;
};
