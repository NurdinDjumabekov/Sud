import React, { useState } from "react";
import "./MainPagePred.scss";
import imgPdf from "../../../asstes/icons/pdf.svg";
import { useDispatch, useSelector } from "react-redux";
import ConfirmStatus from "../../ConfirmStatus/ConfirmStatus";
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import LookPdfModal from "../../PdfFile/LookPdfModal/LookPdfModal";
import { useNavigate } from "react-router-dom";
import { editIsks } from "../../../store/reducers/applicationsSlice";
import { toTakeIsksList } from "../../../store/reducers/sendDocsSlice";
import { changeMainBtnList } from "../../../store/reducers/stateSlice";

export const MainPagePred = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
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
  // console.log(listTodos, "listTodos");
  // console.log(mainBtnList, "mainBtnList");
  // console.log(todosApplications, "todosApplications");

  const editIsksFn = (id) => {
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
  };

  const changeStatusIsks = (id, status) => {
    setSendStatusIsk(true);
    setIsType({ type: status, id });
  };

  const statusMessages = {
    2: "Отклонён ответственным секретарём",
    3: "Принят председателем",
    4: "Отклонён председателем",
  };

  return (
    <>
      <div className="mainTables">
        <ul className="choice__plaintiff">
          {mainBtnList?.slice(0, 5)?.map((btn, ind) => (
            <li key={btn.id}>
              <button
                className={btn?.bool ? "activeBtnsPlaintiff" : ""}
                onClick={() => clickBtn(btn.id)}
                style={ind === 0 ? { marginLeft: "0px" } : {}}
              >
                {btn?.name} [{btn?.count || 0}]
                {/* <span className="countInfo">
                   {ind === 0 ? allSumsIsks(mainBtnList) : btn?.count || 0}
                </span> */}
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
                    <span className="span_teble">
                      {row?.isk_number ? `№ ${row?.isk_number}` : ""}
                    </span>
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
                    <span>{row.secretary ? row.secretary : ""}</span>
                  </td>
                  <td className="table_isk_td">
                    {+row?.isk_status === 0 || +row?.isk_status === 1 ? (
                      <div className="statusIsks">
                        <button
                          onClick={() => {
                            setSendStatusIsk(true);
                            changeStatusIsks(row?.codeid, 3);
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
                              +row?.isk_status === 3
                                ? "colorStatusGreen"
                                : +row?.isk_status === 2 ||
                                  +row?.isk_status === 4
                                ? "colorStatusRed"
                                : ""
                            }
                            onClick={() => editIsksFn(row?.codeid)}
                          >
                            {statusMessages[row?.isk_status]}
                          </span>
                        )}
                        {!statusMessages[row?.isk_status] && (
                          <span
                            style={{ padding: "0px 0px 0px 10px" }}
                            onClick={() => editIsksFn(row?.codeid)}
                          >
                            Иск подан
                          </span>
                        )}
                      </>
                    )}
                  </td>
                  <td className="table_isk_td">
                    <span className="documentBlock">
                      {row?.files?.length === 0 ? (
                        // <span>Документы оттутствуют</span>
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
      <ConfirmStatus
        setSendStatusIsk={setSendStatusIsk}
        sendStatusIsk={sendStatusIsk}
        setIsType={setIsType}
        istype={istype}
      />
    </>
  );
};

// {(istype.type === 2 || istype.type === 4) && (
//   <>
//     <div className="blockModal__inner">
//       <PdfFile editorRef={editorRefReject} />
//       <div className="plaintiFilling__container moreStyle">
//         <PdfFileReject istype={istype} editorRef={editorRef} />
//       </div>
//     </div>
//     <div className="modalchangeStatus" style={{ height: "auto" }}>
//       <div className="btnsSendIsks">
//         <button
//           onClick={(e) => {
//             setIsType({ ...istype, type: 3 });
//           }}
//         >
//           Принять
//         </button>
//         <button onClick={(e) => rejectIsk(e)} className="rejectBtn">
//           Отклонить
//         </button>
//       </div>
//     </div>
//   </>
// )}
