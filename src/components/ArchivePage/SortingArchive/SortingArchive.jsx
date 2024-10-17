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

  const sortSearch = [
    {
      num: "",
      codeid: 1,
    },
    {
      plaitiff: "",
      codeid: 2,
    },
  ];

  return (
    <div className="sortingArchive">
      <div className="sortingArchive__date">
        <p>Сортировка по дате</p>
        <ReactDatePicker
          selectsRange={true}
          startDate={dateRange?.[0]}
          endDate={dateRange?.[1]}
          onChange={onChangeDate}
          isClearable={true}
          maxDate={new Date()}
          dateFormat="dd.MM.yyyy"
          locale={ru}
          showYearDropdown
          yearDropdownItemNumber={25}
          scrollableYearDropdown
        />
      </div>
      <div className="sortingArchive__date searchInput">
        <p>Поиск</p>
        <input type="text" value={search} />
      </div>
    </div>
  );
};

export default SortingArchive;
