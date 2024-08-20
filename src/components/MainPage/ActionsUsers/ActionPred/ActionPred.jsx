///hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// imgs
import fullfiled from "../../../../asstes/icons/goodSend.svg";
import reject from "../../../../asstes/icons/krestik.svg";
import redone from "../../../../asstes/images/redone.png";
import editImg from "../../../../asstes/icons/editBtn.svg";

////fns
import { editFileDocsFN } from "../../../../store/reducers/stateSlice";
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { editIsks } from "../../../../store/reducers/applicationsSlice";

////style
import "../TypeActionsUsersAll/style.scss";

const ActionPred = ({ row }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const openModalChangeStatus = (id, status) => {
    // для принятия, отклонения и отпарвки на доработку иска
    dispatch(confirmStatusFN({ id, status }));
    dispatch(editIsks({ id, tokenA, applicationList }));

    dispatch(editFileDocsFN(true)); ///// запрещаю добавлять документы председателю
  };

  const lookIsks = ({ codeid }) => {
    dispatch(editIsks({ id: codeid, tokenA, navigate, applicationList }));
  };

  const statusMessages = {
    // 1: { text: "Отправлено председателю", color: "greenStatus" },
    2: { text: "Отклонён ответственным секретарём", color: "redStatus" },
    3: { text: "Принят председателем", color: "greenStatus" },
    4: { text: "Отклонён председателем", color: "redStatus" },
    5: { text: "Ответчик уведомлён", color: "greenStatus" },
    6: { text: "Отправлено на доработку", color: "greenStatus" },
  };

  const iskActive = row?.isk_status == 0 || row?.isk_status == 1;

  const notif = row?.isk_status == 5;

  return (
    <td className="typeUser">
      {iskActive ? (
        <>
          {notif ? (
            <div className="statusIsks">
              <button onClick={() => lookIsks(row)}>
                <img src={editImg} alt="ok" />
                <span>Редактировать</span>
              </button>
            </div>
          ) : (
            <div className="statusIsks">
              <button onClick={() => lookIsks(row)}>
                <img src={editImg} alt="ok" />
                <span>Редактировать</span>
              </button>
              <button onClick={() => openModalChangeStatus(row?.codeid, 3)}>
                <img src={fullfiled} alt="ok" />
                <span>Принять иск</span>
              </button>
              <button onClick={() => openModalChangeStatus(row?.codeid, 4)}>
                <img src={reject} alt="no" />
                <span>Отклонить иск</span>
              </button>
              <button onClick={() => openModalChangeStatus(row?.codeid, 6)}>
                <img src={redone} alt="redone" className="redoneImg" />
                <span>Отправить на доработку</span>
              </button>
            </div>
          )}
        </>
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

export default ActionPred;
