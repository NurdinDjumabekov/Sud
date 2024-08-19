///// hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

///// components
import Modals from "../../../Modals/Modals";
import CreateObjection from "./CreateObjection";
import NotifyDefendants from "./NotifyDefendants";
import Fullfilled_isks_for_pred from "./Fullfilled_isks_for_pred";

////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { getCountry } from "../../../../helpers/getSelects";
import { getIsk } from "../../../../store/reducers/applicationsSlice";

const ConfirmSimpleSecr = () => {
  const dispatch = useDispatch();
  const { confirmStatus } = useSelector((state) => state.stateSlice);

  useEffect(() => {
    dispatch(getIsk(confirmStatus?.id));
    getCountry(dispatch); // для get нужных городов, стран и областей
  }, [confirmStatus?.id, confirmStatus?.status]);

  const components = {
    5: <CreateObjection />, ////// возражение ответчика
    7: <Fullfilled_isks_for_pred />, ////// Заполнить докумен для принятия иска вместо председателя и отправить ему же
    8: <NotifyDefendants />, ////// уведомление ответчика
  };

  return (
    <>
      <div className="blockModal moreStylePdf">
        <Modals
          openModal={!!confirmStatus?.id}
          setOpenModal={() => dispatch(confirmStatusFN())}
        >
          {components?.[confirmStatus?.status]}
        </Modals>
      </div>
    </>
  );
};

export default ConfirmSimpleSecr;
