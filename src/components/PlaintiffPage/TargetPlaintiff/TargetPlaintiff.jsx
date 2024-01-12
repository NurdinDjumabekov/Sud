import React from "react";
import Selects from "../../Selects/Selects";
import "./TargetPlaintiff.scss";
import Requisites from "../../Requisites/Requisites";
import Calculator from "../../Calculator/Calculator";
import { useDispatch, useSelector } from "react-redux";
import DataInput from "../DataInput/DataInput";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";

const TargetPlaintiff = () => {
  const dispatch = useDispatch();
  const [btnSend, setBtnSend] = React.useState(true);

  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  const sendData = () => {};

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(
      changeTodosApplications({
        ...todosApplications,
        [e.target.name]: e.target.value,
      })
    );
  };

  const selectArr = [
    { id: 0, name: "Мужской" },
    { id: 1, name: "Женский" },
  ];

  return (
    <div className="plaintiFilling__container">
      <div className="addPlaintiff">
        <form className="targetPlaintiff">
          <div className="twoInputs">
            <div>
              <p>Сумма иска</p>
              <input
                type="text"
                placeholder="Cумма иска"
                name="summ"
                onChange={changeInput}
                value={todosApplications.summ}
                required
              />
            </div>
            <Selects
              arr={selectArr}
              initText={"Фунт"}
              keys={{ typeKey: todosApplications.summ_curr, type: "summ_curr" }}
              type="todos"
            />
          </div>
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
              arr={selectArr}
              initText={"Валюта арбитра"}
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
              arr={selectArr}
              initText={"валюта регистрационного сбора"}
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
              arr={selectArr}
              initText={"Валюта надбавок"}
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
                className={btnSend ? "activeBtnsPlaintiff" : ""}
                onClick={() => setBtnSend(true)}
              >
                Реквизины
              </span>
              <span
                className={btnSend ? "" : "activeBtnsPlaintiff"}
                onClick={() => setBtnSend(false)}
              >
                Калькулятор
              </span>
            </div>
          </div>
          {btnSend ? <Requisites /> : <Calculator />}
        </form>
      </div>
    </div>
  );
};

export default TargetPlaintiff;
