import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editIsks } from "../../../../store/reducers/applicationsSlice";
import { changeLookDocs } from "../../../../store/reducers/stateSlice";
import { changeCheckEditPlaint } from "../../../../store/reducers/saveDataSlice";

///// imgs
import fullfiled from "../../../../asstes/icons/goodSend.svg";
import reject from "../../../../asstes/icons/krestik.svg";
import redone from "../../../../asstes/images/redone.png";

const ActionsPred = (props) => {
  const { row, setSendStatusIsk, setIsType } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const changeStatusIsks = (id, status) => {
    setSendStatusIsk(true);
    setIsType({ type: status, id });
  };

  const editIsksFn = (id) => {
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
    dispatch(changeCheckEditPlaint(false)); //// запрет на изменения иска
  };

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
    dispatch(changeLookDocs(false)); /// для сброса cостояния просмтотра доков только у председателя
  };

  const statusMessages = {
    2: "Отклонён ответственным секретарём",
    3: "Принят председателем",
    4: "Отклонён председателем",
    5: "Ответчик уведомлён",
  };

  return (
    <>
      {+row?.isk_status === 0 || +row?.isk_status === 1 ? (
        <div className="statusIsks">
          <div className="statusIsks moreIsksStatus">
            <button onClick={() => editIsksFn(row?.codeid)}>Просмотреть</button>
          </div>
          <button onClick={() => lookIsks(row?.codeid, 3)}>
            <img src={fullfiled} alt="ok" />
          </button>
          <button onClick={() => lookIsks(row?.codeid, 4)}>
            <img src={reject} alt="no" />
          </button>
          <button onClick={() => lookIsks(row?.codeid, 6)}>
            {/* Отправить на доработку */}
            <img src={redone} alt="redone" className="redoneImg" />
          </button>
        </div>
      ) : (
        <>
          {statusMessages[row?.isk_status] ? (
            <span
              style={{ padding: "0px 0px 0px 10px" }}
              className={
                +row?.isk_status === 3
                  ? "colorStatusGreen"
                  : +row?.isk_status === 2 || +row?.isk_status === 4
                  ? "colorStatusRed"
                  : ""
              }
              onClick={() => editIsksFn(row?.codeid)}
            >
              {statusMessages[row?.isk_status]}
            </span>
          ) : (
            <span onClick={() => editIsksFn(row?.codeid)}>Иск подан</span>
          )}
        </>
      )}
    </>
  );
};

export default ActionsPred;
