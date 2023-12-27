// CalendarTodoPage.jsx

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./CalendarTodoPage.scss";
import Modals from "../../components/Modals/Modals";

const CalendarTodoPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [textForDate, setTextForDate] = useState({});
  const [inputText, setInputText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("input");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setModalMode(isDateWithText(date) ? "text" : "input");
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSaveText = () => {
    setTextForDate({
      ...textForDate,
      [selectedDate.toISOString()]: inputText,
    });
    setInputText("");
    setModalMode("text");
  };

  const handleCloseModal = () => {
    setInputText("");
    setIsModalOpen(false);
  };

  const isDateWithText = (date) => {
    return textForDate[date.toISOString()] !== undefined;
  };

  //   useEffect(() => {
  //     setIsModalOpen(true);
  //   }, [modalMode]);

  return (
    <div className="CalendarTodoPage">
      {/* <h6>Календарь дел</h6> */}
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) =>
            isDateWithText(date) ? "has-text" : null
          }
        />

        <Modals openModal={isModalOpen} setOpenModal={handleCloseModal}>
          {modalMode === "input" ? (
            <div>
              <textarea
                value={inputText}
                onChange={handleTextChange}
                placeholder="Введите текст"
              />
              <button onClick={handleSaveText}>Сохранить</button>
            </div>
          ) : modalMode === "text" ? (
            <div className="textResult">
              <strong>Текст для выбранной даты:</strong>
              <p>{textForDate[selectedDate.toISOString()]}</p>
            </div>
          ) : null}
        </Modals>
      </div>
    </div>
  );
};

export default CalendarTodoPage;
