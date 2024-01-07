import React from "react";
import "./DataArrPlaintiff.scss";

const DataArrPlaintiff = ({ arr }) => {
  console.log(arr, "arr");
  return (
    <>
      {arr?.length === 0 ? (
        <p className="emptyData">У вас пока что нету исков...</p>
      ) : (
        <div className="mainTables dataPlaintiff">
          <div className="main_tabla_isk">
            <table className="table_isk">
              <thead>
                <tr>
                  <th className="table_isk_th">Истец</th>
                  <th className="table_isk_th">Преставитель истца</th>
                </tr>
              </thead>
              <tbody className="tbody_isk">
                {arr.map((row, index) => (
                  <tr
                    key={index}
                    style={
                      +index % 2 === 0
                        ? { background: "#fff" }
                        : { background: "#f9fafd" }
                    }
                  >
                    <td className="table_isk_td">
                      <div>
                        <span className="span_teble">
                          {row.name}
                          {row.dob}
                        </span>
                      </div>
                    </td>
                    <td className="table_isk_td">
                      <span>{row.dob}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DataArrPlaintiff;
