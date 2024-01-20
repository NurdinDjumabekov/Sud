import React from "react";
import {
  changeListPlaint,
  changeLookChangeStatus,
  changeLookDataAllPlaintiff,
} from "../../store/reducers/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import Modals from "../Modals/Modals";
import "./MoreInfo.scss";
import imgWarning from "../../asstes/images/warning.png";
import { changeStatusIsks } from "../../store/reducers/sendDocsSlice";

const MoreInfo = () => {
  const dispatch = useDispatch();
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { lookDataAllPlaintiff, listPlaint, lookChangeStatus, idStatus } =
    useSelector((state) => state.stateSlice);

  React.useEffect(() => {
    return () => dispatch(changeListPlaint([]));
  }, []);

  //   console.log(idStatus);

  //   console.log(listPlaint, "listPlaint");
  return (
    <div className="blockModal">
      {/* ////// для отоюражения ФИО истцов */}
      <Modals
        openModal={lookDataAllPlaintiff}
        setOpenModal={() => dispatch(changeLookDataAllPlaintiff())}
      >
        <div className="main_tabla_isk">
          <table className="table_isk">
            <thead>
              <tr>
                <th className="table_isk_th">ФИО</th>
              </tr>
            </thead>
            <tbody className="tbody_isk">
              {listPlaint?.map((item) => (
                <tr key={item?.codeid}>
                  <td className="table_isk_td">
                    <span>{item?.name}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modals>

      {/* ////// для подтверждения отправки иска (изменения статуса) */}
      <Modals
        openModal={lookChangeStatus}
        setOpenModal={() => dispatch(changeLookChangeStatus())}
      >
        <div className="modalchangeStatus">
          <div className="imgBlock">
            <img src={imgWarning} alt="send!" />
          </div>
          <h5>Вы уверены что хотите отправить этот иск?</h5>
          <p>
            Если вы отправите этот иск, то у вас не будет возможности отменить
            подачу этого иска!
          </p>
          <div className="btnsSendIsks">
            <button
              onClick={() => {
                dispatch(changeStatusIsks({ idStatus, tokenA }));
                dispatch(changeLookChangeStatus(false));
              }}
            >
              Отправить
            </button>
            <button onClick={() => dispatch(changeLookChangeStatus(false))}>
              Отменить
            </button>
          </div>
        </div>
      </Modals>
    </div>
  );
};

export default MoreInfo;
