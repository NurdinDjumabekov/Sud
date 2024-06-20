////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// fns
import { changeIdStatus } from "../../store/reducers/stateSlice";
import { changeLookChangeStatus } from "../../store/reducers/stateSlice";
import { changeLookChangeDeleteIsks } from "../../store/reducers/stateSlice";
import { changeStatusIsks } from "../../store/reducers/sendDocsSlice";
import { deleteIsks } from "../../store/reducers/sendDocsSlice";

/////// components
import Modals from "../Modals/Modals";

//////// styles
import "./MoreInfo.scss";

/////imgs
import imgWarning from "../../asstes/images/warning.png";

const MoreInfo = () => {
  //////////////////////   для подтверждения и удаления иска

  const dispatch = useDispatch();

  const { tokenA, typeUser } = useSelector((state) => state.saveDataSlice);

  const { lookChangeStatus, lookChangeDeleteIsks, idStatus } = useSelector(
    (state) => state.stateSlice
  );

  React.useEffect(() => {
    return () => dispatch(changeIdStatus(0));
  }, []);

  const confirmIsk = () => {
    /////  подтверждения иска
    dispatch(changeStatusIsks({ idStatus, tokenA }));
    dispatch(changeLookChangeStatus(false));
  };

  const deleteIsk = () => {
    /////  удаление иска
    dispatch(deleteIsks({ codeid: idStatus, tokenA }));
    dispatch(changeLookChangeDeleteIsks(false));
  };

  const closeModal = () => {
    dispatch(changeLookChangeStatus(false));
    dispatch(changeLookChangeDeleteIsks(false));
    ///// закрыьте попапов подттверждения
  };

  const checkWhoCreateIsks = typeUser == 1 || typeUser == 2;

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
            {checkWhoCreateIsks ? "Подтвердить подачу иска?" : "Подать иск?"}
          </h5>
          <div className="btnsSendIsks">
            <button onClick={confirmIsk}>Да</button>
            <button onClick={closeModal}>нет</button>
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
          <div className="btnsSendIsks delBtn">
            <button onClick={deleteIsk}>Да</button>
            <button onClick={closeModal}>нет</button>
          </div>
        </div>
      </Modals>
    </div>
  );
};

export default MoreInfo;
