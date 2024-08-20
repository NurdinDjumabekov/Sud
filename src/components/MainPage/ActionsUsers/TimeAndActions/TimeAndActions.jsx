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
    2: <p>14 дней</p>, /// Ответственный секретарь
    3: <p>14 дней</p>, /// Председатель
    4: <p>14 дней</p>, /// Истец
  };

  return <td className="times">{objType?.[type_user]}</td>;
};

export default TimeAndActions;
