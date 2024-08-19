/////// hooks
import React from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

/////// style
import "./style.scss";

////// components
import ActionsStatusSS from "../ActionsSimpleSecr/ActionsStatusSS/ActionsStatusSS";

const TimeAndActions = ({ row }) => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { type_user } = jwtDecode(tokenA);

  const objType = {
    1: <ActionsStatusSS row={row} />, /// Секретарь дела
    // 2: <DefaultPlaintiff row={row} />, /// Ответственный секретарь
    // 3: <DefaultPlaintiff row={row} />, /// Председатель
    4: <p>Время потом добавлю</p>, /// Истец
  };

  return <td className="times">{objType?.[type_user]}</td>;
};

export default TimeAndActions;
