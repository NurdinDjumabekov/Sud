import React, { useState } from "react";
import "./DataInput.scss";
import ru from "date-fns/locale/ru";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { changeADFF, changeADUF } from "../../../store/reducers/inputSlice";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";
import { parse } from "date-fns";

const DataInput = ({ props }) => {
  const dispatch = useDispatch();
  const { adff, aduf } = useSelector((state) => state.inputSlice);

  // Проверяем, если дата равна "01.01.1900", устанавливаем null
  const [selectedDate, setSelectedDate] = useState(
    props?.keyData && props.keyData !== "01.01.1900"
      ? parse(props.keyData, "dd.MM.yyyy", new Date())
      : null
  );

  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split(".");
    return new Date(year, month - 1, day);
  };

  const formatDateForDisplay = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return "";
  };

  const formatDateForServer = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${day}.${month}.${year}`;
    }
    return "";
  };

  const transformData = (data) => {
    // Если дата равна 01.01.1900 или дата не выбрана, то очищаем selectedDate
    if (!data || formatDateForDisplay(data) === "01.01.1900") {
      setSelectedDate(null);
      return;
    }

    const formattedDateForServer = formatDateForServer(data);
    setSelectedDate(data);

    if (props.typeChange === "adff") {
      dispatch(
        changeADFF({ ...adff, [props.nameInput]: formattedDateForServer })
      );
    } else if (props.typeChange === "aduf") {
      dispatch(
        changeADUF({ ...aduf, [props.nameInput]: formattedDateForServer })
      );
    } else if (props.typeChange === "todos") {
      dispatch(
        changeTodosApplications({
          ...todosApplications,
          [props.nameInput]: formattedDateForServer,
        })
      );
    }
  };

  const handleDateInputChange = (e) => {
    const inputText = e.target.value;
    const formattedText = inputText.replace(/[^0-9]/g, ""); // Оставляем только цифры
    if (formattedText.length <= 8) {
      const parsedDate = parseDate(formattedText);
      transformData(parsedDate);
    }
  };

  return (
    <div className="date__inner">
      <p>
        {props.title} {props?.urgently && <b className="required">*</b>}
      </p>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => transformData(date)}
        placeholderText="ДД.ММ.ГГГГ"
        dateFormat="dd.MM.yyyy"
        locale={ru}
        shouldCloseOnSelect={true}
        customInput={<input onChange={handleDateInputChange} />}
        yearDropdownItemNumber={100}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
};

export default DataInput;
