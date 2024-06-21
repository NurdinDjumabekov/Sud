///// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../style.scss";
import Modals from "../../../../Modals/Modals";
import { confirmStatusFN } from "../../../../../store/reducers/stateSlice";

//// components
import Fullfilled_isk from "./Fullfilled_isk";
import Reject_isk from "./Reject_isk";
import Redone_isk from "./Redone_isk";

const ConfirmPred = () => {
  const dispatch = useDispatch();
  const { confirmStatus } = useSelector((state) => state.stateSlice);

  return (
    <>
      <div className="blockModal moreStylePdf">
        <Modals
          openModal={!!confirmStatus?.id}
          setOpenModal={() => dispatch(confirmStatusFN())}
        >
          <Fullfilled_isk />
          <Reject_isk />
          <Redone_isk />
        </Modals>
      </div>
    </>
  );
};

export default ConfirmPred;
