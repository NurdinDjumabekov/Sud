import React, { useState } from "react";
import "./MainPageSS.scss";
import { useDispatch, useSelector } from "react-redux";
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import LookPdfModal from "../../PdfFile/LookPdfModal/LookPdfModal";
import { editIsks } from "../../../store/reducers/applicationsSlice";
import { useNavigate } from "react-router-dom";
import { changeMainBtnList } from "../../../store/reducers/stateSlice";
import { toTakeIsksList } from "../../../store/reducers/sendDocsSlice";
import ConfirmDocs from "../../ConfirmDocs/ConfirmDocs";

export const MainPageSS = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);
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

  const editIsksFn = (id) => {
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
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
  };

  return (
    <>
      <div className="mainTables">
        <ul className="choice__plaintiff">
          {mainBtnList?.slice(0, 1)?.map((btn, ind) => (
            <li key={btn.id}>
              <button
                className={btn?.bool ? "activeBtnsPlaintiff" : ""}
                onClick={() => clickBtn(0)}
                style={ind === 0 ? { margin: "0px", padding: "0px 30px" } : {}}
              >
                {btn?.name} [{listTodos?.length || 0}]
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
                  <td
                    className="table_isk_td"
                    onClick={() => editIsksFn(row?.codeid)}
                  >
                    <div>
                      <span className="span_teble">
                        {row?.isk_number ? `№ ${row?.isk_number}` : ""}
                      </span>
                      {/* <span style={{ color: "orange" }}>{row?.isk_date}</span> */}
                    </div>
                  </td>
                  <td
                    className="table_isk_td"
                    onClick={() => editIsksFn(row?.codeid)}
                  >
                    <span>{row?.isk_date}</span>
                    <span>{row?.isk_time}</span>
                  </td>
                  <td
                    className="table_isk_td"
                    onClick={() => editIsksFn(row?.codeid)}
                  >
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
                  <td
                    className="table_isk_td"
                    onClick={() => editIsksFn(row?.codeid)}
                  >
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
                  <td
                    className="table_isk_td"
                    onClick={() => editIsksFn(row?.codeid)}
                  >
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
                  <td
                    className="table_isk_td"
                    onClick={() => editIsksFn(row?.codeid)}
                  >
                    <span>
                      {+row?.reglament === 0 ? (
                        ""
                      ) : (
                        <>{searchNameSelect(selReglament, +row?.reglament)}</>
                      )}
                    </span>
                  </td>
                  <td
                    className="table_isk_td"
                    onClick={() => editIsksFn(row?.codeid)}
                  >
                    {row?.arbitrs?.length === 0 ? (
                      <span></span>
                    ) : (
                      row?.arbitrs?.map((i) => <span>{i?.name}</span>)
                    )}
                  </td>
                  <td
                    className="table_isk_td"
                    onClick={() => editIsksFn(row?.codeid)}
                  >
                    <span>{row.secretary || ""}</span>
                  </td>
                  <td className="table_isk_td">
                    {+row?.isk_status === 0 ? (
                      <div className="statusIsks moreIsksStatus">
                        <button
                          className="moreBtn"
                          onClick={() => {
                            setSendStatusIsk(true);
                            changeStatusIsks(row?.codeid, 2);
                            dispatch(
                              editIsks({
                                id: row?.codeid,
                                tokenA,
                                applicationList,
                              })
                            );
                          }}
                        >
                          Просмотреть
                        </button>
                      </div>
                    ) : (
                      <>
                        {statusMessages[row?.isk_status] && (
                          <span
                            style={{ padding: "0px 0px 0px 10px" }}
                            className={
                              +row?.isk_status === 1 || +row?.isk_status === 3
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
                    <div className="statusIsks">
                      <button
                        onClick={() => {
                          setSendStatusIsk(true);
                          changeStatusIsks(row?.codeid, 5);
                          dispatch(
                            editIsks({
                              id: row?.codeid,
                              tokenA,
                              applicationList,
                            })
                          );
                        }}
                      >
                        Возражение
                      </button>
                      <button>Уведомить ответчика</button>
                    </div>
                  </td>
                  <td className="table_isk_td">
                    <span className="documentBlock">
                      {row?.files?.length === 0 ? ( ////Уведомить ответчика
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
      {/* //// модалки для принятия и отказа иска */}
      <ConfirmDocs
        setSendStatusIsk={setSendStatusIsk}
        sendStatusIsk={sendStatusIsk}
        setIsType={setIsType}
        istype={istype}
      />
    </>
  );
};
