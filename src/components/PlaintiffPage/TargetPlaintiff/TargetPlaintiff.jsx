/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import "./style.scss";

////// fns
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";
import { changeCalculatorType } from "../../../store/reducers/stateSlice";

///// components
import Selects from "../../Selects/Selects";
import Requisites from "../Requisites/Requisites";
import Calculator from "../../Calculator/Calculator";
import DataInput from "../DataInput/DataInput";
import MyInput from "../../../common/MyInput/MyInput";

const TargetPlaintiff = () => {
  const dispatch = useDispatch();

  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { selCurrency } = useSelector((state) => state.selectsSlice);
  const { calculatorType } = useSelector((state) => state.stateSlice);

  const changeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value.includes("'") || value.includes("`")) return;

    const obj = { ...todosApplications, [name]: value.replace(/\D/g, "") };
    dispatch(changeTodosApplications(obj));
  };

  const lookCalculator = () => dispatch(changeCalculatorType(true));
  const lookRequisit = () => dispatch(changeCalculatorType(false));

  return (
    <div className="plaintiFilling__container">
      <div className="addPlaintiff">
        <form className="targetPlaintiff">
          <div className="twoInputs">
            <MyInput
              changeInput={changeInput}
              title={"Арбитражный сбор"}
              value={todosApplications?.arbitr_fee}
              name={"arbitr_fee"}
              placeholder={"Арбитр. сбор"}
              required={true}
            />

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
            <MyInput
              changeInput={changeInput}
              title={"Регистрационные сборы"}
              value={todosApplications?.registr_fee}
              name={"registr_fee"}
              placeholder={"Рег. сбор"}
              required={true}
            />

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
            <MyInput
              changeInput={changeInput}
              title={"Cумма доплаты"}
              value={todosApplications?.doplata_summ}
              name={"doplata_summ"}
              placeholder={"Cумма доплаты"}
              required={true}
            />

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
                onClick={lookRequisit}
              >
                Реквизиты
              </span>
              <span
                className={calculatorType ? "activeBtnsPlaintiff" : ""}
                onClick={lookCalculator}
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
