import React from "react";
import Selects from "../../Selects/Selects";
import "./TargetPlaintiff.scss";
import Requisites from "../../Requisites/Requisites";
import Calculator from "../../Calculator/Calculator";
import ExampleBlock from "../../ExampleBlock/ExampleBlock";
import { useSelector } from "react-redux";
import DataInput from "../DataInput/DataInput";

const TargetPlaintiff = () => {
  const [type, setType] = React.useState("");
  const [btnSend, setBtnSend] = React.useState(true);

  const { adff } = useSelector((state) => state.inputSlice);

  const sendData = () => {};

  const changeInput = (e) => {
    e.preventDefault();
    // dispatch(changeADFF({ ...adff, [e.target.name]: e.target.value }));
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
              <input type="text" placeholder="Cумма иска" name="" />
            </div>
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={"Фунт"}
            />
          </div>
          <div className="twoInputs">
            <div>
              <p>Арбитражный сбор</p>
              <input type="text" name="" placeholder="Арбитр. сбор" />
            </div>
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={"Валюта арбитра"}
            />
          </div>
          <div className="twoInputs">
            <div>
              <p>Регистрационные сборы</p>
              <input type="text" placeholder="Рег. сбор" name="" />{" "}
            </div>
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={"валюта регистрационного сбора"}
            />
          </div>
          <div className="twoInputs">
            <div>
              <p>Сумма доплаты</p>
              <input type="text" placeholder="Cумма доплаты" name="" />
            </div>
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={"Валюта надбавок"}
            />
          </div>
          <div className="twoInputs">
            <DataInput
              props={{
                title: "Крайний срок уплаты арбитражного сбора *",
                placeholder: "",
                nameInput: "dob",
                change: changeInput,
                keyData: adff.dob,
              }}
            />
            <DataInput
              props={{
                title: "Крайний срок уплаты арбитражного сбора *",
                placeholder: "",
                nameInput: "dob",
                change: changeInput,
                keyData: adff.dob,
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
