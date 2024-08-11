/// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/// style
import "./style.scss";

// components
import Selects from "../../../Selects/Selects";
import DataInput from "../../DataInput/DataInput";
import MyInput from "../../../../common/MyInput/MyInput";
import AddresUrFace from "../AddresUrFace/AddresUrFace";

/// fns
import { changeADUF } from "../../../../store/reducers/inputSlice";
import { clearADFF, clearADUF } from "../../../../store/reducers/inputSlice";
import { changeLookAddPlaintiff } from "../../../../store/reducers/stateSlice";
import { createEveryIsk } from "../../../../store/reducers/sendDocsSlice";
import { changeAlertText } from "../../../../store/reducers/typesSlice";

const UrFace = ({ typerole }) => {
  const dispatch = useDispatch();

  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { aduf, typeFace } = useSelector((state) => state.inputSlice);
  const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);

  const { selTypeOrganiz, selTypeCompany } = useSelector(
    (state) => state.selectsSlice
  );
  const { selTypePosition } = useSelector((state) => state.selectsSlice);

  const sendData = (e) => {
    e.preventDefault();

    if (aduf?.typeOrganization === 0) {
      const text = "Заполните вид организационно-правовой нормы";
      return dispatch(changeAlertText(text));
    }
    if (aduf?.dataReg === "") {
      return dispatch(changeAlertText("Заполните дату первичной регистрации"));
    }
    if (aduf?.typeCompany === 0) {
      return dispatch(changeAlertText("Заполните тип компании"));
    }
    if (aduf?.country === 0) {
      return dispatch(changeAlertText("Выберите страну"));
    }
    if (aduf?.userStatus === 0) {
      return dispatch(changeAlertText("Заполните должность компании"));
    }
    if (aduf?.startData === "") {
      return dispatch(changeAlertText("Заполните дату назначения"));
    }
    if (aduf?.endData === 0) {
      return dispatch(changeAlertText("Заполните дату истечения"));
    }
    if (aduf?.region === 0) {
      return dispatch(changeAlertText("Выберите область"));
    }
    if (aduf?.district === 0) {
      return dispatch(changeAlertText("Выберите район"));
    }
    if (aduf?.adddreselement === 0) {
      return dispatch(changeAlertText("Выберите адресный элемент"));
    }

    checkData();
  };

  const checkData = () => {
    const role = typerole === "истца" ? 1 : 2;
    const obj = { todosApplications, action_type: 1 }; ///
    const objMore = { aduf, typeFace, role };

    dispatch(createEveryIsk({ ...obj, ...objMore }));
    cancel();
  };

  const changeInput = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (value.includes("'") || value.includes("`")) return;

    let filteredValue = value;

    if (name === "name") {
      const regName = /^[A-Za-zА-Яа-я- ]{0,70}$/;
      if (!regName.test(value)) return;
    } else if (name === "inn") {
      const allowedCharsRegex = /^[0-9]{0,14}$/;
      if (!allowedCharsRegex.test(value)) return;
    } else if (name === "numPhone") {
      filteredValue = value.replace(/[^0-9+()-]/g, "");
    }

    dispatch(changeADUF({ ...aduf, [name]: filteredValue }));
  };

  const cancel = () => {
    dispatch(changeLookAddPlaintiff(0));
    dispatch(clearADFF());
    dispatch(clearADUF());
  };

  return (
    <>
      <h3>{typerole === "истца" ? "Истец" : "Ответчик"}</h3>
      <form onSubmit={sendData} className="urFaceForm">
        <div className="mainUrFace">
          <MyInput
            changeInput={changeInput}
            title={"Название"}
            value={aduf?.name}
            name={"name"}
            placeholder={"Название"}
            required={true}
          />

          <MyInput
            changeInput={changeInput}
            title={"Номер телефона"}
            value={aduf?.numPhone}
            name={"numPhone"}
            placeholder={"Номер телефона"}
            required={true}
          />

          <MyInput
            changeInput={changeInput}
            title={"Ваш ИНН"}
            value={aduf?.inn}
            name={"inn"}
            placeholder={"ИНН"}
            required={true}
          />

          <MyInput
            changeInput={changeInput}
            title={"ОКПО"}
            value={aduf?.okpo}
            name={"okpo"}
            placeholder={
              "Общереспубликанский Классификатор Предприятий и Организаций"
            }
            required={true}
          />
        </div>

        <div className="emails">
          <MyInput
            changeInput={changeInput}
            type={"email"}
            title={"Электронная почта"}
            value={aduf?.email}
            name={"email"}
            placeholder={"Электронная почта"}
          />

          <MyInput
            changeInput={changeInput}
            type={"email"}
            title={"Второй адрес электронной почты"}
            value={aduf?.email2}
            name={"email2"}
            placeholder={"Второй адрес электронной почты"}
          />

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
              keyData: aduf?.dataReg,
              typeChange: "aduf",
              urgently: true,
            }}
          />

          <Selects
            arr={selTypeCompany}
            initText={"Тип компании"}
            keys={{ typeKey: aduf?.typeCompany, type: "typeCompany" }}
            type="aduf"
            urgently={true}
          />
        </div>

        <div className="threeInputs">
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

          <MyInput
            changeInput={changeInput}
            title={"ФИО руководителя"}
            value={aduf?.fioBoss}
            name={"fioBoss"}
            placeholder={"ФИО руководителя"}
          />

          <div className="noneDataInputs"></div>
        </div>

        <AddresUrFace changeInput={changeInput} />

        <div className="btnsSave">
          {checkEditPlaint && (
            <button className="saveBtn" type="submit">
              Добавить
            </button>
          )}
          <span className="saveBtn moreBtn" onClick={cancel}>
            Отмена
          </span>
        </div>
      </form>
    </>
  );
};

export default UrFace;
