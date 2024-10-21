////// hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// fns
import { changeIdStatus } from "../../store/reducers/stateSlice";
import { changeLookChangeStatus } from "../../store/reducers/stateSlice";
import { changeLookChangeDeleteIsks } from "../../store/reducers/stateSlice";
import {
  changeStatusIsks,
  toTakeIsksList,
} from "../../store/reducers/sendDocsSlice";
import { deleteIsks } from "../../store/reducers/sendDocsSlice";

/////// components
import Modals from "../Modals/Modals";

//////// styles
import "./style.scss";

/////imgs
import imgWarning from "../../asstes/images/warning.png";

const IsksConfirmAndDel = () => {
  //////////////////////   для подтверждения и удаления иска

  const dispatch = useDispatch();

  const { typeUser } = useSelector((state) => state.saveDataSlice);
  const { listFilter } = useSelector((state) => state.applicationsSlice);

  const { lookChangeStatus, lookChangeDeleteIsks, idStatus } = useSelector(
    (state) => state.stateSlice
  );

  useEffect(() => {
    return () => {
      dispatch(changeIdStatus(0));
    };
  }, []);

  const confirmIsk = async () => {
    /////  подтверждения иска (истец подаёт иск)
    await dispatch(changeStatusIsks(idStatus)).unwrap();
    dispatch(toTakeIsksList(listFilter?.[0]?.codeid_filter));
    dispatch(changeLookChangeStatus(false));
  };

  const deleteIsk = async () => {
    /////  удаление иска
    await dispatch(deleteIsks(idStatus)).unwrap();
    dispatch(toTakeIsksList(listFilter?.[0]?.codeid_filter));
    dispatch(changeLookChangeDeleteIsks(false));
  };

  const closeModal = () => {
    dispatch(changeLookChangeStatus(false));
    dispatch(changeLookChangeDeleteIsks(false));
    ///// закрытие попапов подтверждения
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

export default IsksConfirmAndDel;
