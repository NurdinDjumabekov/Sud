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
          {mainBtnList?.slice(11, 13)?.map((btn, ind) => (
            <li key={btn.id}>
              <button
                className={btn?.bool ? "activeBtnsPlaintiff" : ""}
                onClick={() => clickBtn(0)}
                style={ind === 0 ? { margin: "0px", padding: "0px 30px" } : {}}
              >
                {btn?.name} [{listTodos?.length || 0}]
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
                  <td className="table_isk_td">
                    <div>
                      <span>
                        {row?.isk_number ? `№ ${row?.isk_number}` : ""}
                      </span>
                    </div>
                  </td>
                  <td className="table_isk_td">
                    <span>{row?.isk_date}</span>
                    <span>{row?.isk_time}</span>
                  </td>
                  <td className="table_isk_td">
                    {row?.plaintiff?.length !== 0 && (
                      <>
                        {row.plaintiff.map((i, index) => (
                          <span key={index}>
                            {i.name}
                            {index !== row.plaintiff.length - 1 && ","}
                          </span>
                        ))}
                      </>
                    )}
                  </td>
                  <td className="table_isk_td">
                    {row?.defendant?.length !== 0 && (
                      <>
                        {row.defendant.map((i, index) => (
                          <span key={index}>
                            {i.name}
                            {index !== row.defendant.length - 1 && ","}
                          </span>
                        ))}
                      </>
                    )}
                  </td>
                  <td className="table_isk_td">
                    {+row?.arbitr_fee !== 0 && (
                      <span>
                        {row?.arbitr_fee}{" "}
                        {searchNameSelect(selCurrency, +row?.arbitr_curr)}
                      </span>
                    )}
                  </td>
                  <td className="table_isk_td">
                    <span>
                      {+row?.reglament !== 0 && (
                        <>{searchNameSelect(selReglament, +row?.reglament)}</>
                      )}
                    </span>
                  </td>
                  <td className="table_isk_td">
                    {row?.arbitrs?.length !== 0 &&
                      row?.arbitrs?.map((i) => <span>{i?.name}</span>)}
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
