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
import { useDispatch, useSelector } from "react-redux";
import { changeLookPDF } from "../../../store/reducers/stateSlice";
import Modals from "../../Modals/Modals";
import imsIcon from "../../../asstes/icons/IconPage/archive.svg";

const InputsPlaintiff = () => {
  const dispatch = useDispatch();
  const [indexComp, setIndexComp] = useState(0);
  const [pdfScreen, setPdfScreen] = useState(false);

  const { lookPdf } = useSelector((state) => state.stateSlice);

  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: "Истец",
      bool: true,
      components: <FillingPlaintiff typerole={"истца"} />,
      icon: imsIcon,
    },
    {
      id: 2,
      name: "Ответчик",
      bool: false,
      components: <FillingPlaintiff typerole={"Ответчика"} />,
      icon: imsIcon,
    },
    {
      id: 3,
      name: "Цена иска",
      bool: false,
      components: <TargetPlaintiff />,
      icon: imsIcon,
    },
    {
      id: 4,
      name: "Описание",
      bool: false,
      components: <DescriptionClaim />,
      icon: imsIcon,
    },
    {
      id: 5,
      name: "Мотивационная часть",
      bool: false,
      components: <MotivationClaim />,
      icon: imsIcon,
    },
    {
      id: 6,
      name: "Обоснование",
      bool: false,
      components: <Justification />,
      icon: imsIcon,
    },
    {
      id: 7,
      name: "Финансовый расчет",
      bool: false,
      components: <FinancialResult />,
      icon: imsIcon,
    },
    {
      id: 8,
      name: "Общая информация",
      bool: false,
      components: <GeneralInfo />,
      icon: imsIcon,
    },
    {
      id: 9,
      name: "Ссылка на законы",
      bool: false,
      components: <LinksLaw />,
      icon: imsIcon,
    },
    {
      id: 10,
      name: "Исковые требования",
      bool: false,
      components: <ClaimRequaire />,
      icon: imsIcon,
    },
    {
      id: 11,
      name: "Приложения",
      bool: false,
      components: <ApplicationFiles />,
      icon: imsIcon,
    },
    // {
    //   id: 12,
    //   name: 'Опись документов',
    //   bool: false,
    // },
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
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1530) {
        setPdfScreen(false);
      } else {
        setPdfScreen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(indexComp, 'indexComp');

  return (
    <div className="plaintiffData">
      <ul className="plaintiffData__list">
        {btnList?.map((btn) => (
          <li key={btn.id} className={btn?.bool ? "activeBtnsPlaint" : ""}>
            <img src={btn.icon} alt="icon" onClick={() => clickBtn(btn.id)} />
            <button onClick={() => clickBtn(btn.id)}>{btn.name}</button>
          </li>
        ))}
      </ul>
      <div className="plantiffBlockMain">
        <React.Fragment key={indexComp}>
          {btnList?.[indexComp]?.components}
        </React.Fragment>
        {pdfScreen && (
          <PdfFile typerole={indexComp === 0 ? "Истец" : "Ответчик"} />
        )}
      </div>
      <Modals
        openModal={lookPdf}
        setOpenModal={() => dispatch(changeLookPDF())}
      >
        <PdfFile
          modal={true}
          typerole={indexComp === 0 ? "Истец" : "Ответчик"}
        />
      </Modals>
    </div>
  );
};

export default InputsPlaintiff;
