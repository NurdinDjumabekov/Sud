import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import "./style.scss";

///// fns
import { changeADFF } from "../../../../store/reducers/inputSlice";
import { clearADFF } from "../../../../store/reducers/inputSlice";
import { clearADUF } from "../../../../store/reducers/inputSlice";
import { changeLookAddPlaintiff } from "../../../../store/reducers/stateSlice";
import { createEveryIsk } from "../../../../store/reducers/sendDocsSlice";
import { changeAlertText } from "../../../../store/reducers/typesSlice";

////// components
import MyInput from "../../../../common/MyInput/MyInput";
import PassportDataFizFace from "../PassportDataFizFace/PassportDataFizFace";
import AddresFizFace from "../AddresFizFace/AddresFizFace";

const FizFace = ({ typerole }) => {
  const dispatch = useDispatch();

  const { adff, typeFace } = useSelector((state) => state.inputSlice);
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);

  const sendData = (e) => {
    e.preventDefault();

    if (adff?.dob === "" && adff?.unknownDob === 0) {
      return dispatch(changeAlertText("Заполните дату рождения"));
    }

    if (adff?.timePassportStart === "" && adff?.unknownDataPassport === 0) {
      return dispatch(changeAlertText("Заполните дату выдачи паспорта"));
    }

    if (adff?.country === 0) {
      return dispatch(changeAlertText("Выберите страну проживания"));
    }

    if (adff?.region === 0) {
      return dispatch(changeAlertText("Выберите область"));
    }

    if (adff?.adddreselement === 0) {
      return dispatch(changeAlertText("Выберите адресный элемент"));
    }

    checkData();
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
    cancel();
  };

  const addData = (type) => {
    dispatch(createEveryIsk({ todosApplications, adff, typeFace, role: type }));
    /// action_type 1 - создание , 2 - редактирование
  };

  const changeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Проверка на наличие одинарных или обратных кавычек
    if (value.includes("'") || value.includes("`")) return;

    let filteredValue = value;

    if (name === "name") {
      const regName = /^[A-Za-zА-Яа-я- ]{0,70}$/;
      if (!regName.test(value)) return;
    } else if (name === "inn") {
      const innRegex = /^[0-9]{0,14}$/;
      if (!innRegex.test(value)) return;
    } else if (name === "numPhone") {
      filteredValue = value.replace(/[^0-9+()-]/g, "");
    }

    dispatch(changeADFF({ ...adff, [name]: filteredValue }));
  };

  const cancel = () => {
    /// отмена
    dispatch(changeLookAddPlaintiff(0));
    /// 1 - тип истец, представ. истца, 2 - ответчик, предст. ответчика
    dispatch(clearADFF());
    dispatch(clearADUF());
    //// очищаю state где хрпанятся данные
  };

  console.log(adff, "adff");

  const role =
    lookAddPlaintiff === 1
      ? typerole === "истца"
        ? "Истец"
        : "Ответчик"
      : `Представитель ${typerole}`;

  return (
    <div className="addPlaintiffFiz">
      <h3>{role}</h3>
      <form onSubmit={sendData}>
        <div className="twoInputs">
          <MyInput
            changeInput={changeInput}
            title={"Ваше ФИО"}
            value={adff?.name}
            name={"name"}
            placeholder={"ФИО"}
            required={true}
          />

          <MyInput
            changeInput={changeInput}
            title={"Ваш номер телефона"}
            value={adff?.numPhone}
            name={"numPhone"}
            placeholder={"Телефон*"}
          />

          <MyInput
            type={"email"}
            placeholder={"Электронная почта"}
            changeInput={changeInput}
            title={"Ваша электронная почта"}
            value={adff?.email}
            name={"email"}
          />

          <MyInput
            title={"Ваш второй адрес электронной почты"}
            type={"email"}
            placeholder={"Электронная почта"}
            changeInput={changeInput}
            value={adff?.email2}
            name={"email2"}
          />
        </div>
        {/* //// данные паспорта */}
        <PassportDataFizFace changeInput={changeInput} />
        <AddresFizFace changeInput={changeInput} />
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
    </div>
  );
};

export default FizFace;
