////hooks
import { useSelector } from "react-redux";
import React from "react";

////helpers
import { searchNameSelect } from "../../../helpers/searchNameSelect";

////style
import "./style.scss";

///// imgs
import { jwtDecode } from "jwt-decode";
import { transformDate } from "../../../helpers/transformDate";

const MainTableData = ({ row, index, listTodos }) => {
  const { selCurrency } = useSelector((state) => state.selectsSlice);

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  return (
    <>
      <td className="codeidIsk index">{listTodos?.length - index}</td>
      <td className="num codeidIsk">
        <div className="codeidIsk__inner" style={{ width: 200 }}>
          <span>{!!row?.isk_number && `${row?.isk_number}`}</span>
        </div>
      </td>
      <td className="date" style={{ width: 170 }}>
        <span>{transformDate(row?.isk_active_date)}</span>
        {/* <span>{row?.isk_time}</span> */}
      </td>
      <td className="plaintiffTable" style={{ width: 240 }}>
        {row?.plaintiff?.length !== 0 && (
          <>
            {row?.plaintiff?.map((i, index) => (
              <span key={index}>
                {i?.name}
                {index !== row?.plaintiff?.length - 1 && ","}
              </span>
            ))}
          </>
        )}
      </td>
      <td className="defendant" style={{ width: 240 }}>
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
      <td className="arbitrs" style={{ width: 240 }}>
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
