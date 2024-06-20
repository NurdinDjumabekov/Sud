import React from "react";
import "./style.scss";

const Arbitrs = ({ row }) => {
  return (
    <td className="arbitrs">
      {row?.arbitrs?.length !== 0 &&
        row?.arbitrs?.map((i, index) => (
          <span>
            {i?.fio_arbitr}
            {index !== row?.arbitrs?.length - 1 && ","}
          </span>
        ))}
    </td>
  );
};

export default Arbitrs;
