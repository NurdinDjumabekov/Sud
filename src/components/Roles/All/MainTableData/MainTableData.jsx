import React from "react";
import "./style.scss";
import { searchNameSelect } from "../../../../helpers/searchNameSelect";
import { useSelector } from "react-redux";
import ChoiceReglament from "../../ChairmanPred/ChoiceReglament/ChoiceReglament";

const MainTableData = ({ row }) => {
  const { selCurrency } = useSelector((state) => state.selectsSlice);

  return (
    <>
      <td className="table_isk_td">
        <span className="span_teble">
          {row?.isk_number ? `№ ${row?.isk_number}` : ""}
        </span>
      </td>
      <td className="table_isk_td">
        <span>{row?.isk_date}</span>
        <span>{row?.isk_time}</span>
      </td>
      <td className="table_isk_td">
        {row?.plaintiff?.length !== 0 && (
          <>
            {row.plaintiff.map((i, index) => (
              <span key={index}>
                {i.name}
                {index !== row.plaintiff.length - 1 && ","}
              </span>
            ))}
          </>
        )}
      </td>
      <td className="table_isk_td">
        {row?.defendant?.length !== 0 && (
          <>
            {row?.defendant.map((i, index) => (
              <span key={index}>
                {i.name}
                {index !== row.defendant.length - 1 && ","}
              </span>
            ))}
          </>
        )}
      </td>
      <td className="table_isk_td">
        {+row?.arbitr_fee !== 0 && (
          <span>
            {row?.arbitr_fee} {searchNameSelect(selCurrency, +row?.arbitr_curr)}
          </span>
        )}
      </td>
      <ChoiceReglament row={row} />
    </>
  );
};

export default MainTableData;
