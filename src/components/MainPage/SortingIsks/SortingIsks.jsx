////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

///// style
import "./style.scss";

///// fns
import { toTakeIsksList } from "../../../store/reducers/sendDocsSlice";
import { getFilter } from "../../../store/reducers/applicationsSlice";

const SortingIsks = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState(0);

  const { listFilter } = useSelector((state) => state.applicationsSlice);

  const clickBtn = ({ codeid_filter }) => {
    dispatch(toTakeIsksList(codeid_filter)); /// запрос для получения списка
    setActive(codeid_filter);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getFilter()).unwrap(); // get фильтры каждой роли
      const codeid = data?.[0]?.codeid_filter;
      setActive(codeid);
      dispatch(toTakeIsksList(codeid)); /// запрос для получения списка
    };
    getData();
  }, []);

  return (
    <ul className="choice__plaintiff">
      {listFilter?.map((btn) => (
        <li key={btn.codeid_filter}>
          <button
            className={active == btn?.codeid_filter ? "activeChoice" : ""}
            onClick={() => clickBtn(btn)}
          >
            {btn?.name}
            {/* [{btn?.count}] */}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SortingIsks;

// typeUser
// 1  Секретарь
// 2  Ответственный секретарь
// 3  Председатель
// 4  Истец
