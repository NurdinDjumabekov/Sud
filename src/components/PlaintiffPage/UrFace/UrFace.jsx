import React from "react";
import "./UrFace.scss";
import Selects from "../../Selects/Selects";
import DataInput from "../DataInput/DataInput";
import { useDispatch, useSelector } from "react-redux";
import {
  changeADUF,
  changeTypeFace,
  clearADFF,
  clearADUF,
} from "../../../store/reducers/inputSlice";
import {
  selectAddresElement,
  selectCountry,
  selectDistrict,
  selectRegion,
  selectUserStatus,
  typeCompanyArr,
  typeOrganization,
} from "../../../helpers/dataArr";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";
import {
  addTodosDefendant,
  addTodosPlaintiff,
} from "../../../store/reducers/applicationsSlice";
import {
  createEveryIsk,
  toTakeIdUrFace,
} from "../../../store/reducers/sendDocsSlice";

const UrFace = ({ typerole }) => {
  const dispatch = useDispatch();

  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { aduf, typeFace } = useSelector((state) => state.inputSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const {
    selCountries,
    selDistrict,
    selTypeAddress,
    selRegions,
    selTypeOrganiz,
    selTypeCompany,
    selTypePosition,
  } = useSelector((state) => state.selectsSlice);

  const sendData = (e) => {
    e.preventDefault();
    if (typerole === "истца") {
      dispatch(addTodosPlaintiff({ ...aduf, typeFace }));
    } else if (typerole === "ответчика") {
      dispatch(addTodosDefendant({ ...aduf, typeFace }));
    }
    dispatch(
      createEveryIsk({
        todosApplications,
        tokenA,
        action_type: 1,
        aduf,
        typeFace,
      })
    );
    dispatch(changeLookAddPlaintiff(0));
    dispatch(clearADFF());
    dispatch(clearADUF());
  };
  console.log(aduf, "aduf");

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(changeADUF({ ...aduf, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    console.log("ur face");

    return () => dispatch(changeTypeFace(1));
  }, []);

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
              required
            />
          </div>
          <div>
            <p>Номер телефона</p>
            <input
              required
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
              required
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
              required
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
              required
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
              required
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
            arr={selTypeOrganiz}
            initText={"Вид организационно-правовой нормы"}
            keys={{ typeKey: aduf.typeOrganization, type: "typeOrganization" }}
            type="aduf"
          />
          <DataInput
            props={{
              title: "Дата первичной регистрации",
              nameInput: "dataReg",
              placeholder: "",
              change: changeInput,
              keyData: aduf.dataReg,
              typeChange: "aduf",
            }}
          />
          <Selects
            arr={selTypeCompany}
            initText={"Тип компании"}
            keys={{ typeKey: aduf.typeCompany, type: "typeCompany" }}
            type="aduf"
          />
        </div>
        <div className="threeInputs">
          <Selects
            arr={selCountries}
            initText={"Страна"}
            keys={{ typeKey: aduf.country_ur, type: "country_ur" }}
            type="aduf"
          />
        </div>
        <div className="btnsTypeMain">
          <div className="btnsType">
            <span
              className={aduf?.type === 1 ? "activeBtnsPlaintiff" : ""}
              onClick={() => dispatch(changeADUF({ ...aduf, type: 1 }))}
            >
              Руководитель компании
            </span>
            <span
              className={aduf?.type === 1 ? "" : "activeBtnsPlaintiff"}
              onClick={() => dispatch(changeADUF({ ...aduf, type: 2 }))}
            >
              Адрес компании
            </span>
          </div>
        </div>
        {aduf?.type === 1 ? (
          <>
            <div className="threeInputs">
              <Selects
                arr={selTypePosition}
                initText={"Должность в компании"}
                keys={{ typeKey: aduf.userStatus, type: "userStatus" }}
                type="aduf"
              />
              <DataInput
                props={{
                  title: "Дата назначения *",
                  nameInput: "startData",
                  placeholder: "",
                  keyData: aduf.startData,
                  typeChange: "aduf",
                }}
              />
              <DataInput
                props={{
                  title: "Дата истечения *",
                  nameInput: "endData",
                  placeholder: "",
                  keyData: aduf.endData,
                  typeChange: "aduf",
                }}
              />
            </div>
            <div className="twoInputs">
              <div>
                <p>ФИО руководителя</p>
                <input
                  required
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
                arr={selCountries}
                initText={"Страна *"}
                keys={{ typeKey: aduf.country, type: "country" }}
                type="aduf"
              />
              <Selects
                arr={selRegions}
                initText={"Область *"}
                keys={{ typeKey: aduf.region, type: "region" }}
                type="aduf"
              />
              <Selects
                arr={selDistrict}
                initText={"Район *"}
                keys={{ typeKey: aduf.district, type: "district" }}
                type="aduf"
              />
            </div>
            <div className="threeInputs">
              <div>
                <p>Город</p>
                <input
                  required
                  type="text"
                  placeholder="Ваш город проживания"
                  name="city"
                  onChange={changeInput}
                  value={aduf.city}
                />
              </div>
              <Selects
                arr={selTypeAddress}
                initText={"Адресный элемент *"}
                keys={{ typeKey: aduf.adddreselement, type: "adddreselement" }}
                type="aduf"
              />
              <div>
                <p>Улица</p>
                <input
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
            Сохранить данные {typerole}
          </button>
          <span
            className="saveBtn"
            onClick={() => {
              dispatch(changeLookAddPlaintiff(0));
              dispatch(clearADFF());
              dispatch(clearADUF());
            }}
          >
            Отменить и выйти
          </span>
        </div>
      </form>
    </>
  );
};

export default UrFace;
