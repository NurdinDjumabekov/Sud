import React from "react";
import Selects from "../../Selects/Selects";
import "./TargetPlaintiff.scss";
import Requisites from "../Requisites/Requisites";
import Calculator from "../../Calculator/Calculator";
import { useDispatch, useSelector } from "react-redux";
import DataInput from "../DataInput/DataInput";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";
import { changeCalculatorType } from "../../../store/reducers/stateSlice";

const TargetPlaintiff = () => {
  const dispatch = useDispatch();
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { selCurrency } = useSelector((state) => state.selectsSlice);
  const { calculatorType } = useSelector((state) => state.stateSlice);
  const { typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );

  const changeInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value.includes("'") || value.includes("`")) {
      return;
    }
    const filteredValue = value.replace(/[^0-9]/g, "");
    dispatch(
      changeTodosApplications({
        ...todosApplications,
        [e.target.name]: filteredValue,
      })
    );
  };

  return (
    <div className="plaintiFilling__container">
      <div className="addPlaintiff">
        <form className="targetPlaintiff">
          {/* <div className="twoInputs">
            <div>
              <p>Цена иска</p>
              <input
                type="text"
                placeholder="Цена иска"
                name="summ"
                onChange={changeInput}
                value={todosApplications.summ}
                required
              />
            </div>
            <Selects
              arr={selCurrency}
              initText={"Валюта иска"}
              keys={{ typeKey: todosApplications.summ_curr, type: "summ_curr" }}
              type="todos"
            />
          </div> */}
          <div className="twoInputs">
            <div>
              <p>Арбитражный сбор</p>
              <input
                type="text"
                name="arbitr_fee"
                placeholder="Арбитр. сбор"
                onChange={changeInput}
                value={todosApplications.arbitr_fee}
                required
              />
            </div>
            <Selects
              arr={selCurrency}
              initText={"Валюта арбитражного сбора"}
              keys={{
                typeKey: todosApplications.arbitr_curr,
                type: "arbitr_curr",
              }}
              type="todos"
            />
          </div>
          <div className="twoInputs">
            <div>
              <p>Регистрационные сборы</p>
              <input
                type="text"
                placeholder="Рег. сбор"
                name="registr_fee"
                onChange={changeInput}
                value={todosApplications.registr_fee}
                required
              />
            </div>
            <Selects
              arr={selCurrency}
              initText={"Валюта регистрационного сбора"}
              keys={{
                typeKey: todosApplications.registr_curr,
                type: "registr_curr",
              }}
              type="todos"
            />
          </div>
          <div className="twoInputs">
            <div>
              <p>Сумма доплаты</p>
              <input
                type="text"
                placeholder="Cумма доплаты"
                name="doplata_summ"
                onChange={changeInput}
                value={todosApplications.doplata_summ}
                required
              />
            </div>
            <Selects
              arr={selCurrency}
              initText={"Валюта надбавки"}
              keys={{
                typeKey: todosApplications.nadbavka_curr,
                type: "nadbavka_curr",
              }}
              type="todos"
            />
          </div>
          <div className="twoInputs">
            <DataInput
              props={{
                title: "Крайний срок уплаты арбитражного сбора *",
                nameInput: "arbitr_pay_end_date",
                keyData: todosApplications.arbitr_pay_end_date,
                typeChange: "todos",
              }}
            />
            <DataInput
              props={{
                title: "Крайний срок доплаты арбитражного сбора *",
                nameInput: "arbitr_doplata_end_date",
                keyData: todosApplications.arbitr_doplata_end_date,
                typeChange: "todos",
              }}
            />
          </div>
          <div className="choiceBtnsTarget">
            <div className="choiceBtnsTarget__inner">
              <span
                className={calculatorType ? "" : "activeBtnsPlaintiff"}
                onClick={() => dispatch(changeCalculatorType(false))}
              >
                Реквизиты
              </span>
              <span
                className={calculatorType ? "activeBtnsPlaintiff" : ""}
                onClick={() => dispatch(changeCalculatorType(true))}
              >
                Калькулятор
              </span>
            </div>
          </div>
          {calculatorType ? <Calculator /> : <Requisites />}
        </form>
      </div>
    </div>
  );
};

export default TargetPlaintiff;
