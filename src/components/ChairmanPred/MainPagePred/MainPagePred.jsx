import React, { useState } from "react";
import "./MainPagePred.scss";
import imgPdf from "../../../asstes/icons/pdf.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeListPlaint,
  changeLookDataAllPlaintiff,
} from "../../../store/reducers/stateSlice";
import { changeAlertText } from "../../../store/reducers/typesSlice";
import ConfirmStatus from "../../ConfirmStatus/ConfirmStatus";
import { searchNameSelect } from "../../../helpers/searchNameSelect";

export const MainPagePred = () => {
  const dispatch = useDispatch();
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { selCurrency, selReglament } = useSelector(
    (state) => state.selectsSlice
  );
  const [sendStatusIsk, setSendStatusIsk] = useState(false);
  const [istype, setIsType] = useState({ type: 0, id: 0 }); // 1- подтвердить, 2 - отклонить

  const changeStatusIsks = (id, status) => {
    setSendStatusIsk(true);
    setIsType({ type: status, id: id });
  };

  const [btnList, setBtnList] = React.useState([
    {
      id: 1,
      name: "Все иски",
      bool: true,
    },
    {
      id: 2,
      name: "Принятые отвественным секретарём",
      bool: false,
    },
    {
      id: 3,
      name: "Отклонённые отвественным секретарём",
      bool: false,
    },
    {
      id: 4,
      name: "Принятые председателем",
      bool: false,
    },
    {
      id: 5,
      name: "Отклонённые председателем",
      bool: false,
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
  };

  console.log(listTodos, "listTodos");
  // console.log(todosApplications, "todosApplications");

  const statusMessages = {
    2: "Отклонён ответственным секретарём",
    3: "Принят председателем",
    4: "Отклонён председателем",
  };

  return (
    <>
      <div className="mainTables">
        <ul className="choice__plaintiff">
          {btnList?.map((btn) => (
            <li key={btn.id}>
              <button
                className={btn?.bool ? "activeBtnsPlaintiff" : ""}
                onClick={() => clickBtn(btn.id)}
              >
                {btn.name}
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
                  </td>
                  <td className="table_isk_td">
                    {+row?.isk_status === 0 || +row?.isk_status === 1 ? (
                      <div className="statusIsks">
                        <button
                          onClick={() => changeStatusIsks(row?.codeid, 3)}
                        >
                          Принять
                        </button>
                        <button
                          onClick={() => changeStatusIsks(row?.codeid, 4)}
                        >
                          Отклонить
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
                        // <span>Документы оттутствуют</span>
                        <span></span>
                      ) : (
                        <div className="docsBlock">
                          {row?.files?.map((i, ind) => (
                            <a
                              key={i?.codeid}
                              className="docsBlock__inner"
                              href={i?.path}
                              target="_blank"
                            >
                              <img src={imgPdf} alt="pdf" />
                              <span>{i?.document_name}</span>
                            </a>
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
      <ConfirmStatus
        setSendStatusIsk={setSendStatusIsk}
        sendStatusIsk={sendStatusIsk}
        setIsType={setIsType}
        istype={istype}
      />
    </>
  );
};
