////hooks
import { useSelector } from "react-redux";
import React from "react";

////style
import "./style.scss";

////helpers
import { searchNameSelect } from "../../../helpers/searchNameSelect";

const MainTableData = ({ row }) => {
  const { selCurrency } = useSelector((state) => state.selectsSlice);

  return (
    <>
      <td className="num">
        <span className="span_teble">
          {row?.isk_number ? `№ ${row?.isk_number}` : ""}
        </span>
      </td>
      <td className="date">
        <span>{row?.isk_date}</span>
        <span>{row?.isk_time}</span>
      </td>
      <td className="plaintiffTable">
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
      <td className="defendant">
        {row?.defendant?.length !== 0 && (
          <>
            {row?.defendant?.map((i, index) => (
              <span key={index}>
                {i.name}
                {index !== row?.defendant?.length - 1 && ","}
              </span>
            ))}
          </>
        )}
      </td>
      <td className="arbitrs">
        {+row?.arbitr_fee !== 0 && (
          <span>
            {row?.arbitr_fee} {searchNameSelect(selCurrency, +row?.arbitr_curr)}
            {/* //  сумма и валюта/// */}
          </span>
        )}
      </td>
    </>
  );
};

export default MainTableData;
