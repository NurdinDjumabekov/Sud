import React, { useState } from "react";
import "./Table.scss";
import imgPdf from "../../asstes/icons/pdf.svg";
import pdfFileImg from "../../asstes/images/pdfFile.png";
import pdfFile from "./../../asstes/pdf/sud_pdf.pdf";
import Modals from "../Modals/Modals";

export const Table = () => {
  const [lookPdf, setLookPdf] = useState(false);
  const rowsData = [
    {
      id: "1",
      number: "№ 212",
      date: "19.12.2023",
      plaintiff: "Alisher Duishenaly",
      defendant: [
        "Sadirdinov Ruslan",
        "Sadirdinov Ruslan",
        "Alisher Duishenaly",
        "Djumabekov Nurdin",
        "Сейитбеков Тимур Сейитович",
      ],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "2",
      number: "№ 32",
      date: "19.12.2023",
      plaintiff: "Falcon – Admin Dashboard & WebApp Template",
      defendant: ["Alisher Duishenaly"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "3",
      number: "№ 445",
      date: "19.12.2023",
      plaintiff: "Djumabekov Nurdin",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "4",
      number: "№ 554",
      date: "19.12.2023",
      plaintiff: "Djumabekov Nurdin",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Sadirdinov Ruslan",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "5",
      number: "№ 12",
      date: "19.12.2023",
      plaintiff: "Djumabekov Nurdin",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "6",
      number: "№ 45",
      date: "19.12.2023",
      plaintiff: "Sadirdinov Ruslan",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "7",
      number: "№ 876",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "8",
      number: "№ 67",
      date: "19.12.2023",
      plaintiff: "Alisher Duishenaly",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "9",
      number: "№ 54",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "10",
      number: "№ 43",
      date: "19.12.2023",
      plaintiff: "Alisher Duishenaly",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "11",
      number: "№ 865",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "12",
      number: "№ 27",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "13",
      number: "№ 37",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "14",
      number: "№ 47",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "15",
      number: "№ 93",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "16",
      number: "№ 38",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "17",
      number: "№ 86",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "18",
      number: "№ 37",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "19",
      number: "№ 28",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "20",
      number: "№ 18",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "21",
      number: "№ 39",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "22",
      number: "№ 94",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: ["Sadirdinov Ruslan"],
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
  ];

  const openPdfInNewTab = () => {
    setLookPdf(true);
    // window.open(pdfFile);
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
              {/* Используем map для отображения строк */}
              {rowsData.map((row, index) => (
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
                      <span className="span_teble">{row.number}</span>
                    </div>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.plaintiff}</span>
                  </td>
                  {/* ////////////////////////////// */}
                  {/* <td
                    className="table_isk_td"
                    style={
                      row?.defendant?.length === 1
                        ? {}
                        : {
                            display: "flex",
                            flexDirection: "column",
                            overflow: "scroll",
                            maxHeight: "250px",
                          }
                    }
                  >
                    {row?.defendant?.length === 1 ? (
                      <span>{row.defendant?.[0]}</span>
                    ) : (
                      <>
                        {row?.defendant?.map((i) => (
                          <>
                            <div className="innerTable">
                              <td className="table_isk_td__inner">
                                <span>{i}</span>
                              </td>
                            </div>
                          </>
                        ))}
                      </>
                    )}
                  </td> */}
                  <td className="table_isk_td">
                    <span>{row.defendant?.[0]}</span>
                  </td>
                  {/* ///////////////////////////////////// */}
                  <td className="table_isk_td">
                    <span>{row.arbitrationFee}</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.regulation}</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.arbitrators}</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.secretary}</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.status}</span>
                  </td>
                  <td className="table_isk_td">
                    <span className="documentBlock" onClick={openPdfInNewTab}>
                      <img src={imgPdf} alt="pdf" />
                      <p>{row.documentType}</p>
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
      {lookPdf && (
        <Modals openModal={lookPdf} setOpenModal={setLookPdf}>
          <iframe src={pdfFile} width={700} height={850}></iframe>
        </Modals>
      )}
    </>
  );
};
