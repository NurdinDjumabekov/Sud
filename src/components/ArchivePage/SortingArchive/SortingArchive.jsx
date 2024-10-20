import React, { useState } from "react";
import { ru } from "date-fns/locale";

////// style
import "./style.scss";

//// components
import Select from "react-select";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryIsks } from "../../../store/reducers/historyIsks";
import {
  transformActionDate,
  transformDate,
} from "../../../helpers/transformDate";
import { useEffect } from "react";

const SortingArchive = () => {
  const dispatch = useDispatch();

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [search, setSearch] = useState("");

  const onChangeDate = async (item) => {
    setDateRange(item);

    if (!!item?.[1]) {
      ///// сортировка трат по дате
      dispatch(
        getHistoryIsks({
          date_from: transformActionDate(dateRange?.[0]),
          date_to: transformActionDate(dateRange?.[1]),
        })
      );
    }
  };

  useEffect(() => {
    const data = {
      date_from: "01.01.2024",
      date_to: "17.10.2024 ",
    };
    dispatch(getHistoryIsks(data));
  }, []);

  return (
    <div className="sortingArchive">
      <div className="sortingArchive__date">
        <p>Сортировка по дате</p>
        {/* <Select options={listYesrs} /> */}
      </div>
      <div className="sortingArchive__date searchInput">
        <p>Поиск</p>
        <input type="text" value={search} />
      </div>
    </div>
  );
};

export default SortingArchive;
