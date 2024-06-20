////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

///// style
import "./style.scss";

///// fns
import { toTakeIsksList } from "../../../store/reducers/sendDocsSlice";
import { changeMainBtnList } from "../../../store/reducers/stateSlice";

const SortingIsks = () => {
  const dispatch = useDispatch();

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const { mainBtnList } = useSelector((state) => state.stateSlice);

  const clickBtn = (id) => {
    const newList = mainBtnList?.map((i) => ({ ...i, bool: id === i.id }));
    dispatch(changeMainBtnList(newList)); /// активная категория

    dispatch(toTakeIsksList({ tokenA, id })); /// запрос для получения списка
  };

  return (
    <ul className="choice__plaintiff">
      {mainBtnList?.slice(6, 11)?.map((btn) => (
        <li key={btn.id}>
          <button
            className={btn?.bool ? "activeChoice" : ""}
            onClick={() => clickBtn(btn.id)}
          >
            {btn.name} [{btn?.count}]
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SortingIsks;
