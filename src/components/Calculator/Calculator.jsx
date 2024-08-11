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
import { changeTodosApplications } from "../../store/reducers/applicationsSlice";

const Calculator = () => {
  const dispatch = useDispatch();
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );
  const { sumIsk, calculatorState, typePay, resultSumIsk } = useSelector(
    (state) => state.stateSlice
  );

  const calculateSbor = (inputDto) => {
    const { isk_sum, isk_type } = inputDto;

    function calculateRegSbor(iskSum) {
      let regSbor = 0;

      switch (true) {
        case iskSum > 0 && iskSum <= 500:
          regSbor = 10;
          break;
        case iskSum >= 501 && iskSum <= 1000:
          regSbor = 25;
          break;
        case iskSum >= 1001 && iskSum <= 5000:
          regSbor = 150;
          break;
        case iskSum >= 5001 && iskSum <= 10000:
          regSbor = 300;
          break;
        case iskSum > 10000:
          regSbor = 503;
          break;
      }

      return (
        parseFloat(regSbor) +
        (parseFloat(regSbor) * 12) / 100 +
        (parseFloat(regSbor) * 2) / 100
      );
    }

    function calculateArbitrSbor(iskType, iskSum) {
      let arbitrSbor = 0;
      let per = 0;

      switch (iskType) {
        case 2:
          switch (true) {
            case iskSum <= 5000:
              arbitrSbor = 250 + (250 * 14) / 100;
              break;
            case iskSum >= 5001 && iskSum <= 7500:
              arbitrSbor = 350 + (350 * 14) / 100;
              break;
            case iskSum >= 7501 && iskSum <= 10000:
              arbitrSbor = 500 + (500 * 14) / 100;
              break;
            case iskSum >= 10001 && iskSum <= 50000:
              arbitrSbor = 1000 + (1000 * 14) / 100;
              break;
            case iskSum >= 50001 && iskSum <= 100000:
              arbitrSbor = 1500 + (1500 * 14) / 100;
              break;
            case iskSum >= 100001:
              arbitrSbor = 2000 + (2000 * 14) / 100;
              break;
          }
          break;
        default:
          switch (true) {
            case iskSum > 0 && iskSum <= 250:
              if (iskSum > 10) {
                per = ((iskSum - 10) * 5) / 100;
              }
              arbitrSbor = 10 + per;
              break;
            case iskSum >= 251 && iskSum <= 500:
              if (iskSum > 15) {
                per = ((iskSum - 15) * 10) / 100;
              }
              arbitrSbor = 15 + per;
              break;
            case iskSum >= 501 && iskSum <= 750:
              if (iskSum > 25) {
                per = ((iskSum - 25) * 10) / 100;
              }
              arbitrSbor = 25 + per;
              break;
            case iskSum >= 751 && iskSum <= 1000:
              if (iskSum > 35) {
                per = ((iskSum - 35) * 10) / 100;
              }
              arbitrSbor = 35 + per;
              break;
            case iskSum >= 1001 && iskSum <= 5000:
              if (iskSum > 1000) {
                per = ((iskSum - 1000) * 4) / 100;
              }
              arbitrSbor = 150 + per;
              break;
            case iskSum >= 5001 && iskSum <= 10000:
              if (iskSum > 5000) {
                per = ((iskSum - 5000) * 3) / 100;
              }
              arbitrSbor = 310 + per;
              break;
            case iskSum >= 10001 && iskSum <= 50000:
              if (iskSum > 10000) {
                per = ((iskSum - 10000) * 2) / 100;
              }
              arbitrSbor = 500 + per;
              break;
            case iskSum >= 50001 && iskSum <= 100000:
              if (iskSum > 50000) {
                per = ((iskSum - 50000) * 1.5) / 100;
              }
              arbitrSbor = 1300 + per;
              break;
            case iskSum >= 100001 && iskSum <= 200000:
              if (iskSum > 100000) {
                per = ((iskSum - 100000) * 1) / 100;
              }
              arbitrSbor = 2050 + per;
              break;
            case iskSum >= 200001 && iskSum <= 500000:
              if (iskSum > 200000) {
                per = ((iskSum - 200000) * 0.9) / 100;
              }
              arbitrSbor = 3050 + per;
              break;
            case iskSum >= 500001 && iskSum <= 1000000:
              if (iskSum > 500000) {
                per = ((iskSum - 500000) * 0.8) / 100;
              }
              arbitrSbor = 5750 + per;
              break;
            case iskSum >= 1000001 && iskSum <= 2000000:
              if (iskSum > 1000000) {
                per = ((iskSum - 1000000) * 0.7) / 100;
              }
              arbitrSbor = 9750 + per;
              break;
            case iskSum >= 2000001 && iskSum <= 5000000:
              if (iskSum > 2000000) {
                per = ((iskSum - 2000000) * 0.6) / 100;
              }
              arbitrSbor = 16750 + per;
              break;
            case iskSum > 5000000:
              if (iskSum > 5000000) {
                per = ((iskSum - 5000000) * 0.5) / 100;
              }
              arbitrSbor = 34750 + per;
              break;
          }
          break;
      }

      return arbitrSbor + (arbitrSbor * 14) / 100;
    }

    if (isk_sum != "" && isk_sum != "NULL") {
      const regSbor = calculateRegSbor(isk_sum);
      const arbitrSbor = calculateArbitrSbor(isk_type, isk_sum);
      const arbitrSborDiscounted = arbitrSbor - (arbitrSbor * 30) / 100;

      return {
        regSbor: regSbor,
        arbitrSbor: arbitrSbor,
        arbitrSborDiscounted: arbitrSborDiscounted,
      };
    }

    return {
      regSbor: 0,
      arbitrSbor: 0,
      arbitrSborDiscounted: 0,
    };
  };

  const resultCal = () => {
    dispatch(changeCalculatorState(true));

    const data = calculateSbor({ isk_sum: sumIsk, isk_type: typePay });
    // console.log(data, "data");

    dispatch(
      changeResult({
        num1: Math.round(+data?.regSbor),
        num2: Math.round(+data?.arbitrSbor),
        num3: Math.round(+data?.regSbor),
        num4: Math.round(+data?.arbitrSborDiscounted),
      })
    );
    if (checkEditPlaint) {
      dispatch(
        changeTodosApplications({
          ...todosApplications,
          arbitr_fee: Math.round(+data?.arbitrSbor),
          arbitr_curr: 6, /// с сомов в доллары
          registr_fee: Math.round(+data?.regSbor),
          registr_curr: 6, /// с сомов в доллары
          summ: sumIsk,
          summ_curr: 6, /// с сомов в доллары
        })
      );
    }
  };

  const handleSumInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      dispatch(changeSumIsk(inputValue));
    }
  };

  React.useEffect(() => {
    dispatch(changeSumIsk(todosApplications.summ));
  }, []);

  const isCheckRole =
    checkEditPlaint === true && (+typeUser === 1 || +typeUser === 2);

  return (
    <div className="calculator">
      <div
        className={`${"calculator__count"} ${
          isCheckRole && "calculator_morePdf"
        }`}
      >
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
        <div className="typeSpora">
          <Selects
            arr={typeCountSum}
            initText={"Тип спора"}
            keys={{ typeKey: typePay, type: "typePay" }}
            type="typePay"
          />
        </div>
        <span className="btnCal" onClick={resultCal}>
          Рассчитать
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
