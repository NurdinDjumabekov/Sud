import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { editIsks } from "../../../../store/reducers/applicationsSlice";

/////// imgs
import vozr from "../../../../asstes/icons/vozr.svg";
import notif from "../../../../asstes/icons/notif.svg";
import accept from "../../../../asstes/icons/acceptDocs.svg";
import look from "../../../../asstes/icons/editBtn.svg";

const ActionsStatusSS = ({ row }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isk_status = row?.isk_status;
  const status = row?.status;

  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const openModalDataIsks = (id, status) => {
    dispatch(confirmStatusFN({ id, status }));
    //// для открытия модалки
  };

  const lookIsks = (obj) => {
    if (+obj.status === 1) {
      dispatch(editIsks({ id: obj?.codeid, navigate, applicationList }));
    }
    //// chech (зачем передавать applicationList ???)
  };

  // const list = [
  //   {
  //     fiz_face_type: 2,
  //     code_isk: 213,
  //   },
  //   {
  //     ur_face_type: 2,
  //     code_isk: 2123,
  //   },
  //   {
  //     ip_face_type: 1,
  //     code_isk: 2153,
  //   },

  //   {
  //     ip_face_type: 1,
  //     code_isk: 21113,
  //   },
  //   {
  //     ip_face_type: 0,
  //     code_isk: 2103,
  //   },
  // ];

  // const filteredEmails = list
  //   .filter(
  //     (item) =>
  //       item.fiz_face_type == 2 ||
  //       item.ur_face_type == 2 ||
  //       item.ip_face_type == 2
  //   )
  //   .map(({ code_isk }) => ({
  //     code_isk,
  //   }));

  // console.log(filteredEmails, "filteredEmails");

  if (
    isk_status == 2 ||
    isk_status == 4 ||
    isk_status == 6 ||
    isk_status == 7 ||
    status == 0
  ) {
    return <></>;
  }

  if (isk_status == 1 || isk_status == 0) {
    return (
      <div className="statusIsks moreBtnStatus">
        <button onClick={() => lookIsks(row)}>
          <img src={look} alt="vozr" />
          <span>Редактировать иск</span>
        </button>
        <button onClick={() => openModalDataIsks(row?.codeid, 7)}>
          <img src={accept} alt="accept" />
          <span>Сформировать документ о принятии иска</span>
        </button>
      </div>
    );
  }

  if (isk_status == 3 || isk_status == 5) {
    return (
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
    );
  }
};

export default ActionsStatusSS;
