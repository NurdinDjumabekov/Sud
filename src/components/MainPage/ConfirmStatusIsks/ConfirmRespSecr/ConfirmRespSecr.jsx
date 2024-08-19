///// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style.scss";

////fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";

//// components
import Fullfilled_isk from "./Fullfilled_isk";
import Reject_isk from "./Reject_isk";
import Redone_isk from "./Redone_isk";
import Modals from "../../../Modals/Modals";

const ConfirmRespSecr = () => {
  const dispatch = useDispatch();
  const { confirmStatus } = useSelector((state) => state.stateSlice);

  const components = {
    1: <Fullfilled_isk />, ////// принят отв. секр
    2: <Reject_isk />, ////// отклонён отв. секр
    6: <Redone_isk />, ////// на доработку
  };

  const status = confirmStatus?.status;
  const active = status == 1 || status == 2 || status == 6;

  return (
    <div className={`blockModal moreStylePdf ${active ? "" : "noActive"}`}>
      <Modals
        openModal={!!confirmStatus?.id}
        setOpenModal={() => dispatch(confirmStatusFN())}
      >
        {components?.[status]}
      </Modals>
    </div>
  );
};

export default ConfirmRespSecr;
