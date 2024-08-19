import React from "react";
import { useDispatch } from "react-redux";

/////// fns
import { confirmStatusFN } from "../../../../../store/reducers/stateSlice";

/////// imgs
import vozr from "../../../../../asstes/icons/vozr.svg";
import notif from "../../../../../asstes/icons/notif.svg";
import accept from "../../../../../asstes/icons/acceptDocs.svg";

const ActionsStatusSS = ({ row }) => {
  const dispatch = useDispatch();

  const openModalDataIsks = (id, status) => {
    dispatch(confirmStatusFN({ id, status }));
  };

  const notNull = row?.status !== 0; // if иск подтверждён создателем

  const darabotka = row?.isk_status != 6; //// if докумен не в доработке

  const checkIskAccept = notNull && !!row?.secretary;

  if (darabotka) {
    return (
      <>
        {checkIskAccept && row?.isk_status !== 3 && (
          /// if секретарь есть (назначен)
          <div className="statusIsks moreBtnStatus">
            <button onClick={() => openModalDataIsks(row?.codeid, 7)}>
              <img src={accept} alt="accept" />
              <span>Сформировать документ о принятии иска</span>
            </button>
          </div>
        )}
        {notNull && (
          <>
            {+row?.isk_status === 5 ? (
              <div className="statusIsks moreBtnStatus">
                {/* <button onClick={() => lookIsksFn(row)}>Просмотреть</button> */}
              </div>
            ) : (
              <>
                {/* //// if секретарь есть (назначен) и иск принят председателем */}
                {row?.secretary && +row?.isk_status === 3 && (
                  <div className="statusIsks moreBtnStatus">
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
            )}
          </>
        )}
      </>
    );
  }
};

export default ActionsStatusSS;
