////// hooks
import React from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

////// style
import "./style.scss";

/////// components
import ChoiceReglament from "../ConfirmStatusIsks/ConfirmPred/ChoiceReglament/ChoiceReglament";

const Arbitrs = ({ row, type }) => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { type_user } = jwtDecode(tokenA);

  // if (type_user == 3) {
  //   return <ChoiceReglament row={row} type={type} />;
  // }

  // if (row?.arbitrs?.length !== 0) {
  //   return (
  //     <td className="arbitrs">
  //       {row?.arbitrs?.map((i, index) => (
  //         <span key={index}>
  //           {i?.fio_arbitr}
  //           {index !== row?.arbitrs?.length - 1 && ","}
  //         </span>
  //       ))}
  //     </td>
  //   );
  // }

  // return <td className="arbitrs"></td>;

  return <ChoiceReglament row={row} type={type} />;
};

export default Arbitrs;
