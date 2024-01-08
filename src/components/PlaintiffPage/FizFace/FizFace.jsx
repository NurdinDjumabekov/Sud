import React from "react";
import "./FizFace.scss";
import Selects from "../../Selects/Selects";
import { useDispatch, useSelector } from "react-redux";
import { changeADFF } from "../../../store/reducers/inputSlice";
import {
  selectAddresElement,
  selectArr,
  selectCountry,
  selectDistrict,
  selectRegion,
} from "../../../helpers/dataArr";
import DataInput from "../DataInput/DataInput";
import ChoiceNoneData from "../ChoiceNoneData/ChoiceNoneData";
import { addTodosApplications } from "../../../store/reducers/applicationsSlice";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";

const FizFace = ({ typerole }) => {
  const dispatch = useDispatch();
  const [type, setType] = React.useState("");
  const { adff } = useSelector((state) => state.inputSlice);

  const sendData = (e) => {
    e.preventDefault();
    dispatch(addTodosApplications(adff));
  };

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
              required
            />
          </div>
          <div>
            <p>Ваш номер телефона</p>
            <input
              type="text"
              placeholder="Телефон*"
              name="numberPlaintiff"
              onChange={changeInput}
              value={adff.numberPlaintiff}
              required
            />
          </div>
        </div>
        <div className="twoInputs">
          <div>
            <p>Ваша электронная почта</p>
            <input
              type="email"
              placeholder="Электронная почта"
              value={adff.email}
              onChange={changeInput}
              name="email"
              required
            />
          </div>
          <div>
            <p>Ваш второй адрес электронной почты</p>
            <input
              type="email"
              placeholder="Второй адрес электронной почты"
              value={adff.email2}
              onChange={changeInput}
              name="email2"
              required
            />
          </div>
        </div>
        <div className="threeInputs">
          <ChoiceNoneData
            props={{
              title: "У вас неизвестна дата рождения?",
              typeKey: adff.unknownDob,
              type: "unknownDob",
            }}
          />
          <DataInput
            props={{
              title: "Дата вашего рождения",
              nameInput: "dob",
              keyData: adff.dob,
              typeChange: "adff",
            }}
          />
          <Selects
            arr={selectArr}
            initText={"Пол *"}
            keys={{ typeKey: adff.sex, type: "sex" }}
            type="adff"
          />
        </div>
        <div className="threeInputs twoo">
          <ChoiceNoneData
            props={{
              title: "Неизвестный ИНН?",
              typeKey: adff.unknownInn,
              type: "unknownInn",
            }}
          />
          <div>
            <p>Ваш ИНН</p>
            <input
              type="text"
              placeholder="ИНН"
              name="inn"
              onChange={changeInput}
              value={adff.inn}
              required
            />
          </div>
        </div>
        <div className="threeInputs">
          <ChoiceNoneData
            props={{
              title: "Неизвестен паспорт?",
              typeKey: adff.unknownPassport,
              type: "unknownPassport",
            }}
          />
          <div>
            <p>Серия и номер паспорта</p>
            <input
              type="text"
              placeholder="Серия и номер паспорта"
              name="passportSeries"
              onChange={changeInput}
              value={adff.passportSeries}
              required
            />
          </div>
          <div>
            <p>Орган выдачи</p>
            <input
              type="text"
              placeholder="Кем выдан*"
              name="organizationPassport"
              onChange={changeInput}
              value={adff.organizationPassport}
              required
            />
          </div>
        </div>
        <div className="threeInputs">
          <ChoiceNoneData
            props={{
              title: "Не учитывать срок действия паспорта?",
              typeKey: adff.unknownDataPassport,
              type: "unknownDataPassport",
            }}
          />
          <DataInput
            props={{
              title: "Дата выдачи",
              nameInput: "timePassportStart",
              keyData: adff.timePassportStart,
              typeChange: "adff",
            }}
          />
          <DataInput
            props={{
              title: "Дата истечения срока",
              nameInput: "timePassportEnd",
              keyData: adff.timePassportEnd,
              typeChange: "adff",
            }}
          />
        </div>
        <h4>
          <p>Адрес</p>
        </h4>
        <div className="threeInputs">
          <Selects
            arr={selectCountry}
            initText={"Страна *"}
            keys={{ typeKey: adff.country, type: "country" }}
            type="adff"
          />
          <Selects
            arr={selectRegion}
            initText={"Область *"}
            keys={{ typeKey: adff.region, type: "region" }}
            type="adff"
          />
          <Selects
            arr={selectDistrict}
            initText={"Район *"}
            keys={{ typeKey: adff.district, type: "district" }}
            type="adff"
          />
        </div>
        <div className="threeInputs">
          <div>
            <p>Город</p>
            <input
              type="text"
              placeholder="Ваш город проживания"
              value={adff.city}
              onChange={changeInput}
              name="city"
              required
            />
          </div>
          <Selects
            arr={selectAddresElement}
            initText={"Адресный элемент *"}
            keys={{ typeKey: adff.adddreselement, type: "adddreselement" }}
            type="adff"
          />
          <div>
            <p>Улица</p>
            <input
              type="text"
              placeholder="Улица"
              value={adff.street}
              onChange={changeInput}
              name="street"
              required
            />
          </div>
        </div>
        <div className="threeInputs">
          <div>
            <p>Номер объекта</p>
            <input
              type="text"
              placeholder="Номер объекта"
              value={adff.numObj}
              onChange={changeInput}
              name="numObj"
              required
            />
          </div>
          <div>
            <p>Буквенный индекс</p>
            <input
              type="text"
              placeholder="Буквенный индекс"
              value={adff.index}
              onChange={changeInput}
              name="index"
              required
            />
          </div>
          <div>
            <p>Квартира</p>
            <input
              type="text"
              placeholder="Квартира"
              value={adff.apartament}
              onChange={changeInput}
              name="apartament"
              required
            />
          </div>
        </div>
        <div className="threeInputs">
          <div>
            <p>Почтовый индекс</p>
            <input
              type="text"
              placeholder="Почтовый индекс"
              value={adff.emailIndex}
              onChange={changeInput}
              name="emailIndex"
              required
            />
          </div>
          <div>
            <p>Описание</p>
            <input
              type="text"
              placeholder="Описание"
              value={adff.description}
              onChange={changeInput}
              name="description"
              required
            />
          </div>
        </div>
        <div className="btnsSave">
          <button className="saveBtn" type="submit">
            Сохранить
          </button>
          <span
            className="saveBtn"
            onClick={() => dispatch(changeLookAddPlaintiff(false))}
          >
            Отменить и выйти
          </span>
        </div>
      </form>
    </div>
  );
};

export default FizFace;
