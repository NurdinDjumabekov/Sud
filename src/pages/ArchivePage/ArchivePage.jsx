/////// hooks
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

////// helpers
import { searchNameSelect } from "../../helpers/searchNameSelect";

////// style
import "./style.scss";

////// components
import LookPdfModal from "../../components/MainPage/LookPdfModal/LookPdfModal";
import MainTableData from "../../components/MainPage/MainTableData/MainTableData";
import Arbitrs from "../../components/MainPage/Arbitrs/Arbitrs";
import AllStatus from "../../components/MainPage/AllStatus/AllStatus";
import TypeActionsUsers from "../../components/MainPage/ActionsUsers/TypeActionsUsersAll/TypeActionsUsers";
import TimeAndActions from "../../components/MainPage/ActionsUsers/TimeAndActions/TimeAndActions";
import ChoiceSecr from "../../components/MainPage/ConfirmStatusIsks/ConfirmPred/ChoiceSecr/ChoiceSecr";
import SortingArchive from "../../components/ArchivePage/SortingArchive/SortingArchive";
import { useEffect } from "react";
import { getHistoryIsks } from "../../store/reducers/historyIsks";
import {
  transformActionDate,
  transformDate,
} from "../../helpers/transformDate";

const ArchivePage = () => {
  const dispatch = useDispatch();

  const { listHistoryIsks } = useSelector((state) => state.historyIsks);
  const { selReglament } = useSelector((state) => state.selectsSlice);

  useEffect(() => {
    dispatch(
      getHistoryIsks({
        date_from: "01.01.2024",
        date_to: "17.10.2024 ",
      })
    );
  }, []);

  const respSecrHeaders = [
    "№",
    "Иск",
    "Дата",
    "Истец",
    "Ответчик",
    "Арбитражный сбор",
    "Регламент",
    "Арбитры",
    "Секретарь",
    "Статус",
    // "До рассмотрения осталось",
    "Документы",
  ];

  return (
    <div className="archivePage">
      <div className="mainTables">
        <SortingArchive />
        <div className="iskData">
          <table className="table_isk">
            <thead>
              <tr>
                {respSecrHeaders?.map((header, index) => (
                  <th
                    key={index}
                    className="table_isk_th"
                    style={{ width: index === 0 ? "10%" : "auto" }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="tbody_isk">
              {listHistoryIsks?.map((row, index) => (
                <tr
                  key={index}
                  className={`${+index % 2 === 0 ? "colorWhite" : "colorGray"}`}
                >
                  <td className="index">
                    <div className="codeidIsk__inner">
                      <span>{row?.codeid}</span>
                    </div>
                  </td>
                  <td className="num codeidIsk">
                    <div className="codeidIsk__inner">
                      <span>{!!row?.isk_number && `№ ${row?.isk_number}`}</span>
                    </div>
                  </td>
                  <td className="date">
                    <span>{row?.isk_date}</span>
                    <span>{row?.isk_time}</span>
                  </td>
                  <td className="plaintiffTable">
                    {row?.plaintiff?.length !== 0 && (
                      <>
                        {row?.plaintiff?.map((i, index) => (
                          <span key={index}>
                            {i?.name}
                            {index !== row?.plaintiff?.length - 1 && ","}
                          </span>
                        ))}
                      </>
                    )}
                  </td>
                  <td className="defendant">
                    {row?.defendant?.length !== 0 && (
                      <>
                        {row?.defendant?.map((i, index) => (
                          <span key={index}>
                            {i.name}
                            {index !== row?.defendant?.length - 1 && ","}
                          </span>
                        ))}
                      </>
                    )}
                  </td>
                  <td className="arbitrs">
                    {+row?.arbitr_fee !== 0 && (
                      <span>
                        {row?.arbitr_fee}{" "}
                        {/* {searchNameSelect(selCurrency, +row?.arbitr_curr)} */}
                        {/* //  сумма и валюта/// */}
                      </span>
                    )}
                  </td>
                  <td className="reglamet">
                    <span>
                      {+row?.reglament !== 0 && (
                        <>{searchNameSelect(selReglament, +row?.reglament)}</>
                      )}
                    </span>
                  </td>
                  <td className="arbitrs">
                    {row?.arbitrs?.map((i, index) => (
                      <span key={index}>
                        {i?.fio_arbitr}
                        {index !== row?.arbitrs?.length - 1 && ","}
                      </span>
                    ))}
                  </td>
                  <td className="secr">
                    <span>{row?.secretary}</span>
                  </td>
                  <td className="allStatus">
                    <span className="">В архиве</span>
                  </td>
                  <TypeActionsUsers row={row} />
                  <td className="documents">
                    <span className="documentBlock">
                      {row?.files?.length !== 0 && (
                        //  if файлы есть
                        <div className="docsBlock">
                          {row?.files?.map((pdf) => (
                            <LookPdfModal
                              pdf={pdf}
                              key={pdf?.codeid}
                              row={row}
                            />
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
    </div>
  );
};

export default ArchivePage;
