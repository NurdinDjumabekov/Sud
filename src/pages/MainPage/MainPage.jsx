/////// hooks
import { useSelector } from "react-redux";

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
import MoreInfo from "../../components/MoreInfo/MoreInfo";
import ConfirmRespSecr from "../../components/MainPage/ConfirmStatusIsks/ConfirmRespSecr/ConfirmRespSecr";
import ConfirmPred from "../../components/MainPage/ConfirmStatusIsks/ConfirmPred/ConfirmPred";
import TimeAndActions from "../../components/MainPage/ActionsUsers/TimeAndActions/TimeAndActions";
import ConfirmSimpleSecr from "../../components/MainPage/ConfirmStatusIsks/ConfirmSimpleSecr/ConfirmSimpleSecr";
import { jwtDecode } from "jwt-decode";
import ChoiceSecr from "../../components/Roles/ChairmanPred/ChoiceSecr/ChoiceSecr";

const MainPage = () => {
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
                  <MainTableData row={row} />
                  <td className="reglamet">
                    <span>
                      {+row?.reglament !== 0 && (
                        <>{searchNameSelect(selReglament, +row?.reglament)}</>
                      )}
                    </span>
                  </td>
                  <Arbitrs row={row} />
                  <td className="secr">
                    <span>{row.secretary || <ChoiceSecr item={row} />}</span>
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
      <MoreInfo />
      {/* //// для ответ. секретаря, председателя и обычного секретаря */}
      <ConfirmSimpleSecr />
      {type_user === 2 && <ConfirmRespSecr />}
      {type_user === 3 && <ConfirmPred />}
    </>
  );
};

export default MainPage;
