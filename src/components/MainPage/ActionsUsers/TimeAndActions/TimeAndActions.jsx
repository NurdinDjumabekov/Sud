/////// hooks
import React from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import "./style.scss";

////// components
import ActionsStatusSS from "../ActionsSimpleSecr/ActionsStatusSS";

const TimeAndActions = ({ row }) => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { type_user } = jwtDecode(tokenA);

  const objType = {
    1: <ActionsStatusSS row={row} />, /// Секретарь дела
    2: <p></p>, /// Ответственный секретарь
    3: <p></p>, /// Председатель
    4: <p></p>, /// Истец
  };

  return (
    <td className="times" style={{ width: 200 }}>
      {objType?.[type_user]}
    </td>
  );
};

export default TimeAndActions;
