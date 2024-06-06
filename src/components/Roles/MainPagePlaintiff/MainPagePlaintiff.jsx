/////// hooks
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//////// states
import { toTakeIsksList } from "../../../store/reducers/sendDocsSlice";
import { changeIdStatus } from "../../../store/reducers/stateSlice";
import { changeLookChangeDeleteIsks } from "../../../store/reducers/stateSlice";
import { changeLookChangeStatus } from "../../../store/reducers/stateSlice";
import { changeMainBtnList } from "../../../store/reducers/stateSlice";
import { editIsks } from "../../../store/reducers/applicationsSlice";

////// imgs
import editImg from "../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../asstes/icons/deleteBtn.svg";
import sendImg from "../../../asstes/icons/goodSend.svg";

//////helpers
import { plaintiffHeaders } from "../../../helpers/dataArr";
import { searchNameSelect } from "../../../helpers/searchNameSelect";

//// componets
import TimerRevers from "../../../components/Timers/TimerRevers/TimerRevers";
import LookPdfModal from "../../../components/PdfFile/LookPdfModal/LookPdfModal";

////// style
import "./MainPagePlaintiff.scss";
import MainTableData from "../All/MainTableData/MainTableData";

const MainPagePlaintiff = () => {
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
    const newList = mainBtnList?.map((item) => {
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
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
  };

  const deleteIsksFn = (id) => {
    dispatch(changeLookChangeDeleteIsks(true));
    dispatch(changeIdStatus(id));
  };

  const statusMessages = {
    1: "Принят ответственным секретарём",
    2: "Отклонён ответственным секретарём",
    3: "Принят председателем",
    4: "Отклонён председателем",
    5: "Принят председателем",
  };

  return (
    <div className="mainTables">
      <ul className="choice__plaintiff">
        {mainBtnList?.slice(6, 11)?.map((btn) => (
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
              {plaintiffHeaders?.map((i) => (
                <th key={i} className="table_isk_th">
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tbody_isk">
            {listTodos?.map((row, index) => (
              <tr
                key={index}
                className={`${+index % 2 === 0 ? "colorWhite" : "colorGray"}`}
              >
                <MainTableData row={row} />
                <td className="table_isk_td">
                  <span>
                    {+row?.reglament !== 0 && (
                      <>{searchNameSelect(selReglament, +row?.reglament)}</>
                    )}
                  </span>
                </td>
                <td className="table_isk_td">
                  {row?.arbitrs?.length !== 0 &&
                    row?.arbitrs?.map((i, index) => (
                      <span>
                        {i?.fio_arbitr}
                        {index !== row?.arbitrs?.length - 1 && ","}
                      </span>
                    ))}
                </td>
                <td className="table_isk_td">
                  <span>{row.secretary || ""}</span>
                </td>
                <td className="table_isk_td">
                  {+row?.status === 1 ? (
                    <span className="activePlaint">Активен</span>
                  ) : (
                    <span className="noActivePlaint">Черновик</span>
                  )}
                </td>
                <td className="table_isk_td">
                  {row?.status == 0 || row?.isk_status == 6 ? (
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
                            +row?.isk_status === 3 ||
                            +row?.isk_status === 5 ||
                            +row?.isk_status === 1
                              ? "colorStatusGreen"
                              : +row?.isk_status === 2 || +row?.isk_status === 4
                              ? "colorStatusRed"
                              : ""
                          }
                        >
                          {statusMessages?.[row?.isk_status]}
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
                  {+row?.status !== 0 && (
                    <>
                      {(+row?.isk_status === 0 ||
                        +row?.isk_status === 1 ||
                        +row?.isk_status === 5) && (
                        <TimerRevers days={row?.isk_date} time={row.isk_time} />
                      )}
                    </>
                  )}
                </td>
                <td className="table_isk_td">
                  <span className="documentBlock">
                    {row?.files?.length !== 0 && (
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
  );
};

export default MainPagePlaintiff;
