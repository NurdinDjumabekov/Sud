///// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

///// fns
import "../style.scss";

///// components
import Modals from "../../../Modals/Modals";

////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import Fullfilled_isk_for_pred from "./Fullfilled_isk_for_Pred";

const ConfirmSimpleSecr = () => {
  const dispatch = useDispatch();
  const { confirmStatus } = useSelector((state) => state.stateSlice);

  const components = {
    5: <></>, ////// Ответчик уведомлен
    7: <Fullfilled_isk_for_pred />,
    ////// Заполнить докумен для принятия иска вместо председателя и отправить ему же
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
