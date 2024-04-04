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
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";
import {
  addTodosDefendant,
  addTodosPlaintiff,
} from "../../../store/reducers/applicationsSlice";
import { createEveryIsk } from "../../../store/reducers/sendDocsSlice";
import { changeAlertText } from "../../../store/reducers/typesSlice";

const UrFace = ({ typerole }) => {
  const dispatch = useDispatch();

  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { aduf, typeFace } = useSelector((state) => state.inputSlice);
  const { tokenA, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );
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
    if (aduf?.typeOrganization === 0) {
      alertFN("Заполните вид организационно-правовой нормы");
    } else {
      if (aduf?.dataReg === "") {
        alertFN("Заполните дату первичной регистрации");
      } else {
        if (aduf?.typeCompany === 0) {
          alertFN("Заполните тип компании");
        } else {
          if (aduf?.country === 0) {
            alertFN("Выберите страну");
          } else {
            if (aduf?.userStatus === 0) {
              alertFN("Заполните должность компании");
            } else {
              if (aduf?.startData === "") {
                alertFN("Заполните дату назначения");
              } else {
                if (aduf?.endData === 0) {
                  alertFN("Заполните дату истечения ");
                } else {
                  if (aduf?.region === 0) {
                    alertFN("Выберите область");
                  } else {
                    if (aduf?.district === 0) {
                      alertFN("Выберите район");
                    } else {
                      if (aduf?.adddreselement === 0) {
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
        }
      }
    }
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

  const checkData = () => {
    if (typerole === "истца") {
      dispatch(addTodosPlaintiff({ ...aduf, typeFace }));
      dispatch(
        createEveryIsk({
          todosApplications,
          tokenA,
          action_type: 1,
          aduf,
          typeFace,
          role: 1,
        })
      );
    } else if (typerole === "ответчика") {
      dispatch(addTodosDefendant({ ...aduf, typeFace }));
      dispatch(
        createEveryIsk({
          todosApplications,
          tokenA,
          action_type: 1,
          aduf,
          typeFace,
          role: 2,
        })
      );
    }
    dispatch(changeLookAddPlaintiff(0));
    dispatch(clearADFF());
    dispatch(clearADUF());
  };
  const changeInput = (e) => {
    e.preventDefault();

    if (e.target.value.includes("'") || e.target.value.includes("`")) {
      return;
    }

    const { name, value } = e.target;

    if (name === "name") {
      const regName = /^[A-Za-zА-Яа-я- ]{0,70}$/;
      if (regName.test(value)) {
        dispatch(changeADUF({ ...aduf, [name]: value }));
      }
    } else if (name === "inn") {
      const allowedCharsRegex = /^[0-9]{0,14}$/;
      if (allowedCharsRegex.test(value)) {
        dispatch(changeADUF({ ...aduf, [name]: value }));
      }
    } else if (name === "numPhone") {
      const numReg = /[0-9+()-]/;
      const filteredValue = value
        .split("")
        .filter((char) => numReg.test(char))
        .join("");
      dispatch(changeADUF({ ...aduf, [name]: filteredValue }));
    } else {
      dispatch(changeADUF({ ...aduf, [name]: value }));
    }
  };

  React.useEffect(() => {
    return () => dispatch(changeTypeFace(1));
  }, []);

  return (
    <>
      <h3>{typerole === "истца" ? "Истец" : "Ответчик"}</h3>
      <form onSubmit={sendData}>
        <div className="twoInputs">
          <div>
            <p>
              Название <b className="required">*</b>
            </p>
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
            <p>
              Номер телефона <b className="required">*</b>
            </p>
            <input
              required
              type="text"
              placeholder="Номер телефона"
              name="numPhone"
              onChange={changeInput}
              value={aduf.numPhone}
            />
          </div>
          <div>
            <p>
              Ваш ИНН <b className="required">*</b>
            </p>
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
            <p>
              ОКПО <b className="required">*</b>
            </p>
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
        <div className="threeInputs two_more">
          <div>
            <p>
              Электронная почта <b className="required">*</b>
            </p>
            <input
              required
              type="email"
              placeholder="Электронная почта"
              name="email"
              onChange={changeInput}
              value={aduf.email}
            />
          </div>
          <div style={{ width: "300px" }}>
            <p>Второй адрес электронной почты</p>
            <input
              type="email"
              placeholder="Второй адрес электронной почты"
              name="email2"
              onChange={changeInput}
              value={aduf.email2}
            />
          </div>
          <div style={{ width: "300px" }}>
            <Selects
              arr={selTypeOrganiz}
              initText={"Вид организационно-правовой нормы"}
              keys={{
                typeKey: aduf.typeOrganization,
                type: "typeOrganization",
              }}
              type="aduf"
              urgently={true}
            />
          </div>
          <DataInput
            props={{
              title: "Дата первичной регистрации",
              nameInput: "dataReg",
              placeholder: "",
              change: changeInput,
              keyData: aduf.dataReg,
              typeChange: "aduf",
              urgently: true,
            }}
          />
          <Selects
            arr={selTypeCompany}
            initText={"Тип компании"}
            keys={{ typeKey: aduf.typeCompany, type: "typeCompany" }}
            type="aduf"
            urgently={true}
          />
        </div>
        {/* <div className="btnsTypeMain">
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
        /////////// */}
        <div className="threeInputs">
          {/* <Selects
            arr={selCountries}
            initText={"Страна"}
            keys={{ typeKey: aduf.country_ur, type: "country_ur" }}
            type="aduf"
          /> */}
          <Selects
            arr={selTypePosition}
            initText={"Должность в компании"}
            keys={{ typeKey: aduf.userStatus, type: "userStatus" }}
            type="aduf"
            urgently={true}
          />
          <DataInput
            props={{
              title: "Дата назначения",
              nameInput: "startData",
              placeholder: "",
              keyData: aduf.startData,
              typeChange: "aduf",
              urgently: true,
            }}
          />
          <DataInput
            props={{
              title: "Дата истечения",
              nameInput: "endData",
              placeholder: "",
              keyData: aduf.endData,
              typeChange: "aduf",
              urgently: true,
            }}
          />
          <div>
            <p>
              ФИО руководителя <b className="required">*</b>
            </p>
            <input
              required
              type="text"
              placeholder="ФИО руководителя"
              name="fioBoss"
              onChange={changeInput}
              value={aduf.fioBoss}
            />
          </div>
          <div className="noneDataInputs"></div>
        </div>
        <div className="threeInputs">
          <Selects
            arr={selCountries}
            initText={"Страна"}
            keys={{ typeKey: aduf.country, type: "country" }}
            type="aduf"
            urgently={true}
          />
          <Selects
            arr={selRegions}
            initText={"Область"}
            keys={{ typeKey: aduf.region, type: "region" }}
            type="aduf"
            urgently={true}
          />
          <Selects
            arr={selDistrict}
            initText={"Район"}
            keys={{ typeKey: aduf.district, type: "district" }}
            type="aduf"
            urgently={true}
          />
          <div>
            <p>
              Город <b className="required">*</b>
            </p>
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
            initText={"Адресный элемент"}
            keys={{ typeKey: aduf.adddreselement, type: "adddreselement" }}
            type="aduf"
            urgently={true}
          />
        </div>

        <div className="threeInputs">
          <div>
            <p>
              Улица <b className="required">*</b>
            </p>
            <input
              required
              type="text"
              placeholder="Улица"
              name="street"
              onChange={changeInput}
              value={aduf.street}
            />
          </div>
          <div>
            <p>
              Номер объекта <b className="required">*</b>
            </p>
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
            <p>
              Буквенный индекс <b className="required">*</b>
            </p>
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
            <p>
              Квартира <b className="required">*</b>
            </p>
            <input
              required
              type="text"
              placeholder="Квартира"
              name="apartament"
              onChange={changeInput}
              value={aduf.apartament}
            />
          </div>
          <div>
            <p>
              Почтовый индекс <b className="required">*</b>
            </p>
            <input
              required
              type="text"
              placeholder="Почтовый индекс"
              name="emailIndex"
              onChange={changeInput}
              value={aduf.emailIndex}
            />
          </div>
        </div>
        <div className="threeInputs">
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
        <div className="btnsSave">
          {checkEditPlaint && (
            <button className="saveBtn" type="submit">
              Добавить
            </button>
          )}
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
    </>
  );
};

export default UrFace;
