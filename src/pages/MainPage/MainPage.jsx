/////// hooks
import { useSelector } from "react-redux";

////// helpers
import { searchNameSelect } from "../../helpers/searchNameSelect";

////// style
import "./MainPage.scss";

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
// import ConfirmPred from "../../components/MainPage/ConfirmStatusIsks/ConfirmPred/ConfirmPred";

const MainPage = () => {
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { selReglament } = useSelector((state) => state.selectsSlice);

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
                  <Arbitrs />
                  <td className="secr">
                    <span>{row.secretary || ""}</span>
                  </td>
                  <AllStatus row={row} />
                  <TypeActionsUsers row={row} />
                  <td className="times">время с бэка</td>
                  <td className="documents">
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

      {/* ///// модалки для подтверждения и удаления */}
      <MoreInfo />
      {/* //// для ответ. секретаря */}
      <ConfirmRespSecr />
      <ConfirmPred />
    </>
  );
};

export default MainPage;
