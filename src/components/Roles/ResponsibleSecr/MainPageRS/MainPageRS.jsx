import "./MainPageRS.scss";
import { useDispatch, useSelector } from "react-redux";
import { searchNameSelect } from "../../../../helpers/searchNameSelect";
import LookPdfModal from "../../../PdfFile/LookPdfModal/LookPdfModal";
import { changeMainBtnList } from "../../../../store/reducers/stateSlice";
import { toTakeIsksList } from "../../../../store/reducers/sendDocsSlice";
import TimerRevers from "../../../Timers/TimerRevers/TimerRevers";
import { respSecrHeaders } from "../../../../helpers/dataArr";
import ActionsRS from "../ActionsRS/ActionsRS";
import { useState } from "react";
import ConfirmStatusRS from "../ConfirmStatusRS/ConfirmStatusRS";
import MainTableData from "../../All/MainTableData/MainTableData";

export const MainPageRS = () => {
  const dispatch = useDispatch();
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const [sendStatusIsk, setSendStatusIsk] = useState(false);
  const [istype, setIsType] = useState({ type: 0, id: 0 });
  ///// 1- подтвердить, 2 - отклонить

  const { mainBtnList } = useSelector((state) => state.stateSlice);
  const { selCurrency, selReglament } = useSelector(
    (state) => state.selectsSlice
  );

  const clickBtn = (id) => {
    const newList = mainBtnList?.slice(0, 6)?.map((item) => {
      return {
        ...item,
        bool: id === item?.id ? true : false,
      };
    });

    dispatch(toTakeIsksList({ tokenA, id })); /// запрос для получения списка
    dispatch(changeMainBtnList(newList));
  };

  return (
    <div className="mainTables">
      <ul className="choice__plaintiff">
        {mainBtnList?.slice(0, 6)?.map((btn, ind) => (
          <li key={btn.id}>
            <button
              className={btn?.bool ? "activeBtnsPlaintiff" : ""}
              onClick={() => clickBtn(btn?.id)}
              style={ind === 0 ? { marginLeft: "0px" } : {}}
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
              {respSecrHeaders?.map((i) => (
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
                  {+row?.reglament !== 0 && (
                    <span>
                      {searchNameSelect(selReglament, +row?.reglament)}
                    </span>
                  )}
                </td>
                <td className="table_isk_td">
                  {row?.arbitrs?.length !== 0 && (
                    <>
                      {row?.arbitrs?.map((i, index) => (
                        <span>
                          {i?.name}
                          {index !== row.arbitrs?.length - 1 && ","}
                        </span>
                      ))}
                    </>
                  )}
                </td>
                <td className="table_isk_td">
                  <span>{row.secretary || ""}</span>
                </td>
                <td className="table_isk_td">
                  <ActionsRS
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
                          time={row?.isk_time}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmStatusRS
        setSendStatusIsk={setSendStatusIsk}
        sendStatusIsk={sendStatusIsk}
        setIsType={setIsType}
        istype={istype}
      />
    </div>
  );
};
