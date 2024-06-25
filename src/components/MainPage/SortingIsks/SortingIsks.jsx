////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

///// style
import "./style.scss";

///// fns
import { toTakeIsksList } from "../../../store/reducers/sendDocsSlice";
import { changeMainBtnList } from "../../../store/reducers/stateSlice";
import { useEffect } from "react";

const SortingIsks = () => {
  const dispatch = useDispatch();

  const { tokenA, typeUser } = useSelector((state) => state.saveDataSlice);

  const { mainBtnList } = useSelector((state) => state.stateSlice);

  const clickBtn = (id) => {
    const newList = mainBtnList?.map((i) => ({ ...i, bool: id === i.id }));
    dispatch(changeMainBtnList(newList)); /// активная категория

    dispatch(toTakeIsksList({ tokenA, id })); /// запрос для получения списка
  };

  const typeSort = {
    1: { start: 12, end: 15 }, ///// Секретарь
    2: { start: 0, end: 6 }, ///// Ответственный Секретарь
    3: { start: 0, end: 6 }, ///// Председатель
    4: { start: 6, end: 11 }, ///// Истец
  };

  useEffect(() => {
    dispatch(toTakeIsksList({ tokenA, id: 0 })); ///// Всегда получаю все иски сразу
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
