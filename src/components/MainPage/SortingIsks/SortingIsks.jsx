////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

///// style
import "./style.scss";

///// fns
import {
  getDataSort,
  toTakeIsksList,
} from "../../../store/reducers/sendDocsSlice";
import { changeMainBtnList } from "../../../store/reducers/stateSlice";

const SortingIsks = () => {
  const dispatch = useDispatch();

  const { typeUser } = useSelector((state) => state.saveDataSlice);

  const { mainBtnList } = useSelector((state) => state.stateSlice);

  const clickBtn = (id) => {
    const newList = mainBtnList?.map((i) => ({ ...i, bool: id === i.id }));
    dispatch(changeMainBtnList(newList)); /// активная категория
    dispatch(toTakeIsksList(id)); /// запрос для получения списка
  };

  const typeSort = {
    1: { start: 11, end: 15 }, ///// Секретарь
    2: { start: 0, end: 6 }, ///// Ответственный Секретарь
    3: { start: 0, end: 6 }, ///// Председатель
    4: { start: 6, end: 11 }, ///// Истец
  };

  useEffect(() => {
    dispatch(toTakeIsksList(0));
    dispatch(getDataSort(0));
    ///// get все иски сразу
  }, []);

  return (
    <ul className="choice__plaintiff">
      {mainBtnList
        ?.slice(typeSort?.[typeUser]?.start, typeSort?.[typeUser]?.end)
        ?.map((btn) => (
          <li key={btn.id}>
            <button
              className={btn?.bool ? "activeChoice" : ""}
              onClick={() => clickBtn(btn.id)}
            >
              {btn?.name} [{btn?.count}]
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
