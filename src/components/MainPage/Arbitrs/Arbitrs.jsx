import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import ChoiceReglament from "../../Roles/ChairmanPred/ChoiceReglament/ChoiceReglament";

const Arbitrs = ({ row }) => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { type_user } = jwtDecode(tokenA);

  if (type_user == 3) {
    return <ChoiceReglament row={row} />;
  }

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
