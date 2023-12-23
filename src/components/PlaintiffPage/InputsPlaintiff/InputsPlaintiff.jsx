import React, { useState } from "react";
import "./InputsPlaintiff.scss";
import FillingPlaintiff from "../FillingPlaintiff/FillingPlaintiff";
import TargetPlaintiff from "../TargetPlaintiff/TargetPlaintiff";
import DescriptionClaim from "../DescriptionClaim/DescriptionClaim";
import MotivationClaim from "../MotivationClaim/MotivationClaim";
import Justification from "../Justification/Justification";
import FinancialResult from "../FinancialResult/FinancialResult";
import GeneralInfo from "../GeneralInfo/GeneralInfo";
import LinksLaw from "../LinksLaw/LinksLaw";
import ClaimRequaire from "../ClaimRequaire/ClaimRequaire";
import ApplicationFiles from "../ApplicationFiles/ApplicationFiles";
import PdfFile from "../../PdfFile/PdfFile";

const InputsPlaintiff = () => {
  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: "Истец",
      bool: true,
      components: <FillingPlaintiff typerole={"истца"} />,
    },
    {
      id: 2,
      name: "Ответчик",
      bool: false,
      components: <FillingPlaintiff typerole={"Ответчика"} />,
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
    // {
    //   id: 12,
    //   name: 'Опись документов',
    //   bool: false,
    // },
  ]);

  const [indexComp, setIndexComp] = useState(0);

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
  };

  return (
    <div className="plaintiffData">
      <ul className="plaintiffData__list">
        {btnList?.map((btn) => (
          <li key={btn.id}>
            <button
              className={btn?.bool ? "activeBtns" : ""}
              onClick={() => clickBtn(btn.id)}
            >
              {btn.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="plantiffBlockMain">
        <React.Fragment key={indexComp}>
          {btnList?.[indexComp]?.components}
        </React.Fragment>
        <PdfFile />
      </div>
    </div>
  );
};

export default InputsPlaintiff;
