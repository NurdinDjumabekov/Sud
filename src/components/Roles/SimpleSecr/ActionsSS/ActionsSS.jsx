import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//// imgs
import editImg from "../../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../../asstes/icons/deleteBtn.svg";
import sendImg from "../../../../asstes/icons/goodSend.svg";

//// states
import { changeStatusIsks } from "../../../../store/reducers/sendDocsSlice";
import { editIsks } from "../../../../store/reducers/applicationsSlice";
import {
  changeIdStatus,
  changeLookChangeDeleteIsks,
  changeLookChangeStatus,
} from "../../../../store/reducers/stateSlice";
import { changeCheckEditPlaint } from "../../../../store/reducers/saveDataSlice";

const ActionsSS = (props) => {
  const { row, setSendStatusIsk, setIsType } = props;
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lookIsks = (id, type) => {
    setSendStatusIsk(true);
    changeStatusIsks(id, type);
    dispatch(
      editIsks({
        id,
        tokenA,
        applicationList,
      })
    );
  };

  const changeStatus = (id) => {
    dispatch(changeLookChangeStatus(true)); /// для вызова модалки изменения статуса иска
    dispatch(changeIdStatus(id)); /// для отправки id иска
  };

  const editIsksFn = (id) => {
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
    dispatch(changeCheckEditPlaint(true));
  };

  const deleteIsksFn = (id) => {
    dispatch(changeLookChangeDeleteIsks(true));
    dispatch(changeIdStatus(id));
  };

  const statusMessages = {
    1: "Отправлено председателю",
    2: "Отклонён ответственным секретарём",
    3: "Принят председателем",
    4: "Отклонён председателем",
    5: "Ответчик уведомлён",
  };

  const greenColor = +row?.isk_status === 1 || +row?.isk_status === 3;

  const redColor = +row?.isk_status === 2 || +row?.isk_status === 4;

  return (
    <>
      {row?.status === 0 ? (
        <div className="statusIsks">
          <button onClick={() => changeStatus(row?.codeid)}>
            {/* Подать */}
            <img src={sendImg} alt="sendImg" />
          </button>
          <button onClick={() => editIsksFn(row?.codeid)}>
            {/* Редактировать */}
            <img src={editImg} alt="sendImg" />
          </button>
          <button onClick={() => deleteIsksFn(row?.codeid)}>
            {/* Удалить */}
            <img src={deleteImg} alt="sendImg" />
          </button>
        </div>
      ) : (
        <>
          {statusMessages[row?.isk_status] && (
            <span
              style={{ padding: "0px 0px 0px 10px" }}
              className={
                greenColor
                  ? "colorStatusGreen"
                  : redColor
                  ? "colorStatusRed"
                  : ""
              }
            >
              {statusMessages[row?.isk_status]}
            </span>
          )}
          {!statusMessages[row?.isk_status] && (
            <span className="colGreen">Иск подан</span>
          )}
        </>
      )}
    </>
  );
};

export default ActionsSS;
