///hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// imgs
import editImg from "../../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../../asstes/icons/deleteBtn.svg";
import sendImg from "../../../../asstes/icons/goodSend.svg";
import fullfiled from "../../../../asstes/icons/goodSend.svg";
import reject from "../../../../asstes/icons/krestik.svg";
import redone from "../../../../asstes/images/redone.png";

////fns
import { editFileDocsFN } from "../../../../store/reducers/stateSlice";
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { changeIdStatus } from "../../../../store/reducers/stateSlice";
import { changeLookChangeDeleteIsks } from "../../../../store/reducers/stateSlice";
import { changeLookChangeStatus } from "../../../../store/reducers/stateSlice";
import { editIsks } from "../../../../store/reducers/applicationsSlice";

////style
import "../TypeActionsUsersAll/style.scss";

const ActionRespSecr = ({ row }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const changeStatus = (id) => {
    ///// подтверждение отправки иска в суд
    dispatch(changeLookChangeStatus(100)); /// вызов модалки подтверждения иска
    dispatch(changeIdStatus(id)); /// для отправки id иска
  };

  const changeIsk = (id) => {
    ///// изменения искового заявления до подтверждения
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
  };

  const deleteIsksFn = (id) => {
    ///// удаление искового заявления до подтверждения
    dispatch(changeLookChangeDeleteIsks(true)); /// вызов модалки для удаления иска
    dispatch(changeIdStatus(id));
  };

  const openModalChangeStatus = (id, status) => {
    // для принятия, отклонения и отпарвки на доработку иска
    dispatch(confirmStatusFN({ id, status }));
    dispatch(editIsks({ id, tokenA, applicationList }));

    dispatch(editFileDocsFN(true)); ///// запрещаю добавлять документы ответ. секретарю
  };

  const lookIsks = (obj) => {
    // if (+obj.status === 1) {
    //   dispatch(
    //     editIsks({ id: obj?.codeid, tokenA, navigate, applicationList })
    //   );
    // }
  };

  const statusMessages = {
    1: { text: "Отправлено председателю", color: "greenStatus" },
    2: { text: "Отклонён ответственным секретарём", color: "redStatus" },
    3: { text: "Принят председателем", color: "greenStatus" },
    4: { text: "Отклонён председателем", color: "redStatus" },
    5: { text: "Принят председателем", color: "greenStatus" },
    6: { text: "Отправлено на доработку", color: "redStatus" },
  };

  // const activeIsks = row?.status == 0 || row?.isk_status == 6; /// if иск еще не подтвержден или отправлен на доработку
  const activeIsks = row?.status == 0; /// if иск еще не подтвержден или отправлен на доработку

  const iskActive = row?.isk_status == 0;

  return (
    <td className="typeUser">
      {activeIsks ? (
        <div className="statusIsks">
          <button onClick={() => changeStatus(row?.codeid)}>
            {/* Подать */}
            <img src={sendImg} alt="sendImg" />
          </button>
          <button onClick={() => changeIsk(row?.codeid)}>
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
          {iskActive ? (
            <div className="statusIsks">
              <div className="statusIsks lookIsk">
                <button onClick={() => lookIsks(row)}>Просмотреть</button>
                {/* Просмотреть */}
              </div>
              <button onClick={() => openModalChangeStatus(row?.codeid, 1)}>
                <img src={fullfiled} alt="ok" />
                {/* Принять  иск*/}
              </button>
              <button onClick={() => openModalChangeStatus(row?.codeid, 2)}>
                <img src={reject} alt="no" />
                {/* Отклонить  иск*/}
              </button>
              <button onClick={() => openModalChangeStatus(row?.codeid, 6)}>
                {/* Отправить на доработку */}
                <img src={redone} alt="redone" className="redoneImg" />
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
        </>
      )}
    </td>
  );
};

export default ActionRespSecr;
