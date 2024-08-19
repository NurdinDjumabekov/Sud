////// hooks
import React from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

////// style
import "./style.scss";

///// components
import ActionsSimpleSecr from "../ActionsUsers/ActionsSimpleSecr/ActionsSS";

const AllStatus = ({ row }) => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { type_user } = jwtDecode(tokenA);

  const objType = {
    1: <ActionsSimpleSecr row={row} />, /// Секретарь
    2: <></>, /// Ответственный секретарь
    // 3: <DefaultPlaintiff row={row} />, /// Председатель
    4: <DefaultPlaintiff row={row} />, /// Истец
  };

  return objType?.[type_user];
};

export default AllStatus;

///// default для истца
export const DefaultPlaintiff = ({ row }) => {
  return (
    <td className="allStatus">
      {row?.status == 1 ? (
        <>
          {row?.isk_status == 6 ? (
            <span className="noActivePlaint">Отправлено на доработку</span>
          ) : (
            <span className="activePlaint">Активен</span>
          )}
        </>
      ) : (
        <span className="noActivePlaint">Черновик</span>
      )}
    </td>
  );
};
