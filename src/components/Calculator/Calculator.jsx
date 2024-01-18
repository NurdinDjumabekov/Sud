import React from "react";
import Selects from "../Selects/Selects";
import "./Calculator.scss";
import { typeCountSum } from "../../helpers/dataArr";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCalculatorState,
  changeResult,
  changeSumIsk,
} from "../../store/reducers/stateSlice";

const Calculator = () => {
  const dispatch = useDispatch();
  const { sumIsk, calculatorState, typePay, resultSumIsk } = useSelector(
    (state) => state.stateSlice
  );

  const resultCal = () => {
    dispatch(changeCalculatorState(true));
    dispatch(
      changeResult({
        num1: +sumIsk,
        num2: +sumIsk + 500,
        num3: +sumIsk + 100,
        num4: +sumIsk + 800,
      })
    );
  };

  const handleSumInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      dispatch(changeSumIsk(inputValue));
    }
  };

  console.log(typePay, "typePay");
  return (
    <div className="calculator">
      <div className="calculator__count">
        <div>
          <p>Сумма иска в USD</p>
          <input
            type="text"
            placeholder="Cумма доплаты"
            name="sumIsk"
            onChange={handleSumInputChange}
            value={sumIsk}
          />
        </div>
        <Selects
          arr={typeCountSum}
          initText={"Тип спора"}
          keys={{ typeKey: typePay, type: "typePay" }}
          type="typePay"
        />
        <span className="btnCal" onClick={resultCal}>
          Расчитать
        </span>
      </div>
      {calculatorState && (
        <div className="main_tabla_isk">
          <table className="table_isk">
            <thead>
              <tr>
                <th className="table_isk_th">Cбор</th>
                <th className="table_isk_th">Сумма</th>
                <th className="table_isk_th">
                  Обычный регламент, единоличный арбитр (-30%)
                </th>
              </tr>
            </thead>
            <tbody className="tbody_isk">
              <tr>
                <td className="table_isk_td">
                  <span>Регистрационный (c НДС 12% и налогом с продаж 2%)</span>
                </td>
                <td className="table_isk_td">
                  <span>${resultSumIsk?.num1}</span>
                </td>
                <td className="table_isk_td">
                  <span>${resultSumIsk?.num3}</span>
                </td>
              </tr>
              <tr>
                <td className="table_isk_td">
                  <span className="table_isk_td">
                    Арбитражный (c НДС 12% и налогом с продаж 2%)
                  </span>
                </td>
                <td className="table_isk_td">
                  <span>${resultSumIsk?.num2}</span>
                </td>
                <td className="table_isk_td">
                  <span>${resultSumIsk?.num4}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calculator;

// <div className="calculator__result">
//   <div>
//     <div>
//       <h5>Обычный регламент, единоличный арбитр (-30%)</h5>
//     </div>
//   </div>
//   <div className="tablesresult">
//     <div>
//       <p>Регистрационный (c НДС 12% и налогом с продаж 2%) $0 </p>
//     </div>
//     <div>
//       <p>Арбитражный (c НДС 12% и налогом с продаж 2%)</p>
//     </div>
//   </div>
// </div>
