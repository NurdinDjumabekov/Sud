import React, { useState } from "react";
import "./Table.scss";
import imgPdf from "../../asstes/icons/pdf.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editIsks,
  toTakeTypeTypeDocs,
} from "../../store/reducers/applicationsSlice";
import { deleteIsks, toTakeIsksList } from "../../store/reducers/sendDocsSlice";
import {
  changeIdStatus,
  changeListPlaint,
  changeLookChangeStatus,
  changeLookDataAllPlaintiff,
  changeMainBtnList,
} from "../../store/reducers/stateSlice";
import { changeAlertText } from "../../store/reducers/typesSlice";
import { searchNameSelect } from "../../helpers/searchNameSelect";

import imgFizFace from "../../asstes/icons/plaintiff/fiz_face.svg";
import imgUrFace from "../../asstes/icons/plaintiff/ur_face.svg";
import UrFace from "../PlaintiffPage/UrFace/UrFace";
import Modals from "../Modals/Modals";
import LookPdfModal from "../PdfFile/LookPdfModal/LookPdfModal";

export const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);
  const { mainBtnList } = useSelector((state) => state.stateSlice);
  const { selCurrency, selReglament } = useSelector(
    (state) => state.selectsSlice
  );

  const lookDataPlaintiff = (arr, type) => {
    if (arr?.length === 0) {
      dispatch(
        changeAlertText({
          text: `Данные ${type === 1 ? "истца" : "ответчика"} отсутствуют`,
          backColor: "#f9fafd",
          state: true,
        })
      );
    } else {
      dispatch(changeLookDataAllPlaintiff(true));
      dispatch(changeListPlaint(arr));
    }
  };

  const changeStatus = (id) => {
    dispatch(changeLookChangeStatus(true)); /// для вызова модалки изменения статуса иска
    dispatch(changeIdStatus(id)); /// для отправки id иска
  };

  const editIsksFn = (id) => {
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
  };

  const deleteIsksFn = (codeid) => {
    dispatch(deleteIsks({ codeid, tokenA }));
  };

  // const [btnList, setBtnList] = React.useState();

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

  console.log(listTodos, "listTodos");
  // console.log(todosApplications, "todosApplications");

  const statusMessages = {
    1: "Ожидание ...",
    2: "Иск отклонён ответственным секретарём",
    3: "Иск принят председателем",
    4: "Иск отклонён председателем",
  };

  return (
    <>
      <div className="mainTables">
        <ul className="choice__plaintiff">
          {mainBtnList?.slice(0, 1)?.map((btn) => (
            <li key={btn.id}>
              <button
                className={btn?.bool ? "activeBtnsPlaintiff" : ""}
                onClick={() => clickBtn(btn.id)}
              >
                {btn.name}
                <span className="countInfo">{listTodos?.[0]?.draft_count}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="main_tabla_isk">
          <table className="table_isk">
            <thead>
              <tr>
                <th className="table_isk_th">Иск</th>
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
                      <span
                        style={row?.isk_number ? { margin: "8px 0 0 0" } : {}}
                      >
                        {row?.isk_date}
                      </span>
                    </div>
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
                      <span style={{ color: "#1cd81c" }}>Активен</span>
                    ) : (
                      <span style={{ color: "red" }}>Черновик</span>
                    )}
                  </td>
                  <td className="table_isk_td">
                    {+row?.status === 0 ? (
                      <div className="statusIsks">
                        <button onClick={() => changeStatus(row?.codeid)}>
                          Подать
                        </button>
                        <button onClick={() => editIsksFn(row?.codeid)}>
                          Редактировать
                        </button>
                        <button onClick={() => deleteIsksFn(row?.codeid)}>
                          Удалить
                        </button>
                      </div>
                    ) : (
                      <>
                        {statusMessages[row?.isk_status] && (
                          <span style={{ padding: "0px 0px 0px 10px" }}>
                            {statusMessages[row?.isk_status]}
                          </span>
                        )}
                        {!statusMessages[row?.isk_status] && (
                          <span style={{ padding: "0px 0px 0px 10px" }}>
                            Ожидание ...
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
                            <>
                              <LookPdfModal pdf={pdf} />
                            </>
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
