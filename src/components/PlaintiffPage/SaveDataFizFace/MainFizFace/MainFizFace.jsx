//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import "./style.scss";

///// fns
import { changeADFF } from "../../../../store/reducers/inputSlice";
import { createEveryIsk } from "../../../../store/reducers/sendDocsSlice";
import { changeAlertText } from "../../../../store/reducers/typesSlice";

////// components
import MyInput from "../../../../common/MyInput/MyInput";
import PassportDataFizFace from "../PassportDataFizFace/PassportDataFizFace";
import AddresFizFace from "../AddresFizFace/AddresFizFace";

/////// helpers
import { clearAllFace } from "../../../../helpers/clear";
import { objSidesAndRoles } from "../../../../helpers/localData";

const FizFace = ({ typeSide }) => {
  const dispatch = useDispatch();

  const { adff, typeFace } = useSelector((state) => state.inputSlice);
  const { lookTypeRole } = useSelector((state) => state.stateSlice); ///истец(1) или ответчик(2)
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);
  //// check - для проверки редактирования

  const key = `${typeSide}_${lookTypeRole}`;
  const role = objSidesAndRoles?.[key]?.num; /// 1 из 4 ролей выбирается

  const checkData = () => {
    //// отправка запроса для выбора роли

    dispatch(createEveryIsk({ todosApplications, adff, typeFace, role }));
    /// action_type 1 - создание , 2 - редактирование
    cancel();
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

  const cancel = () => clearAllFace(dispatch);
  ///// очищаю все state для всех лиц

  return (
    <div className="addPlaintiffFiz">
      <h3>{objSidesAndRoles?.[key]?.text}</h3>
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
          <button className="saveBtn" type="submit">
            Добавить
          </button>
          <span className="saveBtn moreBtn" onClick={cancel}>
            Отмена
          </span>
        </div>
      </form>
    </div>
  );
};

export default FizFace;
