import React, { useState } from "react";
import "./DataInput.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { changeADFF, changeADUF } from "../../../store/reducers/inputSlice";

const DataInput = ({ props }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("");
  const { adff, aduf } = useSelector((state) => state.inputSlice);

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
    } else {
      dispatch(changeADUF({ ...aduf, [props.nameInput]: formattedDate }));
    }
  };


  return (
    <div className="date__inner">
      <p>{props.title}</p>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => transformData(date)}
        placeholderText="Выберите дату"
        // locale="en-GB"
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default DataInput;
