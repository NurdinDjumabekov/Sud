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

const ConfirmRespSecr = () => {
  const dispatch = useDispatch();
  const { confirmActionFullfilled, confirmActionReject, confirmStatus } =
    useSelector((state) => state.stateSlice);

  console.log(confirmStatus?.id);

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

export default ConfirmRespSecr;
