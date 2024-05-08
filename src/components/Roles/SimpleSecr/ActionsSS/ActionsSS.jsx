import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//// imgs
import editImg from "../../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../../asstes/icons/deleteBtn.svg";
import sendImg from "../../../../asstes/icons/goodSend.svg";

//// states
import { editIsks } from "../../../../store/reducers/applicationsSlice";
import {
  changeIdStatus,
  changeLookChangeDeleteIsks,
  changeLookChangeStatus,
} from "../../../../store/reducers/stateSlice";
import { changeCheckEditPlaint } from "../../../../store/reducers/saveDataSlice";

const ActionsSS = (props) => {
  const { row } = props;
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    0: { text: "Иск подан", colorClass: "green" },
    1: { text: "Отправлено председателю", colorClass: "green" },
    2: { text: "Отклонён ответственным секретарём", colorClass: "red" },
    3: { text: "Принят председателем", colorClass: "green" },
    4: { text: "Отклонён председателем", colorClass: "red" },
    5: { text: "Ответчик уведомлён", colorClass: "green" },
    6: { text: "Отправлено на доработку", colorClass: "red" },
  };

  const status = statusMessages?.[+row?.isk_status];

  const darabotka = row?.isk_status === 6; //// if докумен на доработке

  return (
    <>
      {row?.status === 0 || darabotka ? (
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
        <span style={{ paddingLeft: "10px", color: status?.colorClass }}>
          {status ? status.text : "..."}
        </span>
      )}
    </>
  );
};

export default ActionsSS;
