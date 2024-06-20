import React from "react";
import "./style.scss";

const AllStatus = ({ row }) => {
  return (
    <td className="allStatus">
      {row?.status == 1 ? (
        <span className="activePlaint">Активен</span>
      ) : (
        <span className="noActivePlaint">Черновик</span>
      )}
    </td>
  );
};

export default AllStatus;
