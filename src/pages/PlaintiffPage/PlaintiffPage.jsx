import React, { useState } from "react";
import "./PlaintiffPage.scss";
import InputsPlaintiff from "../../components/PlaintiffPage/InputsPlaintiff/InputsPlaintiff";
import { useNavigate } from "react-router-dom";
import krestik from "../../asstes/icons/krestik.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLookAddPlaintiff,
  changeLookPDF,
} from "../../store/reducers/stateSlice";
import FillingPlaintiff from "../../components/PlaintiffPage/FillingPlaintiff/FillingPlaintiff";
import TargetPlaintiff from "../../components/PlaintiffPage/TargetPlaintiff/TargetPlaintiff";
import DescriptionClaim from "../../components/PlaintiffPage/DescriptionClaim/DescriptionClaim";
import MotivationClaim from "../../components/PlaintiffPage/MotivationClaim/MotivationClaim";
import Justification from "../../components/PlaintiffPage/Justification/Justification";
import FinancialResult from "../../components/PlaintiffPage/FinancialResult/FinancialResult";
import GeneralInfo from "../../components/PlaintiffPage/GeneralInfo/GeneralInfo";
import LinksLaw from "../../components/PlaintiffPage/LinksLaw/LinksLaw";
import ClaimRequaire from "../../components/PlaintiffPage/ClaimRequaire/ClaimRequaire";
import ApplicationFiles from "../../components/PlaintiffPage/ApplicationFiles/ApplicationFiles";
//// imgs
import imsIcon from "../../asstes/icons/IconPage/archive.svg";
import plaintiffs from "../../asstes/icons/plaintiff/plaintiff.svg";
import many from "../../asstes/icons/plaintiff/many.svg";
import description from "../../asstes/icons/plaintiff/description.svg";
import DataArrPlaintiff from "../../components/PlaintiffPage/DataArrPlaintiff/DataArrPlaintiff";
import { checkDataIsks } from "../../helpers/checkDataIsks";
import { clearTodosApplications } from "../../store/reducers/applicationsSlice";
//// delete

const PlaintiffPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [typePlantiff, setTypePlantiff] = useState(false);
  const [indexComp, setIndexComp] = useState(0);
  const [lookInnerType, setLookInnerType] = useState(true);

  const { adff, typeFace } = useSelector((state) => state.inputSlice);
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: "Истец",
      bool: true,
      components: (
        <DataArrPlaintiff arr={todosApplications} typerole={"истца"} />
      ),
    },
    {
      id: 2,
      name: "Ответчик",
      bool: false,
      components: (
        <DataArrPlaintiff arr={todosApplications} typerole={"ответчика"} />
      ),
    },
    {
      id: 3,
      name: "Цена иска",
      bool: false,
      components: <TargetPlaintiff />,
    },
    {
      id: 4,
      name: "Описание",
      bool: false,
      components: <DescriptionClaim />,
    },
    {
      id: 5,
      name: "Мотивационная часть",
      bool: false,
      components: <MotivationClaim />,
    },
    {
      id: 6,
      name: "Обоснование",
      bool: false,
      components: <Justification />,
    },
    {
      id: 7,
      name: "Финансовый расчет",
      bool: false,
      components: <FinancialResult />,
    },
    {
      id: 8,
      name: "Общая информация",
      bool: false,
      components: <GeneralInfo />,
    },
    {
      id: 9,
      name: "Ссылка на законы",
      bool: false,
      components: <LinksLaw />,
    },
    {
      id: 10,
      name: "Исковые требования",
      bool: false,
      components: <ClaimRequaire />,
    },
    {
      id: 11,
      name: "Приложения",
      bool: false,
      components: <ApplicationFiles />,
    },
  ]);

  const clickBtn = (id) => {
    const newList = btnList.map((item) => {
      return {
        ...item,
        bool: id === item.id ? true : false,
      };
    });

    setBtnList(newList);
    const activeIndex = newList.findIndex((item) => item.bool);
    setIndexComp(activeIndex);
    if (id === 1) {
      setLookInnerType(!lookInnerType);
    } else {
      setLookInnerType(false);
    }
  };

  const saveData = () => {
    if (checkDataIsks(todosApplications)) {
      navigate("/mainPlaintiff");
      alert("Ваши данные успешно сохранены");
      dispatch(clearTodosApplications());
    } else {
      alert("Нету заполненных полей!");
    }
  };
  console.log(todosApplications, "todosApplications");

  return (
    <div className="plaintiff">
      {/* <button onClick={() => navigate(-1)} className="prevBtn">
        <img src={krestik} alt="x" />
      </button> */}
      {/* /// delete */}
      <div className="sadasdasdas">
        <button className="activeBtnsPlaintiff" onClick={saveData}>
          Сохранить весь документ
        </button>
        <ul className="btnsType plaintiffTypes">
          {btnList?.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                clickBtn(btn.id);
                dispatch(changeLookAddPlaintiff(0));
              }}
              className={btn?.bool ? "activeBtnsPlaintiff" : ""}
            >
              {btn.name}
            </button>
          ))}
        </ul>
      </div>
      {/* <div className="plaintiff__type">
        <div>
          <button
            onClick={() => dispatch(changeLookPDF(true))}
            className="btnResult"
          >
            Посмотреть результат
          </button>
        </div>
      </div> */}
      {/* /// для адаптивки */}
      <InputsPlaintiff btnList={btnList} indexComp={indexComp} />
    </div>
  );
};

export default PlaintiffPage;
