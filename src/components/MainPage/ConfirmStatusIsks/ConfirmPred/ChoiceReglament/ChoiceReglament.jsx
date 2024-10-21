/////hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

///fns
import {
  choiceArbitrsFN,
  toTakeIsksList,
} from "../../../../../store/reducers/sendDocsSlice";

///////helpers
import { searchNameSelect } from "../../../../../helpers/searchNameSelect";

///// components
import Modals from "../../../../Modals/Modals";
import ChoiceArbitrsPred from "../ChoiceArbitrsPred/ChoiceArbitrsPred";

const ChoiceReglament = ({ row }) => {
  const { codeid } = row;

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false); //////// state для модалки выбора арбитра

  const [modalArbitrs, setModalArbitrs] = useState(false); //// модалка открытия детального просмотра арбитра

  const [dataModalArbitr, setDataModalArbitr] = useState({}); //// для выбора арбитра

  const { arbitrPred } = useSelector((state) => state.stateSlice);
  const { selCountries } = useSelector((state) => state.selectsSlice);
  const { listFilter } = useSelector((state) => state.applicationsSlice);

  const sendArbitrs = async () => {
    setModal(false);
    await dispatch(choiceArbitrsFN({ arbitrPred, code_isk: codeid })).unwrap();
    dispatch(toTakeIsksList(listFilter?.[0]?.codeid_filter));
  };

  const checkArbitrs = row?.arbitrs?.length === 0; /// if арбитров нет

  const checkStatus = row?.isk_status !== 4; /// if иск не отклонен предмедателем

  return (
    <>
      <td className="table_isk_td">
        {checkArbitrs && checkStatus ? (
          <span>
            <button className="choiceBtn" onClick={() => setModal(true)}>
              Выбрать арбитров
            </button>
            <Modals openModal={modal} setOpenModal={() => setModal()}>
              <ChoiceArbitrsPred
                setDataModalArbitr={setDataModalArbitr}
                setModalArbitrs={setModalArbitrs}
                sendArbitrs={sendArbitrs}
              />
            </Modals>
          </span>
        ) : (
          <>
            {row?.arbitrs?.map((i, index) => (
              <span key={index}>
                {i?.fio_arbitr}
                {index !== row.arbitrs.length - 1 && ","}
              </span>
            ))}
          </>
        )}
      </td>

      {/* ////////для выбора арбитров */}
      <Modals openModal={modalArbitrs} setOpenModal={() => setModalArbitrs()}>
        <div className="moreInfoArbitrs">
          <div className="moreMainData">
            <div className="logoArbitr">
              {/* <img src={dataModalArbitr?.photo || userImg} alt="" /> */}
              {/* <img src={userImg} alt="" /> */}
            </div>
            <h5>{dataModalArbitr?.name}</h5>
          </div>
          <div className="moreOtherInfo">
            <h6>{dataModalArbitr?.description}</h6>
            <div>
              <span>Образование:</span>
              <p>{dataModalArbitr?.education}</p>
            </div>
            <div>
              <span>Специализация:</span>
              <p>{dataModalArbitr?.spec}</p>
            </div>
            <div>
              <span>Языки:</span>
              <p>{dataModalArbitr?.language}</p>
            </div>
            <div>
              <span>Страна:</span>
              <p>{searchNameSelect(selCountries, +dataModalArbitr?.gorod)}</p>
            </div>
          </div>
        </div>
      </Modals>
    </>
  );
};

export default ChoiceReglament;
