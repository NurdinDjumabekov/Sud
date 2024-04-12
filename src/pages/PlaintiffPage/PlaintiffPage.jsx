import React, { useState } from "react";
import "./PlaintiffPage.scss";
import InputsPlaintiff from "../../components/PlaintiffPage/InputsPlaintiff/InputsPlaintiff";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLookAddPlaintiff } from "../../store/reducers/stateSlice";
import TargetPlaintiff from "../../components/PlaintiffPage/TargetPlaintiff/TargetPlaintiff";
import DescriptionClaim from "../../components/PlaintiffPage/DescriptionClaim/DescriptionClaim";
import MotivationClaim from "../../components/PlaintiffPage/MotivationClaim/MotivationClaim";
import Justification from "../../components/PlaintiffPage/Justification/Justification";
import FinancialResult from "../../components/PlaintiffPage/FinancialResult/FinancialResult";
import GeneralInfo from "../../components/PlaintiffPage/GeneralInfo/GeneralInfo";
import LinksLaw from "../../components/PlaintiffPage/LinksLaw/LinksLaw";
import ClaimRequaire from "../../components/PlaintiffPage/ClaimRequaire/ClaimRequaire";
import ApplicationFiles from "../../components/PlaintiffPage/ApplicationFiles/ApplicationFiles";
import DataArrPlaintiff from "../../components/PlaintiffPage/DataArrPlaintiff/DataArrPlaintiff";
import {
  clearTodosApplications,
  toTakeTypeTypeDocs,
} from "../../store/reducers/applicationsSlice";
import { createIdIsk } from "../../store/reducers/sendDocsSlice";
import kerstImg from "../../asstes/icons/krestik.svg";
import { clearADFF, clearADUF } from "../../store/reducers/inputSlice";

const PlaintiffPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [indexComp, setIndexComp] = useState(0);
  const [lookInnerType, setLookInnerType] = useState(true);

  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { adff, aduf, docsIsks } = useSelector((state) => state.inputSlice);
  const { tokenA, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );

  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: "Истец",
      bool: true,
      components: <DataArrPlaintiff typerole={"истца"} />,
    },
    {
      id: 2,
      name: "Ответчик",
      bool: false,
      components: <DataArrPlaintiff typerole={"ответчика"} />,
    },
    {
      id: 3,
      name: "Арбитражный сбор",
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

    /// очищаю fiz and ur face при переходе критерий заполнения
    dispatch(clearADFF());
    dispatch(clearADUF());
  };

  React.useEffect(() => {
    if (todosApplications.codeid === 0) {
      // 0 = я создаю новый документ, а если не !0, то редактирую документ
      dispatch(
        createIdIsk({ todosApplications, tokenA, adff, aduf, docsIsks })
      ); /// для того чтобы взть id для создания иска
    }
    return () => {
      dispatch(clearTodosApplications());
      dispatch(toTakeTypeTypeDocs(tokenA));
    };
  }, []);

  const clickBtns = (id) => {
    clickBtn(id);
    dispatch(changeLookAddPlaintiff(0));
  };

  return (
    <div className="plaintiff">
      <div className="navBlock">
        <ul className="btnsType plaintiffTypes">
          {btnList?.map((btn) => (
            <button
              key={btn.id}
              onClick={() => clickBtns(btn?.id)}
              className={btn?.bool ? "activeBtnsPlaintiff" : ""}
            >
              {btn.id}. {btn.name}
            </button>
          ))}
        </ul>
        {!checkEditPlaint && (
          <div className="cloused">
            <button onClick={() => navigate(-1)}>
              <img src={kerstImg} alt="x" />
            </button>
          </div>
        )}
      </div>
      <InputsPlaintiff btnList={btnList} indexComp={indexComp} />
    </div>
  );
};

export default PlaintiffPage;
