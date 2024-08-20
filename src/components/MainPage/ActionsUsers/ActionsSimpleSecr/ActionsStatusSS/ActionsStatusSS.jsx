import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { confirmStatusFN } from "../../../../../store/reducers/stateSlice";

/////// imgs
import vozr from "../../../../../asstes/icons/vozr.svg";
import notif from "../../../../../asstes/icons/notif.svg";
import accept from "../../../../../asstes/icons/acceptDocs.svg";
import look from "../../../../../asstes/icons/editBtn.svg";
import { editIsks } from "../../../../../store/reducers/applicationsSlice";
import { useNavigate } from "react-router-dom";

const ActionsStatusSS = ({ row }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const openModalDataIsks = (id, status) => {
    dispatch(confirmStatusFN({ id, status }));
  };

  const lookIsks = (obj) => {
    if (+obj.status === 1) {
      dispatch(editIsks({ id: obj?.codeid, navigate, applicationList }));
    }
    //// chech (зачем передавать applicationList ???)
  };

  const notNull = row?.status !== 0; // if иск подтверждён создателем

  const darabotka = row?.isk_status != 6; //// if докумен не в доработке

  const checkIskAccept =
    row?.secretary &&
    (+row?.isk_status === 3 || +row?.isk_status === 5) &&
    notNull;

  if (darabotka) {
    return (
      <>
        {notNull && row?.isk_status == 1 && (
          /// if секретарь есть (назначен)
          <div className="statusIsks moreBtnStatus">
            <button onClick={() => openModalDataIsks(row?.codeid, 7)}>
              <img src={accept} alt="accept" />
              <span>Сформировать документ о принятии иска</span>
            </button>
          </div>
        )}
        {/* //// if секретарь есть (назначен) и иск принят председателем */}
        {checkIskAccept && (
          <div className="statusIsks moreBtnStatus">
            <button onClick={() => lookIsks(row)}>
              <img src={look} alt="vozr" />
              <span>Редактировать иск</span>
            </button>
            <button onClick={() => openModalDataIsks(row?.codeid, 5)}>
              <img src={vozr} alt="vozr" />
              <span>Сформировать возражение</span>
            </button>
            <button onClick={() => openModalDataIsks(row?.codeid, 8)}>
              <img src={notif} alt="notif" />
              <span>Уведомить ответчика</span>
            </button>
          </div>
        )}
      </>
    );
  }
};

export default ActionsStatusSS;
