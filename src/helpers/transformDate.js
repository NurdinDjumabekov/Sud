export const transformDate = (date) => {
  ///  2024-03-20T15:52:58.843Z  ===>  20.03.2024 00:00:00
  const newDate = new Date(date);

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  const hours = newDate.getHours().toString().padStart(2, "0");
  const minutes = newDate.getMinutes().toString().padStart(2, "0");
  const seconds = newDate.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const transformDateTime = (dateString) => {
  ///  Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)  ===>  2024-08-07 17:12
  const date = new Date(dateString);
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, "0");
  const day = String(date?.getDate())?.padStart(2, "0");

  const hours = String(date?.getHours())?.padStart(2, "0");
  const minutes = String(date?.getMinutes())?.padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const dateTimeParse = (dateString) => {
  // '08.08.2024 16:30:00' ==> Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)
  if (typeof dateString !== "string") {
    console.error("Invalid date string:", dateString);
    return null; // Возвращаем null или значение по умолчанию
  }

  const [datePart, timePart] = dateString?.split(" ");
  if (!datePart || !timePart) {
    console.error("Invalid date or time format:", dateString);
    return null; // Возвращаем null, если формат неверен
  }

  const [day, month, year] = datePart.split(".");
  const [hours, minutes, seconds] = timePart.split(":");

  // Создаем объект Date
  const date = new Date(year, month - 1, day, hours, minutes, seconds);

  return date;
};

export const transformActionDate = (dateString) => {
  ///  Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)  ===>  2024-08-07
  const date = new Date(dateString);

  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, "0");
  const day = String(date?.getDate())?.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const reverseTransformActionDate = (dateString) => {
  ///  2024-08-07 ==> Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)
  if (!dateString || typeof dateString !== "string") return null;

  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  if (isNaN(date)) {
    return null;
  }
  return date;
};

export const reverseTransformActionTime = (dateString) => {
  //// 2024.08.07 17:12 ===> Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)

  if (!dateString || typeof dateString !== "string") return null;

  const [datePart, timePart] = dateString?.split(" ");
  if (!datePart || !timePart) return null;

  const [year, month, day] = datePart?.split(".");
  const [hours, minutes] = timePart?.split(":");

  if (!year || !month || !day || !hours || !minutes) return null;

  // Создаем объект даты
  const date = new Date(year, month - 1, day, hours, minutes);

  // Проверяем, является ли созданный объект валидным
  if (isNaN(date)) {
    console.error("Invalid date generated from input:", dateString);
    return null;
  }

  return date;
};

export const transformDates = (dateString) => {
  ///  Mon Apr 01 2019 20:29:00 GMT+0600  ===>  01.04.2019
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateString);
  const formattedDate = date?.toLocaleDateString("ru-RU", options);
  return formattedDate;
};

export const transformTime = (dateString) => {
  ///  Mon Apr 01 2019 20:29:00 GMT+0600  ===>  17:12
  const date = new Date(dateString);
  const hours = date?.getHours()?.toString()?.padStart(2, "0");
  const minutes = date?.getMinutes()?.toString()?.padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const extractTimeFromDateTime = (dateTimeString) => {
  /// 2024-09-26 14:36 ====> 14:36
  if (!dateTimeString || typeof dateTimeString !== "string") return null;
  const [datePart, timePart] = dateTimeString?.split(" ");
  if (!datePart || !timePart) return null;
  return timePart;
};

export const reverseExtractTimeFromDateTime = (timeString) => {
  /// 14:36 ====> 2024-09-26 14:36
  if (!timeString || typeof timeString !== "string") return null;
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(timeString)) return null;
  return `2024-09-26 ${timeString}`;
};

export const formatDateMonth = (dateString) => {
  ///// 2024-09-13 => "13 сентября 2024 года"
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

  const date = new Date(dateString);
  const day = date?.getDate();
  const month = months?.[date?.getMonth()];
  const year = date?.getFullYear();

  return `${day} ${month} ${year} года`;
};
