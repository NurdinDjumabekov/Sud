import React from "react";
import "./UrFace.scss";
import Selects from "../../Selects/Selects";
import DataInput from "../DataInput/DataInput";
import { useSelector } from "react-redux";

const UrFace = ({ typerole }) => {
  const [type, setType] = React.useState("");
  const selectArr = [
    { id: 0, name: "Мужской" },
    { id: 1, name: "Женский" },
  ];
  const [typeCompany, setTypeCompany] = React.useState(true);
  const send = (e) => {
    e.preventDefault();
  };
  const { adff } = useSelector((state) => state.inputSlice);
  // замени на норм state

  const changeInput = (e) => {
    e.preventDefault();
    // dispatch(changeADFF({ ...adff, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <h3>{typerole === "истца" ? "Истец" : "Ответчик"}</h3>
      <form onSubmit={send}>
        <div className="twoInputs">
          <div>
            <p>Название *</p>
            <input type="text" placeholder="Название" />
          </div>
          <div>
            <p>Номер телефона</p>
            <input type="text" placeholder="Номер телефона" />
          </div>
        </div>
        <div className="twoInputs">
          <div>
            <p>Ваш ИНН</p>
            <input type="text" placeholder="ИНН" />
          </div>
          <div>
            <p>ОКПО</p>
            <input
              type="text"
              placeholder="Общереспубликанский Классификатор Предприятий и Организаций"
            />
          </div>
        </div>
        <div className="twoInputs">
          <div>
            <p>Электронная почта</p>
            <input type="text" placeholder="Электронная почта" />
          </div>
          <div>
            <p>Второй адрес электронной почты</p>
            <input type="text" placeholder="Второй адрес электронной почты" />
          </div>
        </div>
        <div className="threeInputs">
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={"Вид организационно-правовой нормы"}
          />
          <DataInput
            props={{
              title: "Дата первичной регистрации",
              placeholder: "",
              nameInput: "dob",
              change: changeInput,
              keyData: "adff.dob",
            }}
          />
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={"Тип компании"}
          />
        </div>
        <div className="threeInputs">
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={"Страна"}
          />
        </div>
        <div className="btnsTypeMain">
          <div className="btnsType">
            <button
              className={typeCompany ? "activeBtnsPlaintiff" : ""}
              onClick={() => setTypeCompany(true)}
            >
              Руководитель компании
            </button>
            <button
              className={typeCompany ? "" : "activeBtnsPlaintiff"}
              onClick={() => setTypeCompany(false)}
            >
              Адрес компании
            </button>
          </div>
        </div>
        {typeCompany ? (
          <>
            <div className="threeInputs">
              <Selects
                arr={selectArr}
                change={setType}
                choice={type}
                initText={"Должность в компании"}
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
            <div className="twoInputs">
              <div>
                <p>ФИО руководителя</p>
                <input type="text" placeholder="ФИО руководителя" />
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
        <button className="saveBtn">Сохранить</button>
      </form>
    </>
  );
};

export default UrFace;
