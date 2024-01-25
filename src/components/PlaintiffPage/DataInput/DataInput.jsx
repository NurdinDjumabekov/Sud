import React, { useState } from "react";
import "./DataInput.scss";
import ru from 'date-fns/locale/ru';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { changeADFF, changeADUF } from "../../../store/reducers/inputSlice";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";

const DataInput = ({ props }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("");
  const { adff, aduf, priceDocs } = useSelector((state) => state.inputSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  // формат даты 15/01/2024
  // dd/MM/yyyy

  const transformData = (data) => {
    const formattedDate = data.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setSelectedDate(data);

    if (props.typeChange === "adff") {
      dispatch(changeADFF({ ...adff, [props.nameInput]: formattedDate }));
    } else if (props.typeChange === "aduf") {
      dispatch(changeADUF({ ...aduf, [props.nameInput]: formattedDate }));
    } else if (props.typeChange === "todos") {
      dispatch(
        changeTodosApplications({
          ...todosApplications,
          [props.nameInput]: formattedDate,
        })
      );
    }
  };

  return (
    <div className="date__inner">
      <p>{props.title}</p>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => transformData(date)}
        placeholderText="Выберите дату"
        // locale={"ru"}
        // formatWeekDay={"ru"}
        dateFormat="dd/MM/yyyy"
        locale={ru}
      />
    </div>
  );
};

export default DataInput;
