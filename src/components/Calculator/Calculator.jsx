import React from "react";
import Selects from "../Selects/Selects";
import "./Calculator.scss";
import { selectArr } from "../../helpers/dataArr";

const Calculator = () => {
  const [type, setType] = React.useState("");

  return (
    <div className="calculator">
      <div className="calculator__count">
        <div>
          <p>Сумма иска в USD</p>
          <input type="text" placeholder="Cумма доплаты" name="" />
        </div>
        <Selects
          arr={selectArr}
          change={setType}
          choice={type}
          initText={'Тип спора'}
        />
        <button className="btnCal">Расчитать</button>
      </div>
      <div className="calculator__result">
        <div>
          <h5>Сбор</h5>
          <div>
            <h5>Сумма Обычный регламент единоличный арбитр (-30%)</h5>
            <h5> Обычный регламент</h5>
          </div>
        </div>
        <div className="tablesresult">
          <div>
            <p>Регистрационный (c НДС 12% и налогом с продаж 2%) $0 </p>
          </div>
          <div>
            <p>Арбитражный (c НДС 12% и налогом с продаж 2%)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
