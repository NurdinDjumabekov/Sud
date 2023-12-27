import React, { useState } from "react";
import "./Table.scss";
import imgPdf from "../../asstes/icons/pdf.svg";
import pdfFile from "./../../asstes/pdf/sud_pdf.pdf";
import Modals from "../Modals/Modals";

export const Table = () => {
  const [lookPdf, setLookPdf] = useState(false);
  const rowsData = [
    {
      id: "1",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Alisher Duishenaly",
      defendant: "Sadirdinov Ruslan",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "2",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Falcon – Admin Dashboard & WebApp Template",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "3",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Djumabekov Nurdin",
      defendant: "Alisher Duishenaly",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "4",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Djumabekov Nurdin",
      defendant: "Sadirdinov Ruslan",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Sadirdinov Ruslan",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "5",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Djumabekov Nurdin",
      defendant: "Sadirdinov Ruslan",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "6",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Sadirdinov Ruslan",
      defendant: "Djumabekov Nurdin",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "7",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "8",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Alisher Duishenaly",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "9",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "10",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Alisher Duishenaly",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "11",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "12",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "13",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "14",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "15",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "16",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "17",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "18",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "19",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "20",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "21",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
      arbitrationFee: "0 валют",
      regulation: "не выбран",
      arbitrators: "Арбриты не назначены",
      secretary: "Эльнура",
      status: "Ответчик уведомлен",
      documentType: "Определение об отказе иска",
    },
    {
      id: "22",
      number: "№ 1326",
      date: "19.12.2023",
      plaintiff: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович",
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

  return (
    <>
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
              <tr key={index}>
                <td className="table_isk_td">
                  <div>
                    <span className="span_teble">{row.number}</span>
                  </div>
                </td>
                <td className="table_isk_td">
                  <span>{row.plaintiff}</span>
                </td>
                <td className="table_isk_td">
                  <span>{row.defendant}</span>
                </td>
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
      {lookPdf && (
        <Modals openModal={lookPdf} setOpenModal={setLookPdf}>
          <iframe src={pdfFile} width={700} height={850}></iframe>
        </Modals>
      )}
    </>
  );
};
