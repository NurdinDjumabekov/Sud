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
import SortingIsks from "../../components/MainPage/SortingIsks/SortingIsks";
import Titles from "../../components/MainPage/Titles/Titles";
import Arbitrs from "../../components/MainPage/Arbitrs/Arbitrs";
import AllStatus from "../../components/MainPage/AllStatus/AllStatus";
import TypeActionsUsers from "../../components/MainPage/ActionsUsers/TypeActionsUsersAll/TypeActionsUsers";
import ConfirmRespSecr from "../../components/MainPage/ConfirmStatusIsks/ConfirmRespSecr/ConfirmRespSecr";
import ConfirmPred from "../../components/MainPage/ConfirmStatusIsks/ConfirmPred/ConfirmPred";
import TimeAndActions from "../../components/MainPage/ActionsUsers/TimeAndActions/TimeAndActions";
import ConfirmSimpleSecr from "../../components/MainPage/ConfirmStatusIsks/ConfirmSimpleSecr/ConfirmSimpleSecr";
import ChoiceSecr from "../../components/MainPage/ConfirmStatusIsks/ConfirmPred/ChoiceSecr/ChoiceSecr";
import IsksConfirmAndDel from "../../components/IsksConfirmAndDel/IsksConfirmAndDel";
import ActionsTable from "../../components/MainPage/ActionsTable/ActionsTable";
import ActionChoiceArbitrType from "../../components/MainPage/ActionChoiceArbitrType/ActionChoiceArbitrType";

const MainPage = () => {
  const dispatch = useDispatch();

  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { selReglament } = useSelector((state) => state.selectsSlice);

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { type_user } = jwtDecode(tokenA);

  return (
    <>
      <div className="mainTables">
        <SortingIsks />
        <div className="iskData">
          <table className="table_isk">
            <Titles />
            <tbody className="tbody_isk">
              {listTodos?.map((row, index) => (
                <tr
                  key={index}
                  className={`${+index % 2 === 0 ? "colorWhite" : "colorGray"}`}
                >
                  <ActionsTable row={row} listTodos={listTodos} />
                  <MainTableData
                    row={row}
                    index={index}
                    listTodos={listTodos}
                  />
                  <td className="reglamet" style={{ width: 240 }}>
                    <span>
                      {+row?.reglament !== 0 && (
                        <>{searchNameSelect(selReglament, +row?.reglament)}</>
                      )}
                    </span>
                  </td>
                  <ActionChoiceArbitrType row={row} type={1} />
                  <Arbitrs row={row} type={1} />
                  <ActionChoiceArbitrType row={row} type={2} />
                  <Arbitrs row={row} type={2} />
                  <ActionChoiceArbitrType row={row} type={3} />
                  <Arbitrs row={row} type={3} />
                  {/* <td className="reglametCount">
                    <span>{objTypeReglament?.[+row?.reglament]?.count}</span>
                  </td> */}
                  <td className="secr" style={{ width: 240 }}>
                    <span>
                      {type_user != 3 ? (
                        row?.secretary
                      ) : (
                        <ChoiceSecr item={row} />
                      )}
                    </span>
                  </td>
                  <AllStatus row={row} />
                  <TypeActionsUsers row={row} />
                  <TimeAndActions row={row} />
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

      {/* ///// модалки для подтверждения и удаления иска */}
      <IsksConfirmAndDel />
      {/* //// для ответ. секретаря, председателя и обычного секретаря */}
      <ConfirmSimpleSecr />
      {type_user === 2 && <ConfirmRespSecr />}
      {type_user === 3 && <ConfirmPred />}
    </>
  );
};

export default MainPage;
