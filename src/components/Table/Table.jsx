import React, { useState } from "react";
import "./Table.scss";
import { useDispatch, useSelector } from "react-redux";
import { toTakeIsksList } from "../../store/reducers/sendDocsSlice";
import {
  changeIdStatus,
  changeLookChangeDeleteIsks,
  changeLookChangeEditIsks,
  changeLookChangeStatus,
  changeMainBtnList,
} from "../../store/reducers/stateSlice";
import { searchNameSelect } from "../../helpers/searchNameSelect";

import editImg from "../../asstes/icons/editBtn.svg";
import deleteImg from "../../asstes/icons/deleteBtn.svg";
import sendImg from "../../asstes/icons/goodSend.svg";
import LookPdfModal from "../PdfFile/LookPdfModal/LookPdfModal";
import { editIsks } from "../../store/reducers/applicationsSlice";
import { useNavigate } from "react-router-dom";

export const Table = () => {
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
    const newList = mainBtnList.map((item) => {
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
    // dispatch(changeLookChangeEditIsks(true));
    // dispatch(changeIdStatus(id));
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
  };

  const deleteIsksFn = (id) => {
    dispatch(changeLookChangeDeleteIsks(true));
    dispatch(changeIdStatus(id));
  };

  const statusMessages = {
    1: "Иск подан",
    2: "Иск отклонён ответственным секретарём",
    3: "Иск принят председателем",
    4: "Иск отклонён председателем",
    5: "Иск принят председателем",
  };

  console.log(mainBtnList, "mainBtnList");
  return (
    <>
      <div className="mainTables">
        <ul className="choice__plaintiff">
          {mainBtnList?.slice(5, 9)?.map((btn) => (
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
                <th className="table_isk_th">Иск</th>
                <th className="table_isk_th">Дата</th>
                <th className="table_isk_th">Истец</th>
                <th className="table_isk_th">Ответчик</th>
                <th className="table_isk_th">Арбитражный сбор</th>
                <th className="table_isk_th">Регламент</th>
                <th className="table_isk_th">Арбитры</th>
                <th className="table_isk_th">Секретарь</th>
                <th className="table_isk_th">Статус</th>
                <th className="table_isk_th">Действие</th>
                <th className="table_isk_th">Документы</th>
              </tr>
            </thead>
            <tbody className="tbody_isk">
              {listTodos?.map((row, index) => (
                <tr
                  key={index}
                  style={
                    +index % 2 === 0
                      ? { background: "#fff" }
                      : { background: "#f9fafd" }
                  }
                >
                  <td className="table_isk_td">
                    <div>
                      <span className="span_teble">
                        {row?.isk_number ? `№ ${row?.isk_number}` : ""}
                      </span>
                      {/* <span style={{ color: "orange" }}>{row?.isk_date}</span> */}
                    </div>
                  </td>
                  <td className="table_isk_td">
                    <span>{row?.isk_date}</span>
                    <span>{row?.isk_time}</span>
                  </td>
                  <td className="table_isk_td">
                    <>
                      {row?.plaintiff?.length === 0 ? ( ////  "ФИО Истца отсутствует"
                        <p></p>
                      ) : (
                        <>
                          {row.plaintiff.map((i, index) => (
                            <span key={index}>
                              {i.name}
                              {index !== row.plaintiff.length - 1 && ","}
                            </span>
                          ))}
                        </>
                      )}
                    </>
                  </td>
                  <td className="table_isk_td">
                    <>
                      {row?.defendant?.length === 0 ? ( ////  "ФИО ответчика отсутствует"
                        ""
                      ) : (
                        <>
                          {row.defendant.map((i, index) => (
                            <span key={index}>
                              {i.name}
                              {index !== row.defendant.length - 1 && ","}
                            </span>
                          ))}
                        </>
                      )}
                    </>
                  </td>
                  {/* ///////////////////////////////////// */}
                  <td className="table_isk_td">
                    <span>
                      {+row?.arbitr_fee === 0 ? (
                        ""
                      ) : (
                        <>
                          {row?.arbitr_fee}{" "}
                          {searchNameSelect(selCurrency, +row?.arbitr_curr)}
                        </>
                      )}
                    </span>
                  </td>
                  <td className="table_isk_td">
                    <span>
                      {+row?.reglament === 0 ? (
                        ""
                      ) : (
                        <>{searchNameSelect(selReglament, +row?.reglament)}</>
                      )}
                    </span>
                  </td>
                  <td className="table_isk_td">
                    {row?.arbitrs?.length === 0 ? (
                      <span></span>
                    ) : (
                      row?.arbitrs?.map((i) => <span>{i?.name}</span>)
                    )}
                  </td>
                  <td className="table_isk_td">
                    <span>{row.secretary ? row.secretary : ""}</span>
                    {/* <span>Nurdin</span> */}
                  </td>
                  <td className="table_isk_td">
                    {+row?.status === 1 ? (
                      <span style={{ color: "#16bb16", padding: "0px 10px" }}>
                        Активен
                      </span>
                    ) : (
                      <span style={{ color: "red", padding: "0px 10px" }}>
                        Черновик
                      </span>
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
                              +row?.isk_status === 3 || +row?.isk_status === 5
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
                  </td>
                  <td className="table_isk_td">
                    <span className="documentBlock">
                      {row?.files?.length === 0 ? (
                        <span></span>
                      ) : (
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
    </>
  );
};
