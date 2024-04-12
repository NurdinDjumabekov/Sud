import React, { useState } from "react";
import "./MainPageRS.scss";
import { useDispatch, useSelector } from "react-redux";
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import LookPdfModal from "../../PdfFile/LookPdfModal/LookPdfModal";
import { editIsks } from "../../../store/reducers/applicationsSlice";
import { useNavigate } from "react-router-dom";
import {
  changeIdStatus,
  changeLookChangeDeleteIsks,
  changeLookChangeStatus,
  changeMainBtnList,
} from "../../../store/reducers/stateSlice";
import { toTakeIsksList } from "../../../store/reducers/sendDocsSlice";
import ConfirmStatus from "../../ConfirmStatus/ConfirmStatus";
import { changeCheckEditPlaint } from "../../../store/reducers/saveDataSlice";
////// imgs
import fullfiled from "../../../asstes/icons/goodSend.svg";
import reject from "../../../asstes/icons/krestik.svg";
import TimerRevers from "../../Timers/TimerRevers/TimerRevers";
import redone from "../../../asstes/images/redone1.png";
import editImg from "../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../asstes/icons/deleteBtn.svg";
import sendImg from "../../../asstes/icons/goodSend.svg";
import { respSecrHeaders } from "../../../helpers/dataArr";

export const MainPageRS = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList, todosApplications } = useSelector(
    (state) => state.applicationsSlice
  );
  const { mainBtnList } = useSelector((state) => state.stateSlice);
  const { selCurrency, selReglament } = useSelector(
    (state) => state.selectsSlice
  );

  const [sendStatusIsk, setSendStatusIsk] = useState(false);
  const [istype, setIsType] = useState({ type: 0, id: 0 }); // 1- подтвердить, 2 - отклонить

  const clickBtn = (id) => {
    const newList = mainBtnList.map((item) => {
      return {
        ...item,
        bool: id === item.id ? true : false,
      };
    });
    dispatch(toTakeIsksList({ tokenA, id })); /// запрос для получения списка
    dispatch(changeMainBtnList(newList));
  };

  const lookIsksFn = (obj) => {
    if (+obj.status === 1) {
      dispatch(
        editIsks({ id: obj?.codeid, tokenA, navigate, applicationList })
      );
      dispatch(changeCheckEditPlaint(false)); /// запрет на редактирование
    }
  };

  const lookIsks = (id, type) => {
    setSendStatusIsk(true);
    changeStatusIsks(id, type);
    dispatch(
      editIsks({
        id,
        tokenA,
        applicationList,
      })
    );
  };

  const changeStatusIsks = (id, status) => {
    setSendStatusIsk(true);
    setIsType({ type: status, id });
  };

  const statusMessages = {
    1: "Отправлено председателю",
    2: "Отклонён ответственным секретарём",
    3: "Принят председателем",
    4: "Отклонён председателем",
    5: "Принят председателем",
  };

  const changeStatus = (id) => {
    dispatch(changeLookChangeStatus(true)); /// для вызова модалки изменения статуса иска
    dispatch(changeIdStatus(id)); /// для отправки id иска
  };

  const editIsksFn = (id) => {
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
    dispatch(changeCheckEditPlaint(true));
  };

  const deleteIsksFn = (id) => {
    dispatch(changeLookChangeDeleteIsks(true));
    dispatch(changeIdStatus(id));
  };

  return (
    <>
      <div className="mainTables">
        <ul className="choice__plaintiff">
          {mainBtnList?.slice(0, 5)?.map((btn, ind) => (
            <li key={btn.id}>
              <button
                className={btn?.bool ? "activeBtnsPlaintiff" : ""}
                onClick={() => clickBtn(btn?.id)}
                style={ind === 0 ? { marginLeft: "0px" } : {}}
              >
                {btn?.name} [{btn?.count || 0}]
              </button>
            </li>
          ))}
        </ul>
        <div className="main_tabla_isk">
          <table className="table_isk">
            <thead>
              <tr>
                {respSecrHeaders?.map((i) => (
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
                  <td className="table_isk_td" onClick={() => lookIsksFn(row)}>
                    <div>
                      <span className="span_teble">
                        <span>{row?.isk_number && `№ ${row.isk_number}`}</span>
                      </span>
                    </div>
                  </td>
                  <td className="table_isk_td" onClick={() => lookIsksFn(row)}>
                    <span>{row?.isk_date}</span>
                    <span>{row?.isk_time}</span>
                  </td>
                  <td className="table_isk_td" onClick={() => lookIsksFn(row)}>
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
                  <td className="table_isk_td" onClick={() => lookIsksFn(row)}>
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
                  <td className="table_isk_td" onClick={() => lookIsksFn(row)}>
                    {+row?.arbitr_fee !== 0 && (
                      <span>
                        {row?.arbitr_fee}{" "}
                        {searchNameSelect(selCurrency, +row?.arbitr_curr)}
                      </span>
                    )}
                  </td>
                  <td className="table_isk_td" onClick={() => lookIsksFn(row)}>
                    {+row?.reglament !== 0 && (
                      <span>
                        {searchNameSelect(selReglament, +row?.reglament)}
                      </span>
                    )}
                  </td>
                  <td className="table_isk_td" onClick={() => lookIsksFn(row)}>
                    {row?.arbitrs?.length !== 0 && (
                      <>
                        {row?.arbitrs?.map((i) => (
                          <span>{i?.name}</span>
                        ))}
                      </>
                    )}
                  </td>
                  <td className="table_isk_td" onClick={() => lookIsksFn(row)}>
                    <span>{row.secretary || ""}</span>
                  </td>
                  <td className="table_isk_td">
                    {row?.status === 0 ? (
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
                        {+row?.isk_status === 0 ? (
                          <div className="statusIsks">
                            <div className="statusIsks moreIsksStatus">
                              <button onClick={() => lookIsksFn(row)}>
                                Просмотреть
                              </button>
                            </div>
                            <button onClick={() => lookIsks(row?.codeid, 1)}>
                              <img src={fullfiled} alt="ok" />
                            </button>
                            <button onClick={() => lookIsks(row?.codeid, 2)}>
                              <img src={reject} alt="no" />
                            </button>
                            {/* <button onClick={() => lookIsks(row?.codeid, 2)}>
                            <img src={redone} alt="redone" className="redone" />
                          </button> */}
                            {/* /////  */}
                          </div>
                        ) : (
                          <>
                            {statusMessages[row?.isk_status] && (
                              <span
                                style={{ padding: "0px 0px 0px 10px" }}
                                className={
                                  +row?.isk_status === 1 ||
                                  +row?.isk_status === 3
                                    ? "colorStatusGreen"
                                    : +row?.isk_status === 2 ||
                                      +row?.isk_status === 4
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
                      </>
                    )}
                  </td>
                  <td className="table_isk_td">
                    {+row?.status !== 0 && (
                      <>
                        {(+row?.isk_status === 0 || +row?.isk_status === 1) && (
                          <TimerRevers
                            days={row?.isk_date}
                            time={row.isk_time}
                          />
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
      {/* //// модалки для принятия и отказа иска */}
      <ConfirmStatus
        setSendStatusIsk={setSendStatusIsk}
        sendStatusIsk={sendStatusIsk}
        setIsType={setIsType}
        istype={istype}
      />
    </>
  );
};
