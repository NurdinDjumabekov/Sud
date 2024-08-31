/// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/// style
import "./style.scss";

// components
import DataInput from "../../DataInput/DataInput";
import MyInput from "../../../../common/MyInput/MyInput";
import AddresUrFace from "../AddresIpFace/AddresIpFace";

/// fns
import { changeADIF } from "../../../../store/reducers/inputSlice";
import { createEveryIsk } from "../../../../store/reducers/sendDocsSlice";
import { changeAlertText } from "../../../../store/reducers/typesSlice";
import { clearAllFace } from "../../../../helpers/clear";

const MainIpFace = ({ typeSide }) => {
  const dispatch = useDispatch();

  const objSide = { 1: "Истец", 2: "Ответчик" };

  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { adif, typeFace } = useSelector((state) => state.inputSlice);

  const sendData = (e) => {
    e.preventDefault();

    if (adif?.typeOrganization === 0) {
      const text = "Заполните вид организационно-правовой нормы";
      return dispatch(changeAlertText(text));
    }
    if (adif?.dataReg === "") {
      return dispatch(changeAlertText("Заполните дату первичной регистрации"));
    }
    if (adif?.country === 0) {
      return dispatch(changeAlertText("Выберите страну"));
    }
    if (adif?.userStatus === 0) {
      return dispatch(changeAlertText("Заполните должность компании"));
    }
    if (adif?.region === 0) {
      return dispatch(changeAlertText("Выберите область"));
    }

    if (adif?.adddreselement === 0) {
      return dispatch(changeAlertText("Выберите адресный элемент"));
    }

    checkData();
  };

  const checkData = () => {
    const obj = { todosApplications, action_type: 1, role: typeSide }; /// 1 - создание
    const senData = { adif, typeFace };

    dispatch(createEveryIsk({ ...obj, ...senData }));
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

    dispatch(changeADIF({ ...adif, [name]: filteredValue }));
  };

  const cancel = () => clearAllFace(dispatch);
  ///// очищаю все state для всех лиц

  return (
    <>
      <h3>{objSide?.[typeSide]}</h3>
      <form onSubmit={sendData} className="urFaceForm">
        <div className="mainUrFace">
          <MyInput
            changeInput={changeInput}
            title={"ФИО"}
            value={adif?.name}
            name={"name"}
            placeholder={"Название"}
            required={true}
          />

          <MyInput
            changeInput={changeInput}
            title={"Номер телефона"}
            value={adif?.numPhone}
            name={"numPhone"}
            placeholder={"Номер телефона"}
          />

          <MyInput
            changeInput={changeInput}
            title={"Ваш ИНН"}
            value={adif?.inn}
            name={"inn"}
            placeholder={"ИНН"}
            required={true}
          />

          <MyInput
            changeInput={changeInput}
            title={"ОКПО"}
            value={adif?.okpo}
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
            value={adif?.email}
            name={"email"}
            placeholder={"Электронная почта"}
          />

          <MyInput
            changeInput={changeInput}
            type={"email"}
            title={"Второй адрес электронной почты"}
            value={adif?.email2}
            name={"email2"}
            placeholder={"Второй адрес электронной почты"}
          />

          <DataInput
            props={{
              title: "Дата регистрации ИП",
              nameInput: "startData",
              placeholder: "",
              keyData: adif?.startData,
              typeChange: "adif",
            }}
          />
          <DataInput
            props={{
              title: "Дата истечения ИП",
              nameInput: "endData",
              placeholder: "",
              keyData: adif?.endData,
              typeChange: "adif",
            }}
          />

          <MyInput
            changeInput={changeInput}
            title={"ФИО руководителя"}
            value={adif?.fioBoss}
            name={"fioBoss"}
            placeholder={"ФИО руководителя"}
          />
        </div>

        <AddresUrFace changeInput={changeInput} />

        <div className="btnsSave">
          <button className="saveBtn" type="submit">
            Добавить
          </button>
          <span className="saveBtn moreBtn" onClick={cancel}>
            Отмена
          </span>
        </div>
      </form>
    </>
  );
};

export default MainIpFace;
