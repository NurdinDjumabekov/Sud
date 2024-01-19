import React, { useState } from "react";
import "./Table.scss";
import imgPdf from "../../asstes/icons/pdf.svg";
import pdfFileImg from "../../asstes/images/pdfFile.png";
import pdfFile from "./../../asstes/pdf/sud_pdf.pdf";
import Modals from "../Modals/Modals";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editIsks } from "../../store/reducers/applicationsSlice";
import { deleteIsks } from "../../store/reducers/sendDocsSlice";

export const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lookPdf, setLookPdf] = useState(false);
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { todosApplications, applicationList } = useSelector(
    (state) => state.applicationsSlice
  );
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  // const openPdfInNewTab = () => {
  //   setLookPdf(true);
  //   // window.open(pdfFile);
  // };

  const editIsksFn = (id) => {
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
  };

  const deleteIsksFn = (codeid) => {
    dispatch(deleteIsks({ codeid, tokenA }));
  };

  const [btnList, setBtnList] = React.useState([
    {
      id: 1,
      name: "Мои иски",
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

  // console.log(listTodos, "listTodos");
  // console.log(todosApplications, "todosApplications");

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
                <th className="table_isk_th">Действие</th>
                <th className="table_isk_th">Документы</th>
              </tr>
            </thead>
            <tbody className="tbody_isk">
              {listTodos.map((row, index) => (
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
                      <span className="span_teble">№ {row.codeid}</span>
                    </div>
                  </td>
                  <td className="table_isk_td">
                    <span>
                      {row?.plaintiff?.length === 0
                        ? "ФИО истца отсутствует"
                        : row?.plaintiff?.[0]?.name}
                    </span>
                  </td>
                  {/* <td
                    className="table_isk_td"
                    style={
                      row?.plaintiff?.length === 1
                        ? {}
                        : {
                            display: "flex",
                            flexDirection: "column",
                            overflow: "scroll",
                            maxHeight: "250px",
                          }
                    }
                  >
                    {row?.plaintiff?.length === 1 ? (
                      <span>{row.plaintiff?.[0]?.name}</span>
                    ) : (
                      <>
                        {row?.plaintiff?.map((i) => (
                          <>
                            <div className="innerTable">
                              <td className="table_isk_td__inner">
                                <span>{i.name}</span>
                              </td>
                            </div>
                          </>
                        ))}
                      </>
                    )}
                  </td> */}
                  <td className="table_isk_td">
                    <span>
                      {row?.defendant?.length === 0
                        ? "ФИО ответчика отсутствует"
                        : row?.defendant?.[0]?.name}
                    </span>
                  </td>
                  {/* ///////////////////////////////////// */}
                  <td className="table_isk_td">
                    <span>{row.arbitr_fee}</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.reglament ? row.reglament : "не выбран"}</span>
                  </td>
                  <td className="table_isk_td">
                    {row?.arbitrs?.length === 0 ? (
                      <span>Арбитр не назначен</span>
                    ) : (
                      row?.arbitrs?.map((i) => <span>{i?.name}</span>)
                    )}
                  </td>
                  <td className="table_isk_td">
                    {/* <span>{row.secretary}</span> */}
                    <span>Nurdin</span>
                  </td>
                  <td className="table_isk_td">
                    <span>
                      {row.isk_status_name ? row.isk_status_name : "Ожидание"}
                    </span>
                  </td>
                  <td className="table_isk_td">
                    <div className="statusIsks">
                      <button>Подать иск</button>
                      <button onClick={() => editIsksFn(row?.codeid)}>
                        Редактировать иск
                      </button>
                      <button onClick={() => deleteIsksFn(row?.codeid)}>
                        Удалить иск
                      </button>
                    </div>
                  </td>
                  <td className="table_isk_td">
                    <span className="documentBlock">
                      {row.files?.length === 0 ? (
                        <p>Документы оттутствуют</p>
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
                              <p>{i?.document_name}</p>
                            </a>
                          ))}
                        </div>
                      )}
                    </span>
                    {/* <span className="documentBlock" onClick={openPdfInNewTab}>
                    <img src={imgPdf} alt="pdf" />
                    {row.documentType}
                  </span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {lookPdf && (
        <Modals openModal={lookPdf} setOpenModal={setLookPdf}>
          <iframe src={pdfFile} width={700} height={850}></iframe>
        </Modals>
      )} */}
    </>
  );
};
