import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editIsks } from "../../../../store/reducers/applicationsSlice";
import { changeCheckEditPlaint } from "../../../../store/reducers/saveDataSlice";
import {
  changeIdStatus,
  changeLookChangeDeleteIsks,
  changeLookChangeStatus,
} from "../../../../store/reducers/stateSlice";

////// imgs
import fullfiled from "../../../../asstes/icons/goodSend.svg";
import reject from "../../../../asstes/icons/krestik.svg";
import redone from "../../../../asstes/images/redone.png";
import editImg from "../../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../../asstes/icons/deleteBtn.svg";
import sendImg from "../../../../asstes/icons/goodSend.svg";

const ActionsRS = (props) => {
  const { row, setSendStatusIsk, setIsType } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const lookIsks = (obj) => {
    if (+obj.status === 1) {
      dispatch(
        editIsks({ id: obj?.codeid, tokenA, navigate, applicationList })
      );
      dispatch(changeCheckEditPlaint(false)); /// запрет на редактирование
    }
  };

  const openDataIsks = (id, status) => {
    // для принятия или отклонения иска
    setSendStatusIsk(true);
    setIsType({ type: status, id });
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
    dispatch(changeCheckEditPlaint(true)); /// можно редактирвать иск
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
    5: "Принят председателем",
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
          {+row?.isk_status === 0 ? (
            <div className="statusIsks">
              <div className="statusIsks moreIsksStatus">
                <button onClick={() => lookIsks(row)}>Просмотреть</button>
                {/* Просмотреть */}
              </div>
              <button onClick={() => openDataIsks(row?.codeid, 1)}>
                <img src={fullfiled} alt="ok" />
                {/* Принять  иск*/}
              </button>
              <button onClick={() => openDataIsks(row?.codeid, 2)}>
                <img src={reject} alt="no" />
                {/* Отклонить  иск*/}
              </button>
              <button onClick={() => openDataIsks(row?.codeid, 3)}>
                {/* Отправить на доработку */}
                <img src={redone} alt="redone" className="redoneImg" />
              </button>
            </div>
          ) : (
            <>
              {statusMessages[row?.isk_status] ? (
                <span
                  className={
                    greenColor ? "statusGreen" : redColor ? "statusRed" : ""
                  }
                >
                  {statusMessages[row?.isk_status]}
                </span>
              ) : (
                <span style={{ padding: "0px 0px 0px 10px" }}>Иск подан</span>
              )}
            </>
          )}
        </>
      )}

      {/* //// модалки для принятия и отказа иска */}
    </>
  );
};

export default ActionsRS;