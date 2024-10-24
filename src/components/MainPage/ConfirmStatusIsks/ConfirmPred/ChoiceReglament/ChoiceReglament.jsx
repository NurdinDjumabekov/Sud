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
import { parseImageData } from "../../../../../helpers/transformCreateData";

///// components
import Modals from "../../../../Modals/Modals";
import ChoiceArbitrsPred from "../ChoiceArbitrsPred/ChoiceArbitrsPred";

///// icons
import userImg from "../../../../../asstes/icons/plaintiff/fiz_face.svg";
import EditIcon from "../../../../../asstes/icons/MyIcons/EditIcon";

const ChoiceReglament = ({ row, type }) => {
  /// type - 1 истец, 2 - ответчик

  const { codeid } = row;

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false); //////// state для модалки выбора арбитра

  const [modalArbitrs, setModalArbitrs] = useState(false); //// модалка открытия детального просмотра арбитра

  const [dataModalArbitr, setDataModalArbitr] = useState({}); //// для выбора арбитра
  const [arbitrs, setArbitrs] = useState([]); //// список выбранных арбитров

  const { selCountries } = useSelector((state) => state.selectsSlice);
  const { listFilter } = useSelector((state) => state.applicationsSlice);

  const sendArbitrs = async () => {
    const obj = { arbitrs, code_isk: codeid, type };
    const res = await dispatch(choiceArbitrsFN(obj)).unwrap();
    if (res?.result == 1) {
      setArbitrs([]);
      dispatch(toTakeIsksList(listFilter?.[0]?.codeid_filter));
      setModal(false);
    }
  };

  const choiceArbitr = () => {
    setModal(true);
    // setArbitrs(list);
  };

  const list = row?.arbitrs?.filter((i) => i?.type_man == type);

  const checkArbitrs = list?.length == 0; /// if арбитров нет

  return (
    <>
      <td className="table_isk_td actionReglament" style={{ width: 200 }}>
        {checkArbitrs ? (
          <span>
            <button className="choiceBtn" onClick={choiceArbitr}>
              Выбрать арбитров
            </button>
          </span>
        ) : (
          <div className="listArbitrs">
            <div className="listArbitrs__inner">
              {list?.map((i, index) => (
                <span key={index}>
                  {i?.fio_arbitr}
                  {index !== list?.length - 1 && ","}
                </span>
              ))}
            </div>
            <button onClick={choiceArbitr} className="actionBtnEdit">
              <EditIcon width={22} height={22} color={"#222"} />
            </button>
          </div>
        )}
      </td>

      <Modals openModal={modal} setOpenModal={() => setModal()}>
        <ChoiceArbitrsPred
          setDataModalArbitr={setDataModalArbitr}
          setModalArbitrs={setModalArbitrs}
          sendArbitrs={sendArbitrs}
          setArbitrs={setArbitrs}
          arbitrs={arbitrs}
          row={row}
        />
      </Modals>

      {/* ////////для выбора арбитров */}
      <Modals openModal={modalArbitrs} setOpenModal={() => setModalArbitrs()}>
        <div className="moreInfoArbitrs">
          <div className="moreMainData">
            <div className="logoArbitr">
              <img
                src={
                  parseImageData(dataModalArbitr?.photo)
                    ? `http://mttp.333.kg/${parseImageData(
                        dataModalArbitr?.photo
                      )}`
                    : userImg
                }
                alt=""
              />
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
