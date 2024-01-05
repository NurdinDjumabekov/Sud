import React from "react";
import "./FizFace.scss";
import Selects from "../../Selects/Selects";
import { useDispatch, useSelector } from "react-redux";
import { changeADFF } from "../../../store/reducers/inputSlice";
import { selectArr } from "../../../helpers/dataArr";
import DataInput from "../DataInput/DataInput";
import ChoiceNoneData from "../ChoiceNoneData/ChoiceNoneData";

const FizFace = ({ typerole }) => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = React.useState({});
  const [type, setType] = React.useState("");
  const sendData = (e) => {
    e.preventDefault();
  };

  const { adff } = useSelector((state) => state.inputSlice);

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(changeADFF({ ...adff, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    dispatch(changeADFF({ ...adff, sex: type }));
  }, [type]);

  return (
    <div className="addPlaintiffFiz">
      <h3>{typerole === "истца" ? "Истец" : "Ответчик"}</h3>
      <form onSubmit={sendData}>
        <div className="twoInputs">
          <div>
            <p>Ваше ФИО</p>
            <input
              type="text"
              placeholder="ФИО"
              name="name"
              onChange={changeInput}
              value={adff.name}
            />
          </div>
          <div>
            <p>Ваш номер телефона</p>
            <input
              type="text"
              placeholder="Телефон*"
              name="numberPlaintiff"
              onChange={changeInput}
            />
          </div>
        </div>
        <div className="twoInputs">
          <div>
            <p>Ваша электронная почта</p>
            <input type="email" placeholder="Электронная почта" />
          </div>
          <div>
            <p>Ваш второй адрес электронной почты</p>
            <input type="email" placeholder="Второй адрес электронной почты" />
          </div>
        </div>
        <div className="threeInputs">
          <ChoiceNoneData
            props={{ title: "У вас неизвестна дата рождения?" }}
          />
          <DataInput
            props={{
              title: "Дата вашего рождения",
              placeholder: "",
              nameInput: "dob",
              change: changeInput,
              keyData: adff.dob,
            }}
          />
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={"Пол *"}
          />
        </div>
        <div className="threeInputs twoo">
          <ChoiceNoneData props={{ title: "Неизвестный ИНН?" }} />
          <div>
            <p>Ваш ИНН</p>
            <input
              type="text"
              placeholder="ИНН"
              name="inn"
              onChange={changeInput}
              value={adff.inn}
            />
          </div>
        </div>
        <div className="threeInputs">
          <ChoiceNoneData props={{ title: "Неизвестен паспорт?" }} />
          <div>
            <p>Серия и номер паспорта</p>
            <input
              type="text"
              placeholder="Серия и номер паспорта"
              name=""
              onChange={changeInput}
              // value={adff.inn}
            />
          </div>
          <div>
            <p>Орган выдачи</p>
            <input type="text" placeholder="Кем выдан*" />
          </div>
        </div>
        <div className="threeInputs">
          <ChoiceNoneData
            props={{ title: "Не учитывать срок действия паспорта?" }}
          />
          <DataInput
            props={{
              title: "Дата вашего рождения",
              placeholder: "",
              nameInput: "dob",
              change: changeInput,
              keyData: adff.dob,
            }}
          />
          <DataInput
            props={{
              title: "Дата вашего рождения",
              placeholder: "",
              nameInput: "dob",
              change: changeInput,
              keyData: adff.dob,
            }}
          />
        </div>
        <h4>
          <p>Адрес</p>
        </h4>
        <div className="threeInputs">
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={"Страна *"}
          />
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={"Область *"}
          />
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={"Район *"}
          />
        </div>
        <div className="threeInputs">
          <div>
            <p>Город</p>
            <input type="text" placeholder="Ваш город проживания" />
          </div>
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={"Адресный элемент *"}
          />
          <div>
            <p>Улица</p>
            <input type="text" placeholder="Улица" />
          </div>
        </div>
        <div className="threeInputs">
          <div>
            <p>Номер объекта</p>
            <input type="text" placeholder="Номер объекта" />
          </div>
          <div>
            <p>Буквенный индекс</p>
            <input type="text" placeholder="Буквенный индекс" />
          </div>
          <div>
            <p>Квартира</p>
            <input type="text" placeholder="Квартира" />
          </div>
        </div>
        <div className="threeInputs">
          <div>
            <p>Почтовый индекс</p>
            <input type="text" placeholder="Почтовый индекс" />
          </div>
          <div>
            <p>Описание</p>
            <input type="text" placeholder="Описание" />
          </div>
        </div>
        <button className="saveBtn">Сохранить</button>
      </form>
    </div>
  );
};

export default FizFace;
