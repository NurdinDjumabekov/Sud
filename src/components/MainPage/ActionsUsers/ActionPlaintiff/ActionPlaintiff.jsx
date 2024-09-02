///hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// imgs
import editImg from "../../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../../asstes/icons/deleteBtn.svg";
import sendImg from "../../../../asstes/icons/goodSend.svg";

////fns
import { changeIdStatus } from "../../../../store/reducers/stateSlice";
import { changeLookChangeDeleteIsks } from "../../../../store/reducers/stateSlice";
import { changeLookChangeStatus } from "../../../../store/reducers/stateSlice";
import { editIsks } from "../../../../store/reducers/applicationsSlice";

////style
import "../TypeActionsUsersAll/style.scss";

const ActionPlaintiff = ({ row }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const changeStatus = (id) => {
    ///// подтверждение отправки иска в суд
    dispatch(changeLookChangeStatus(100)); /// вызов модалки подтверждения иска
    dispatch(changeIdStatus(id)); /// для отправки id иска
  };

  const editIsksFn = (id) => {
    ///// изменения искового заявления до подтверждения
    dispatch(editIsks({ id, navigate, applicationList }));
  };

  const deleteIsksFn = (id) => {
    ///// удаление искового заявления до подтверждения
    dispatch(changeLookChangeDeleteIsks(true)); /// вызов модалки для удаления иска
    dispatch(changeIdStatus(id));
  };

  const statusMessages = {
    1: { text: "Принят ответственным секретарём", color: "greenStatus" },
    2: { text: "Отклонён ответственным секретарём", color: "redStatus" },
    3: { text: "Принят председателем", color: "greenStatus" },
    4: { text: "Отклонён председателем", color: "redStatus" },
    5: { text: "Принят председателем", color: "greenStatus" },
  };

  const activeIsks = row?.status == 0 || row?.isk_status == 6; /// if иск еще не подтвержден или отправлен на доработку

  return (
    <td className="typeUser">
      {activeIsks ? (
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
        <div className="statusPlaintiff">
          {statusMessages[row?.isk_status] && (
            <span className={statusMessages?.[+row?.isk_status]?.color}>
              {statusMessages?.[row?.isk_status]?.text || ""}
            </span>
          )}
        </div>
      )}
    </td>
  );
};

export default ActionPlaintiff;
