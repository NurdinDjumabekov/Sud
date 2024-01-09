import React from "react";
import "./UrFace.scss";
import Selects from "../../Selects/Selects";
import DataInput from "../DataInput/DataInput";
import { useDispatch, useSelector } from "react-redux";
import { changeADUF } from "../../../store/reducers/inputSlice";
import {
  UserStatus,
  selectAddresElement,
  selectCountry,
  selectDistrict,
  selectRegion,
  typeCompanyArr,
  typeOrganization,
} from "../../../helpers/dataArr";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";

const UrFace = ({ typerole }) => {
  const dispatch = useDispatch();

  const sendData = (e) => {
    e.preventDefault();
  };
  const { aduf } = useSelector((state) => state.inputSlice);

  console.log(aduf, "aduf");

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(changeADUF({ ...aduf, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <h3>{typerole === "истца" ? "Истец" : "Ответчик"}</h3>
      <form onSubmit={sendData}>
        <div className="twoInputs">
          <div>
            <p>Название *</p>
            <input
              type="text"
              placeholder="Название"
              name="name"
              onChange={changeInput}
              value={aduf.name}
            />
          </div>
          <div>
            <p>Номер телефона</p>
            <input
              type="text"
              placeholder="Номер телефона"
              name="numPhone"
              onChange={changeInput}
              value={aduf.numPhone}
            />
          </div>
        </div>
        <div className="twoInputs">
          <div>
            <p>Ваш ИНН</p>
            <input
              type="text"
              placeholder="ИНН"
              name="inn"
              onChange={changeInput}
              value={aduf.inn}
            />
          </div>
          <div>
            <p>ОКПО</p>
            <input
              type="text"
              placeholder="Общереспубликанский Классификатор Предприятий и Организаций"
              name="okpo"
              onChange={changeInput}
              value={aduf.okpo}
            />
          </div>
        </div>
        <div className="twoInputs">
          <div>
            <p>Электронная почта</p>
            <input
              type="text"
              placeholder="Электронная почта"
              name="email"
              onChange={changeInput}
              value={aduf.email}
            />
          </div>
          <div>
            <p>Второй адрес электронной почты</p>
            <input
              type="text"
              placeholder="Второй адрес электронной почты"
              name="email2"
              onChange={changeInput}
              value={aduf.email2}
            />
          </div>
        </div>
        <div className="threeInputs">
          <Selects
            arr={typeOrganization}
            initText={"Вид организационно-правовой нормы"}
            keys={{ typeKey: aduf.typeOrganization, type: "typeOrganization" }}
            type="aduf"
          />
          <DataInput
            props={{
              title: "Дата первичной регистрации",
              placeholder: "",
              nameInput: "dataReg",
              change: changeInput,
              keyData: "aduf.dataReg",
            }}
          />
          <Selects
            arr={typeCompanyArr}
            initText={"Тип компании"}
            keys={{ typeKey: aduf.typeCompany, type: "typeCompany" }}
            type="aduf"
          />
        </div>
        <div className="threeInputs">
          <Selects
            arr={selectCountry}
            initText={"Страна"}
            keys={{ typeKey: aduf.country, type: "country" }}
            type="aduf"
          />
        </div>
        <div className="btnsTypeMain">
          <div className="btnsType">
            <button
              className={aduf?.type ? "activeBtnsPlaintiff" : ""}
              onClick={() => dispatch(changeADUF({ ...aduf, type: true }))}
            >
              Руководитель компании
            </button>
            <button
              className={aduf?.type ? "" : "activeBtnsPlaintiff"}
              onClick={() => dispatch(changeADUF({ ...aduf, type: false }))}
            >
              Адрес компании
            </button>
          </div>
        </div>
        {aduf?.type ? (
          <>
            <div className="threeInputs">
              <Selects
                arr={UserStatus}
                initText={"Должность в компании"}
                keys={{ typeKey: aduf.userStatus, type: "userStatus" }}
              />
              <DataInput
                props={{
                  title: "Дата вашего рождения",
                  placeholder: "",
                  nameInput: "startData",
                  change: changeInput,
                  keyData: aduf.startData,
                }}
              />
              <DataInput
                props={{
                  title: "Дата вашего рождения",
                  placeholder: "",
                  nameInput: "endData",
                  change: changeInput,
                  keyData: aduf.endData,
                }}
              />
            </div>
            <div className="twoInputs">
              <div>
                <p>ФИО руководителя</p>
                <input
                  type="text"
                  placeholder="ФИО руководителя"
                  name="fioBoss"
                  onChange={changeInput}
                  value={aduf.fioBoss}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="threeInputs">
              <Selects
                arr={selectCountry}
                initText={"Страна *"}
                keys={{ typeKey: aduf.country, type: "country" }}
                type="aduf"
              />
              <Selects
                arr={selectRegion}
                initText={"Область *"}
                keys={{ typeKey: aduf.region, type: "region" }}
                type="aduf"
              />
              <Selects
                arr={selectDistrict}
                initText={"Район *"}
                keys={{ typeKey: aduf.district, type: "district" }}
                type="aduf"
              />
            </div>
            <div className="threeInputs">
              <div>
                <p>Город</p>
                <input
                  type="text"
                  placeholder="Ваш город проживания"
                  name="city"
                  onChange={changeInput}
                  value={aduf.city}
                />
              </div>
              <Selects
                arr={selectAddresElement}
                initText={"Адресный элемент *"}
                keys={{ typeKey: aduf.adddreselement, type: "adddreselement" }}
                type="aduf"
              />
              <div>
                <p>Улица</p>
                <input
                  type="text"
                  placeholder="Улица"
                  name="street"
                  onChange={changeInput}
                  value={aduf.street}
                />
              </div>
            </div>
            <div className="threeInputs">
              <div>
                <p>Номер объекта</p>
                <input
                  type="text"
                  placeholder="Номер объекта"
                  name="numObj"
                  onChange={changeInput}
                  value={aduf.numObj}
                />
              </div>
              <div>
                <p>Буквенный индекс</p>
                <input
                  type="text"
                  placeholder="Буквенный индекс"
                  name="index"
                  onChange={changeInput}
                  value={aduf.index}
                />
              </div>
              <div>
                <p>Квартира</p>
                <input
                  type="text"
                  placeholder="Квартира"
                  name="apartament"
                  onChange={changeInput}
                  value={aduf.apartament}
                />
              </div>
            </div>
            <div className="threeInputs">
              <div>
                <p>Почтовый индекс</p>
                <input
                  type="text"
                  placeholder="Почтовый индекс"
                  name="emailIndex"
                  onChange={changeInput}
                  value={aduf.emailIndex}
                />
              </div>
              <div>
                <p>Описание</p>
                <input
                  type="text"
                  placeholder="Описание"
                  name="description"
                  onChange={changeInput}
                  value={aduf.description}
                />
              </div>
            </div>
          </>
        )}
        <div className="btnsSave">
          <button className="saveBtn" type="submit">
            Сохранить
          </button>
          <span
            className="saveBtn"
            onClick={() => dispatch(changeLookAddPlaintiff(0))}
          >
            Отменить и выйти
          </span>
        </div>
      </form>
    </>
  );
};

export default UrFace;
