import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// fns
import { editIsks } from "../../../../../store/reducers/applicationsSlice";
import { confirmStatusFN } from "../../../../../store/reducers/stateSlice";

/////// imgs
import vozr from "../../../../../asstes/icons/vozr.svg";
import notif from "../../../../../asstes/icons/notif.svg";
import accept from "../../../../../asstes/icons/acceptDocs.svg";

const ActionsStatusSS = ({ row }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const lookIsksFn = (obj) => {
    if (+obj.status === 1) {
      const send = { id: obj?.codeid, tokenA, navigate, applicationList };
      dispatch(editIsks(send));
    }
  };

  const checkDocs = (innerArr) => {
    // Для проверки документов: если в документе нет возражения, то отображать кнопку возражения, иначе не отображать
    return innerArr?.some((i) => i.code_file_type === 17);
  };

  const openDataIsks = (id, status) => {
    // dispatch(editIsks({ id, tokenA, applicationList }));
    dispatch(confirmStatusFN({ id, status }));
    /// принять исвовое заявление (заполнить документ для председателя,
    /// что он потом принял )
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
            <button onClick={() => openDataIsks(row?.codeid, 7)}>
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
                {/* //// if секретарь есть (назначен) и иск принят пред - лем */}
                {row?.secretary && +row?.isk_status === 3 && (
                  <div className="statusIsks moreBtnStatus">
                    {!checkDocs(row?.files) && (
                      <button onClick={() => openDataIsks(row?.codeid, 5)}>
                        <img src={vozr} alt="vozr" />
                        <span>Сформировать возражение</span>
                      </button>
                    )}
                    <button onClick={() => openDataIsks(row?.codeid, 6)}>
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
