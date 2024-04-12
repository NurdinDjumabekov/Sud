import React from "react";
import {
  changeIdStatus,
  changeLookChangeStatus,
  changeLookChangeDeleteIsks,
} from "../../store/reducers/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import Modals from "../Modals/Modals";
import "./MoreInfo.scss";
import imgWarning from "../../asstes/images/warning.png";
import {
  changeStatusIsks,
  deleteIsks,
} from "../../store/reducers/sendDocsSlice";

const MoreInfo = () => {
  const dispatch = useDispatch();
  const { tokenA, typeUser } = useSelector((state) => state.saveDataSlice);

  const { lookChangeStatus, lookChangeDeleteIsks, idStatus } = useSelector(
    (state) => state.stateSlice
  );

  React.useEffect(() => {
    return () => {
      dispatch(changeIdStatus(0));
    };
  }, []);

  return (
    <div className="blockModal noneKrest">
      {/* ////// для подтверждения отправки иска (изменения статуса) */}
      <Modals
        openModal={lookChangeStatus}
        setOpenModal={() => dispatch(changeLookChangeStatus())}
      >
        <div className="modalchangeStatus">
          <div className="imgBlock">
            <img src={imgWarning} alt="send!" />
          </div>
          <h5>
            {+typeUser === 1 || 2 ? "Подтвердить подачу иска?" : "Подать иск?"}
          </h5>
          <div className="btnsSendIsks">
            <button
              onClick={() => {
                dispatch(changeStatusIsks({ idStatus, tokenA }));
                dispatch(changeLookChangeStatus(false));
              }}
            >
              Да
            </button>
            <button onClick={() => dispatch(changeLookChangeStatus(false))}>
              нет
            </button>
          </div>
        </div>
      </Modals>
      {/* ////// для удаления иска */}
      <Modals
        openModal={lookChangeDeleteIsks}
        setOpenModal={() => dispatch(changeLookChangeDeleteIsks())}
      >
        <div className="modalchangeStatus">
          <div className="imgBlock">
            <img src={imgWarning} alt="send!" />
          </div>
          <h5>Удалить иск?</h5>
          <div className="btnsSendIsks">
            <button
              onClick={() => {
                dispatch(deleteIsks({ codeid: idStatus, tokenA }));
                dispatch(changeLookChangeDeleteIsks(false));
              }}
              style={{ background: "red" }}
            >
              Да
            </button>
            <button onClick={() => dispatch(changeLookChangeDeleteIsks(false))}>
              нет
            </button>
          </div>
        </div>
      </Modals>
    </div>
  );
};

export default MoreInfo;
