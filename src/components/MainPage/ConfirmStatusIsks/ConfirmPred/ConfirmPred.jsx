///// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

///// fns
import "../style.scss";

///// components
import Modals from "../../../Modals/Modals";
import Fullfilled_isk from "./Fullfilled_isk";
import Reject_isk from "./Reject_isk";
import Redone_isk from "./Redone_isk";

////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";

const ConfirmPred = () => {
  const dispatch = useDispatch();
  const { confirmStatus } = useSelector((state) => state.stateSlice);

  const components = {
    3: <Fullfilled_isk />, ////// принят пред.
    4: <Reject_isk />, ////// отклонён пред.
    6: <Redone_isk />, ////// на доработку
  };

  const status = confirmStatus?.status;
  const active = status == 3 || status == 4 || status == 6;

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

export default ConfirmPred;
