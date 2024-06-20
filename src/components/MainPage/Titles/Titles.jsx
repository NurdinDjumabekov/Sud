import React from "react";
import { plaintiffHeaders } from "../../../helpers/dataArr";

const Titles = () => {
  return (
    <thead>
      <tr>
        {plaintiffHeaders?.map((i, index) => (
          <th key={index} className="table_isk_th">
            {i}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Titles;
