////// hooks
import React from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

////// helpers
import { plaintiffHeaders } from "../../../helpers/dataArr";
import { respSecrHeaders } from "../../../helpers/dataArr";
import { simpleSecrHeaders } from "../../../helpers/dataArr";

////// style
import "./style.scss";

const Titles = () => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { type_user } = jwtDecode(tokenA);

  const objType = {
    1: simpleSecrHeaders, /// Секретарь
    2: respSecrHeaders, /// Ответственный секретарь
    3: respSecrHeaders, /// Председатель
    // 4: plaintiffHeaders, /// Истец
  };

  return (
    <thead className="titlesTable">
      <tr>
        {objType?.[type_user]?.map((i, index) => (
          <th key={index} className="table_isk_th">
            {i}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Titles;
