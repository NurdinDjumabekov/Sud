import React from "react";
import "./FizFace.scss";
import Selects from "../../Selects/Selects";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  changeADFF,
  clearADFF,
  clearADUF,
} from "../../../store/reducers/inputSlice";
import { selectArr } from "../../../helpers/dataArr";
import DataInput from "../DataInput/DataInput";
import ChoiceNoneData from "../ChoiceNoneData/ChoiceNoneData";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";
import { createEveryIsk } from "../../../store/reducers/sendDocsSlice";
import { changeAlertText } from "../../../store/reducers/typesSlice";

const FizFace = ({ typerole }) => {
  const dispatch = useDispatch();
  const { adff, typeFace } = useSelector((state) => state.inputSlice);
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { selCountries, selDistrict, selTypeAddress, selRegions } = useSelector(
    (state) => state.selectsSlice
  );

  const sendData = (e) => {
    e.preventDefault();
    if (adff?.dob === "" && adff?.unknownDob === 0) {
      alertFN("Заполните дату рождения");
    } else {
      if (adff?.timePassportStart === "" && adff?.unknownDataPassport === 0) {
        alertFN("Заполните дату выдачи паспорта");
      } else {
        if (adff?.timePassportEnd === "" && adff?.unknownDataPassport === 0) {
          alertFN("Заполните дату истечения срока паспорта");
        } else {
          if (adff?.country === 0) {
            alertFN("Выберите страну проживания ");
          } else {
            if (adff?.region === 0) {
              alertFN("Выберите область ");
            } else {
              if (adff?.district === 0) {
                alertFN("Выберите район");
              } else {
                if (adff?.adddreselement === 0) {
                  alertFN("Выберите адресный элемент");
                } else {
                  checkData();
                }
              }
            }
          }
        }
      }
    }
  };

  const addData = (type) => {
    /// action_type 1 - создание , 2 - редактирование
    dispatch(
      createEveryIsk({
        todosApplications,
        tokenA,
        adff,
        typeFace,
        role: type,
      })
    );
  };

  const checkData = () => {
    if (typerole === "истца" && lookAddPlaintiff === 1) {
      addData(1);
    } else if (typerole === "ответчика" && lookAddPlaintiff === 1) {
      addData(2);
    } else if (typerole === "истца" && lookAddPlaintiff === 2) {
      addData(3);
    } else if (typerole === "ответчика" && lookAddPlaintiff === 2) {
      addData(4);
    }
    dispatch(changeLookAddPlaintiff(0));
    dispatch(clearADFF());
    dispatch(clearADUF());
  };

  const alertFN = (text) => {
    dispatch(
      changeAlertText({
        text: text,
        backColor: "#f9fafd",
        state: true,
      })
    );
  };

  const changeInput = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    // Проверка на наличие одинарных или обратных кавычек
    if (value.includes("'") || value.includes("`")) {
      return;
    }

    if (name === "name") {
      const regName = /^[A-Za-zА-Яа-я- ]{0,70}$/;
      if (regName.test(value)) {
        dispatch(changeADFF({ ...adff, [name]: value }));
      }
    } else if (name === "inn") {
      const innRegex = /^[0-9]{0,14}$/;
      if (innRegex.test(value)) {
        dispatch(changeADFF({ ...adff, [name]: value }));
      }
    } else if (name === "numPhone") {
      const numReg = /[0-9+()-]/;
      const filteredValue = value
        .split("")
        .filter((char) => numReg.test(char))
        .join("");
      dispatch(changeADFF({ ...adff, [name]: filteredValue }));
    } else {
      dispatch(changeADFF({ ...adff, [name]: value }));
    }
  };

  const decodedToken = jwtDecode(tokenA);

  // console.log(todosApplications, "todosApplications");

  return (
    <div className="addPlaintiffFiz">
      <h3>
        {lookAddPlaintiff === 1 ? (
          <> {typerole === "истца" ? "Истец" : "Ответчик"} </>
        ) : (
          <>
            {typerole === "истца"
              ? "Представитель истца"
              : "Представитель ответчика"}
          </>
        )}
      </h3>
      <form onSubmit={sendData}>
        <div className="twoInputs">
          <div>
            <p>
              Ваше ФИО <b className="required">*</b>
            </p>
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
            <p>
              Ваш номер телефона <b className="required">*</b>
            </p>
            <input
              type="text"
              placeholder="Телефон*"
              name="numPhone"
              onChange={changeInput}
              value={adff.numPhone}
              required
            />
          </div>
          <div>
            <p>
              Ваша электронная почта <b className="required">*</b>
            </p>
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
            />
          </div>
        </div>
        <div className="sixInputs">
          <div className="threeInputs">
            <ChoiceNoneData
              props={{
                title: `Неизвестна дата рождения`,
                typeKey: adff.unknownDob,
                type: "unknownDob",
              }}
            />
            {adff.unknownDob === 0 ? (
              <DataInput
                props={{
                  title: `Дата вашего рождения`,
                  nameInput: "dob",
                  keyData: adff.dob,
                  typeChange: "adff",
                  urgently: true,
                }}
              />
            ) : (
              <div>
                <p>Дата вашего рождения</p>
                <input
                  placeholder="не обязательное поле"
                  readOnly
                  className={adff.unknownDob === 1 ? "disableInput" : ""}
                />
              </div>
            )}
            <Selects
              arr={selectArr}
              initText={"Пол"}
              keys={{ typeKey: adff.sex, type: "sex" }}
              type="adff"
              urgently={true}
            />
          </div>
          <div className="threeInputs">
            <ChoiceNoneData
              props={{
                title: "Не учитывайте срок действия паспорта",
                typeKey: adff.unknownDataPassport,
                type: "unknownDataPassport",
              }}
            />
            {adff.unknownDataPassport === 0 ? (
              <>
                <DataInput
                  props={{
                    title: "Дата выдачи",
                    nameInput: "timePassportStart",
                    keyData: adff.timePassportStart,
                    typeChange: "adff",
                    urgently: true,
                  }}
                />
                <DataInput
                  props={{
                    title: "Дата истечения срока",
                    nameInput: "timePassportEnd",
                    keyData: adff.timePassportEnd,
                    typeChange: "adff",
                    urgently: true,
                  }}
                />
              </>
            ) : (
              <>
                <div>
                  <p>Дата выдачи </p>
                  <input
                    placeholder="не обязательное поле"
                    readOnly
                    className={
                      adff.unknownDataPassport === 1 ? "disableInput" : ""
                    }
                  />
                </div>
                <div>
                  <p>Дата истечения срока</p>
                  <input
                    placeholder="не обязательное поле"
                    readOnly
                    className={
                      adff.unknownDataPassport === 1 ? "disableInput" : ""
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="sixInputs">
          <div className="threeInputs">
            <ChoiceNoneData
              props={{
                title: "Неизвестен паспорт",
                typeKey: adff.unknownPassport,
                type: "unknownPassport",
              }}
            />
            <div>
              <p>
                Серия и номер паспорта
                {adff.unknownPassport === 0 ? (
                  <b className="required">*</b>
                ) : (
                  ""
                )}
              </p>
              <input
                type="text"
                placeholder="Серия и номер паспорта"
                name="passportSeries"
                onChange={changeInput}
                required
                value={adff.unknownPassport === 1 ? "" : adff.passportSeries}
                className={adff.unknownPassport === 1 ? "disableInput" : ""}
                readOnly={adff.unknownPassport === 1 ? true : false}
              />
            </div>
            <div>
              <p>
                Орган выдачи
                {adff.unknownPassport === 0 ? (
                  <b className="required">*</b>
                ) : (
                  ""
                )}
              </p>
              <input
                type="text"
                placeholder="Кем выдан*"
                name="organizationPassport"
                onChange={changeInput}
                required
                value={adff.unknownPassport ? "" : adff.organizationPassport}
                className={adff.unknownPassport ? "disableInput" : ""}
                readOnly={adff.unknownPassport ? true : false}
              />
            </div>
          </div>
          <div className="threeInputs">
            <ChoiceNoneData
              props={{
                title: "Неизвестен ИНН",
                typeKey: adff.unknownInn,
                type: "unknownInn",
              }}
            />
            <div>
              <p>
                Ваш ИНН
                {adff.unknownInn === 0 ? <b className="required">*</b> : ""}
              </p>
              <input
                type="text"
                placeholder="ИНН"
                name="inn"
                onChange={changeInput}
                value={adff.unknownInn === 1 ? "" : adff.inn}
                required
                className={adff.unknownInn === 1 ? "disableInput" : ""}
                readOnly={adff.unknownInn === 1 ? true : false}
              />
            </div>
            <div className="noneDataInputs"></div>
          </div>
        </div>
        <h4>
          <p>Адрес</p>
        </h4>
        <div className="sixInputs">
          <div className="threeInputs moreStyles">
            <Selects
              arr={selCountries}
              initText={`Страна`}
              keys={{ typeKey: adff.country, type: "country" }}
              type="adff"
              urgently={true}
            />
            <Selects
              arr={selRegions}
              initText={"Область"}
              keys={{ typeKey: adff.region, type: "region" }}
              type="adff"
              urgently={true}
            />
            <Selects
              arr={selDistrict}
              initText={"Район"}
              keys={{ typeKey: adff.district, type: "district" }}
              type="adff"
              urgently={true}
            />
          </div>
          <div className="threeInputs moreStyles">
            <div>
              <p>
                Город <b className="required">*</b>
              </p>
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
              arr={selTypeAddress}
              initText={"Адресный элемент"}
              keys={{ typeKey: adff.adddreselement, type: "adddreselement" }}
              type="adff"
              urgently={true}
            />
            <div>
              <p>
                Улица <b className="required">*</b>
              </p>
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
        </div>
        <div className="sixInputs">
          <div className="threeInputs moreStyles ">
            <div>
              <p>
                Номер объекта <b className="required">*</b>
              </p>
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
              <p>
                Буквенный индекс <b className="required">*</b>
              </p>
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
              <p>
                Квартира <b className="required">*</b>
              </p>
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
          <div className="threeInputs moreStyles">
            <div>
              <p>
                Почтовый индекс <b className="required">*</b>
              </p>
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
              />
            </div>
            <div className="noneDataInputs"></div>
          </div>
        </div>
        <div className="btnsSave">
          {+decodedToken?.type_user === 4 && (
            <button className="saveBtn" type="submit">
              Добавить
            </button>
          )}
          {/* {+decodedToken?.type_user !== 4 && (
            <span
              style={{ width: "150px" }}
              className="saveBtn moreBtn"
              onClick={() => {
                dispatch(changeLookAddPlaintiff(0));
                dispatch(clearADFF());
                dispatch(clearADUF());
              }}
            >
              Отмена
            </span>
          )} */}
          <span
            style={{ width: "150px" }}
            className="saveBtn moreBtn"
            onClick={() => {
              dispatch(changeLookAddPlaintiff(0));
              dispatch(clearADFF());
              dispatch(clearADUF());
            }}
          >
            Отмена
          </span>
        </div>
      </form>
    </div>
  );
};

export default FizFace;
