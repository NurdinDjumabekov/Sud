import React, { useState } from "react";
import "./MainPageSS.scss";
import { useDispatch, useSelector } from "react-redux";
import { searchNameSelect } from "../../../../helpers/searchNameSelect";
import LookPdfModal from "../../../PdfFile/LookPdfModal/LookPdfModal";
import { changeMainBtnList } from "../../../../store/reducers/stateSlice";
import { toTakeIsksList } from "../../../../store/reducers/sendDocsSlice";
////// imgs

import { simpleSecrHeaders } from "../../../../helpers/dataArr";
import ActionsSS from "../ActionsSS/ActionsSS";
import ConfirmStatusSS from "../ConfirmStatusSS/ConfirmStatusSS";
import ActionsStatusSS from "../ActionsStatusSS/ActionsStatusSS";
import MainTableData from "../../All/MainTableData/MainTableData";

export const MainPageSS = () => {
  const dispatch = useDispatch();
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
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

  return (
    <>
      <div className="mainTables">
        <ul className="choice__plaintiff">
          {mainBtnList?.slice(11, 14)?.map((btn, ind) => (
            <li key={btn.id}>
              <button
                className={btn?.bool ? "activeBtnsPlaintiff" : ""}
                onClick={() => clickBtn(btn?.id)}
                style={ind === 0 ? { margin: "0px", padding: "0px 30px" } : {}}
              >
                {btn?.name} [{btn?.count || 0}]
              </button>
            </li>
          ))}
        </ul>
        <div className="main_tabla_isk">
          <table className="table_isk">
            <thead>
              {simpleSecrHeaders?.map((i) => (
                <th key={i} className="table_isk_th">
                  {i}
                </th>
              ))}
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
                          {index !== row?.plaintiff?.length - 1 && ","}
                        </span>
                      ))}
                  </td>
                  <td className="table_isk_td">
                    <span>{row.secretary || ""}</span>
                  </td>
                  <td className="table_isk_td">
                    <ActionsSS
                      row={row}
                      setSendStatusIsk={setSendStatusIsk}
                      setIsType={setIsType}
                    />
                  </td>
                  <td className="table_isk_td">
                    <ActionsStatusSS
                      row={row}
                      setSendStatusIsk={setSendStatusIsk}
                      setIsType={setIsType}
                    />
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
      {/* //// модалки для принятия и отказа иска */}
      <ConfirmStatusSS
        setSendStatusIsk={setSendStatusIsk}
        sendStatusIsk={sendStatusIsk}
        setIsType={setIsType}
        istype={istype}
      />
    </>
  );
};
