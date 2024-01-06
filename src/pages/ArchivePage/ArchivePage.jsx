import React from "react";
import "./ArchivePage.scss";

const ArchivePage = () => {
  const rowsData = [
    {
      id: 1,
      number: "№ 1326",
      dateStart: "19.12.2023",
      dateEnd: "31.12.2023",
      plaintiffFIO: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович ",
      plaintiffName:
        ' Джумабековича"О расторжении договора займа 482 от 17.10.2005 г. и взыскании задолженности путем обращения взыскания на заложенное имущество',
    },
    {
      id: 2,
      number: "№ 1327",
      dateStart: "19.12.2023",
      dateEnd: "31.12.2023",
      plaintiffFIO: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович ",
      plaintiffName:
        ' Джумабековича"О расторжении договора займа 482 от 17.10.2005 г. и взыскании задолженности путем обращения взыскания на заложенное имущество',
    },
    {
      id: 3,
      number: "№ 1328",
      dateStart: "19.12.2023",
      dateEnd: "31.12.2023",
      plaintiffFIO: "Джумабеков Нурдин Арленович",
      defendant: "Сейитбеков Тимур Сейитович ",
      plaintiffName:
        ' Джумабековича"О расторжении договора займа 482 от 17.10.2005 г. и взыскании задолженности путем обращения взыскания на заложенное имущество',
    },
  ];

  return (
    <div className="mainTables">
      <div className="archivePage">
        {/* <div className="searchBlock">
          <input type="search" placeholder="Поиск по наименованию иска" />
          <button className="saveBtn">Поиск</button>
        </div> */}
        <div className="main_tabla_isk">
          <table className="table_isk">
            <thead>
              <tr>
                <th className="table_isk_th">Номер иска</th>
                <th className="table_isk_th">Дата начала </th>
                <th className="table_isk_th">Дата конца </th>
                <th className="table_isk_th">ФИО истца</th>
                <th className="table_isk_th">ФИО ответчика </th>
                <th className="table_isk_th">Наименование иска</th>
              </tr>
            </thead>
            <tbody className="tbody_isk">
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
                    <span>{row.dateStart}</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.dateEnd}</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.plaintiffFIO}</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.defendant}</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{row.plaintiffName}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
