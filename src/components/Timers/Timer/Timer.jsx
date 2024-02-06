import React, { useState, useEffect } from "react";
import "./Timer.scss";

const Timer = ({ days, time }) => {
  const renderDate = (date, time) => {
    const dateTimeString = `${date.split(".").reverse().join("-")}T${time}`;
    const iskDateTime = new Date(dateTimeString);
    const now = new Date();

    const timeDiff = now.getTime() - iskDateTime.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);
    // console.log(minutesDiff, "minutesDiff");

    return (
      <div className="everyTime">
        <span>
          {+minutesDiff > 0 ? (
            <>
              {`${+daysDiff === 0 ? "" : `${daysDiff} д. `}${
                +hoursDiff === 0 ? "" : `${hoursDiff} ч. `
              }${+minutesDiff === 0 ? "" : `${minutesDiff} мин. `} `}
            </>
          ) : (
            ` ${secondsDiff} сек.`
          )}

          {/* /// ${secondsDiff} сек. */}
        </span>
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

export default Timer;
