import React, { useState, useEffect } from "react";

const TimerRevers = ({ days, time }) => {
  const renderDate = (date, time) => {
    // Проверка наличия данных
    if (!date || !time) {
      return null;
    }

    // Разбор строки с датой
    const dateParts = date.split(".");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    // Разбор строки с временем
    const timeParts = time.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    // Создание объекта Date для переданной даты и времени
    const originalDate = new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      seconds
    );

    // Добавление двух недель
    const targetDate = new Date(
      originalDate.getTime() + 2 * 7 * 24 * 60 * 60 * 1000
    );
    const now = new Date();

    const timeDiff = targetDate.getTime() - now.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return (
      <div className="everyTime">
        <span>{`${daysDiff} д. ${hoursDiff} ч. ${minutesDiff} мин.`}</span>
      </div>
    );
  };

  const [timerContent, setTimerContent] = useState(renderDate(days, time));

  useEffect(() => {
    // Обновляем таймер каждую секунду
    const intervalId = setInterval(() => {
      setTimerContent(renderDate(days, time));
    }, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [days, time]);

  return timerContent;
};

export default TimerRevers;
