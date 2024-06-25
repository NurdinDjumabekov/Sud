import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const AllStatus = ({ row }) => {
  const { typeUser } = useSelector((state) => state.saveDataSlice);

  return (
    <td className="allStatus">
      {row?.status == 1 ? (
        <>
          {row?.isk_status == 6 && typeUser == 4 ? (
            <span className="noActivePlaint">Отпавлено на доработку</span>
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

export default AllStatus;
