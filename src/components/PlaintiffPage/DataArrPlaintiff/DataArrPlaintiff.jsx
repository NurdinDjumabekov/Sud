import React from "react";
import "./DataArrPlaintiff.scss";
import { useDispatch } from "react-redux";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";

const DataArrPlaintiff = ({ arr, setLookAddPlaintiff }) => {
  // console.log(arr, "arr");
  const dispatch = useDispatch();
  return (
    <div>
      <div className="addDocPlaintiff"></div>
      <div className="mainTables dataPlaintiff">
        <ul className="btnsType add">
          <button onClick={() => dispatch(changeLookAddPlaintiff(true))}>
            Добавить истца
          </button>
          <button onClick={() => dispatch(changeLookAddPlaintiff(true))}>
            Добавить представителя истца
          </button>
        </ul>
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
                    <span>{row.dob}</span>
                    <span>{row.dob}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default DataArrPlaintiff;
