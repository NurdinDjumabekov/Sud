////// hooks
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./PlaintiffPage.scss";

////// components
import InputsPlaintiff from "../../components/PlaintiffPage/InputsPlaintiff/InputsPlaintiff";
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

////// fns
import { clearTodosApplications } from "../../store/reducers/applicationsSlice";
import { toTakeTypeTypeDocs } from "../../store/reducers/applicationsSlice";
import { createIdIsk } from "../../store/reducers/sendDocsSlice";
import { setLookTypeRole } from "../../store/reducers/stateSlice";

////// imgs
import kerstImg from "../../asstes/icons/krestik.svg";
import { getCountry } from "../../helpers/getSelects";

const PlaintiffPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState(1);

  // console.log(params, "params");

  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { adff, aduf, docsIsks } = useSelector((state) => state.inputSlice);
  const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);

  //// typeRole 1 - истец, 2 - ответчик
  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: "Истец",
      components: <DataArrPlaintiff typerole={"истца"} typeSide={1} />,
    },
    {
      id: 2,
      name: "Ответчик",
      components: <DataArrPlaintiff typerole={"ответчика"} typeSide={2} />,
    },
    { id: 3, name: "Арбитражный сбор", components: <TargetPlaintiff /> },
    { id: 4, name: "Описание", components: <DescriptionClaim /> },
    { id: 5, name: "Мотивационная часть", components: <MotivationClaim /> },
    { id: 6, name: "Обоснование", components: <Justification /> },
    { id: 7, name: "Финансовый расчет", components: <FinancialResult /> },
    { id: 8, name: "Общая информация", components: <GeneralInfo /> },
    { id: 9, name: "Ссылка на законы", components: <LinksLaw /> },
    { id: 10, name: "Исковые требования", components: <ClaimRequaire /> },
    { id: 11, name: "Приложения", components: <ApplicationFiles /> },
  ]);

  const clickBtn = (id) => {
    setActiveComponent(id);
    //// меняю активную комопненту
    dispatch(setLookTypeRole(0));
    //// закрываю блок, где добавляются личные данные истцов, ответчиков и и х представителей
  };

  useEffect(() => {
    if (params?.id == 0) {
      // 0 = я создаю новый документ, а если не !0, то редактирую документ (это codeid иска)
      dispatch(createIdIsk({ todosApplications, adff, aduf, docsIsks })); /// для того чтобы взть id для создания иска
    }

    getCountry(dispatch);
    ///// для получения и отображения нужных мне значений городов, стран для седектов

    return () => {
      dispatch(clearTodosApplications()); /// для очистки всех обьектов хранения данных
      dispatch(toTakeTypeTypeDocs());
      dispatch(setLookTypeRole(0));
      //// закрываю блок, где добавляются личные данные истцов, ответчиков и и х представителей
    };
  }, []);

  return (
    <div className="plaintiff">
      <div className="navBlock">
        <ul className="btnsType plaintiffTypes">
          {btnList?.map((btn) => (
            <button
              key={btn.id}
              onClick={() => clickBtn(btn?.id)}
              className={
                btn?.id === activeComponent ? "activeBtnsPlaintiff" : ""
              }
            >
              {btn?.id}. {btn?.name}
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
      <InputsPlaintiff btnList={btnList} activeComponent={activeComponent} />
    </div>
  );
};

export default PlaintiffPage;
