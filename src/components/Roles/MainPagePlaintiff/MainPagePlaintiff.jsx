import "./MainPagePlaintiff.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toTakeIsksList } from "../../../store/reducers/sendDocsSlice";
import {
  changeIdStatus,
  changeLookChangeDeleteIsks,
  changeLookChangeStatus,
  changeMainBtnList,
} from "../../../store/reducers/stateSlice";
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import { editIsks } from "../../../store/reducers/applicationsSlice";

import editImg from "../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../asstes/icons/deleteBtn.svg";
import sendImg from "../../../asstes/icons/goodSend.svg";

import { plaintiffHeaders } from "../../../helpers/dataArr";

//// componets
import TimerRevers from "../../../components/Timers/TimerRevers/TimerRevers";
import LookPdfModal from "../../../components/PdfFile/LookPdfModal/LookPdfModal";

const MainPagePlaintiff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { mainBtnList } = useSelector((state) => state.stateSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);
  const { selCurrency, selReglament } = useSelector(
    (state) => state.selectsSlice
  );

  const clickBtn = (id) => {
    const newList = mainBtnList?.map((item) => {
      return {
        ...item,
        bool: id === item.id ? true : false,
      };
    });
    dispatch(toTakeIsksList({ tokenA, id })); /// запрос для получения списка
    dispatch(changeMainBtnList(newList));
  };

  const changeStatus = (id) => {
    dispatch(changeLookChangeStatus(true)); /// для вызова модалки изменения статуса иска
    dispatch(changeIdStatus(id)); /// для отправки id иска
  };

  const editIsksFn = (id) => {
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
  };

  const deleteIsksFn = (id) => {
    dispatch(changeLookChangeDeleteIsks(true));
    dispatch(changeIdStatus(id));
  };

  const statusMessages = {
    1: "Принят ответственным секретарём",
    2: "Отклонён ответственным секретарём",
    3: "Принят председателем",
    4: "Отклонён председателем",
    5: "Принят председателем",
  };

  return (
    <div className="mainTables">
      <ul className="choice__plaintiff">
        {mainBtnList?.slice(5, 10)?.map((btn) => (
          <li key={btn.id}>
            <button
              className={btn?.bool ? "activeBtnsPlaintiff" : ""}
              style={{ margin: "0px 10px 0 5px" }}
              onClick={() => clickBtn(btn.id)}
            >
              {btn.name} [{btn?.count}]
            </button>
          </li>
        ))}
      </ul>
      <div className="main_tabla_isk">
        <table className="table_isk">
          <thead>
            <tr>
              {plaintiffHeaders?.map((i) => (
                <th key={i} className="table_isk_th">
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tbody_isk">
            {listTodos?.map((row, index) => (
              <tr
                key={index}
                className={`${+index % 2 === 0 ? "colorWhite" : "colorGray"}`}
              >
                <td className="table_isk_td">
                  <div>
                    <span>{row?.isk_number && `№ ${row.isk_number}`}</span>
                  </div>
                </td>
                <td className="table_isk_td">
                  <span>{row?.isk_date}</span>
                  <span>{row?.isk_time}</span>
                </td>
                <td className="table_isk_td">
                  {row?.plaintiff?.length !== 0 && (
                    <>
                      {row.plaintiff.map((i, index) => (
                        <span key={index}>
                          {i.name}
                          {index !== row.plaintiff.length - 1 && ","}
                        </span>
                      ))}
                    </>
                  )}
                </td>
                <td className="table_isk_td">
                  {row?.defendant?.length !== 0 && (
                    <>
                      {row?.defendant?.map((i, index) => (
                        <span key={index}>
                          {i.name}
                          {index !== row.defendant.length - 1 && ","}
                        </span>
                      ))}
                    </>
                  )}
                </td>
                {/* ///////////////////////////////////// */}
                <td className="table_isk_td">
                  {+row?.arbitr_fee !== 0 && (
                    <span>
                      {row?.arbitr_fee}{" "}
                      {searchNameSelect(selCurrency, +row?.arbitr_curr)}
                    </span>
                  )}
                </td>
                <td className="table_isk_td">
                  <span>
                    {+row?.reglament !== 0 && (
                      <>{searchNameSelect(selReglament, +row?.reglament)}</>
                    )}
                  </span>
                </td>
                <td className="table_isk_td">
                  {row?.arbitrs?.length !== 0 &&
                    row?.arbitrs?.map((i) => <span>{i?.name}</span>)}
                </td>
                <td className="table_isk_td">
                  <span>{row.secretary || ""}</span>
                </td>
                <td className="table_isk_td">
                  {+row?.status === 1 ? (
                    <span className="activePlaint">Активен</span>
                  ) : (
                    <span className="noActivePlaint">Черновик</span>
                  )}
                </td>
                <td className="table_isk_td">
                  {+row?.status === 0 ? (
                    <div className="statusIsks">
                      <button onClick={() => changeStatus(row?.codeid)}>
                        {/* Подать */}
                        <img src={sendImg} alt="sendImg" />
                      </button>
                      <button onClick={() => editIsksFn(row?.codeid)}>
                        {/* Редактировать */}
                        <img src={editImg} alt="sendImg" />
                      </button>
                      <button onClick={() => deleteIsksFn(row?.codeid)}>
                        {/* Удалить */}
                        <img src={deleteImg} alt="sendImg" />
                      </button>
                    </div>
                  ) : (
                    <>
                      {statusMessages[row?.isk_status] && (
                        <span
                          style={{ padding: "0px 0px 0px 10px" }}
                          className={
                            +row?.isk_status === 3 ||
                            +row?.isk_status === 5 ||
                            +row?.isk_status === 1
                              ? "colorStatusGreen"
                              : +row?.isk_status === 2 || +row?.isk_status === 4
                              ? "colorStatusRed"
                              : ""
                          }
                        >
                          {statusMessages[row?.isk_status]}
                        </span>
                      )}
                      {!statusMessages[row?.isk_status] && (
                        <span style={{ padding: "0px 0px 0px 10px" }}>
                          Иск подан
                        </span>
                      )}
                    </>
                  )}
                </td>
                <td className="table_isk_td">
                  {+row?.status !== 0 && (
                    <>
                      {(+row?.isk_status === 0 ||
                        +row?.isk_status === 1 ||
                        +row?.isk_status === 5) && (
                        <TimerRevers days={row?.isk_date} time={row.isk_time} />
                      )}
                    </>
                  )}
                </td>
                <td className="table_isk_td">
                  <span className="documentBlock">
                    {row?.files?.length !== 0 && (
                      <div className="docsBlock">
                        {row?.files?.map((pdf) => (
                          <LookPdfModal pdf={pdf} key={pdf?.codeid} />
                        ))}
                      </div>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainPagePlaintiff;
