////hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

///style
import "./MainPagePred.scss";

////fns
import { toTakeIsksList } from "../../../../store/reducers/sendDocsSlice";
import { changeMainBtnList } from "../../../../store/reducers/stateSlice";

////components
import ActionsPred from "../ActionsPred/ActionsPred";
import ConfirmStatusPred from "../ConfirmStatusPred/ConfirmStatusPred";
import MainTableData from "../../All/MainTableData/MainTableData";
import TimerRevers from "../../../Timers/TimerRevers/TimerRevers";
import ChoiceSecr from "../ChoiceSecr/ChoiceSecr";
import LookPdfModal from "../../../PdfFile/LookPdfModal/LookPdfModal";

////// helpers
import { predHeaders } from "../../../../helpers/dataArr";
import OtherActionsPred from "../OtherActionsPred/OtherActionsPred";
import ChoiceReglament from "../ChoiceReglament/ChoiceReglament";

export const MainPagePred = () => {
  const dispatch = useDispatch();

  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { mainBtnList } = useSelector((state) => state.stateSlice);

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

  console.log(listTodos, "listTodos");

  return (
    <>
      <div className="mainTables predTable">
        <ul className="choice__plaintiff">
          {mainBtnList?.slice(0, 6)?.map((btn, ind) => (
            <li key={btn.id}>
              <button
                className={btn?.bool ? "activeBtnsPlaintiff" : ""}
                onClick={() => clickBtn(btn.id)}
              >
                {btn?.name} [{btn?.count || 0}]
              </button>
            </li>
          ))}
        </ul>
        <div className="main_tabla_isk">
          <table className="table_isk">
            <thead>
              <tr>
                {predHeaders?.map((title, index) => (
                  <th key={index} className="table_isk_th">
                    {title}
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

                  <ChoiceReglament row={row} />

                  <td className="table_isk_td">
                    {row.secretary || <ChoiceSecr item={row} />}
                  </td>
                  <td className="table_isk_td">
                    <ActionsPred
                      row={row}
                      setSendStatusIsk={setSendStatusIsk}
                      setIsType={setIsType}
                    />
                  </td>
                  <td className="table_isk_td">
                    {+row?.status !== 0 && (
                      <>
                        {(+row?.isk_status === 0 || +row?.isk_status === 1) && (
                          <TimerRevers
                            days={row?.isk_date}
                            time={row.isk_time}
                          />
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
                  <OtherActionsPred
                    row={row}
                    setSendStatusIsk={setSendStatusIsk}
                    setIsType={setIsType}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* //// модалки для принятия и отказа иска */}
      <ConfirmStatusPred
        setSendStatusIsk={setSendStatusIsk}
        sendStatusIsk={sendStatusIsk}
        setIsType={setIsType}
        istype={istype}
      />
    </>
  );
};
