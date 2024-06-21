///hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// imgs
import fullfiled from "../../../../asstes/icons/goodSend.svg";
import reject from "../../../../asstes/icons/krestik.svg";
import redone from "../../../../asstes/images/redone.png";

////fns
import { editFileDocsFN } from "../../../../store/reducers/stateSlice";
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { editIsks } from "../../../../store/reducers/applicationsSlice";

////style
import "../style.scss";

const ActionPred = ({ row }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);

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
    2: { text: "Отклонён ответственным секретарём", color: "redStatus" },
    3: { text: "Принят председателем", color: "greenStatus" },
    4: { text: "Отклонён председателем", color: "redStatus" },
    5: { text: "Ответчик уведомлён", color: "greenStatus" },
    6: { text: "Отправлено на доработку", color: "greenStatus" },
  };

  const iskActive = row?.isk_status == 0 || row?.isk_status == 1;

  return (
    <td className="typeUser">
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
    </td>
  );
};

export default ActionPred;
